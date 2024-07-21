import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { StrutturaDto } from '../models/struttura-dto';
import { EsercitoDettagliDto } from '../models/esercito-dettagli-dto';
import { UnitaComprateEsercito } from '../models/unita-comprate-esercito';
import { ElementoCoda } from '../models/elemento-coda';
import { PlayerService } from './player/player.service';
import { WebSocketSoldiersService } from './web-socket-soldiers.service';

@Injectable({
  providedIn: 'root'
})
export class EsercitoService  implements OnInit{

  //backend url
  localhostUrl: string = 'http://localhost:7070/api/player/esercito';

  //dependencies
  http = inject(HttpClient);
  router = inject(Router);
  auth = inject(AuthService);
  playerService = inject(PlayerService);
  esercitoWebSocketService = inject(WebSocketSoldiersService);

  //general fields

  public esercitoDto: Array<StrutturaDto> = [];

  public mischia1?: StrutturaDto;
  public mischia2?: StrutturaDto;
  public mischia3?: StrutturaDto;

  public uce: Array<UnitaComprateEsercito> = [];

    // CODA

    codaTitoloPrimoElemento:string='';
    soldatiInAddestramentoPrimoElemento:number = 0;
    codaImgPrimoElemento:string='';
    codaTempoPrimoElemento:number = 0;

    elementiSecondariCoda:Array<ElementoCoda> = [];
    codaTempoTotale:number = 0;
    codaTempTot:number = 0;

    intervalId: any;
    timerInEsecuzione: boolean = false;



  constructor() { }

  ngOnInit(): void {
  }

  loadEsercito() {
    this.http.get<Array<StrutturaDto>>(`${this.localhostUrl}/attacco/basic`).subscribe(esercito => {
      this.esercitoDto = esercito;
      console.log(this.esercitoDto);

      this.updateEsercito(esercito);
    });
  }

  updateEsercito(esercito:Array<StrutturaDto>) {
    this.mischia1 = esercito.find(esercito => esercito.nome === "Mischia I");
    this.mischia2 = esercito.find(esercito => esercito.nome === "Mischia II");
    this.mischia3 = esercito.find(esercito => esercito.nome === "Mischia III");

    //this.mischia1 = esercito.find(esercito => esercito.id === 1);
  }


  getSoldatoDettagli(soldatoId:number) {
    return this.http.get<EsercitoDettagliDto>(`${this.localhostUrl}/attacco/id/${soldatoId}`);
  }

  compraSoldati(soldatoId:number, quantita:number) {
    return this.http.get<Array<UnitaComprateEsercito>>(`${this.localhostUrl}/attacco/payment/soldato/${soldatoId}/quantita/${quantita}`);
  }

  getCodaAddestramento() {
    return this.http.get<Array<UnitaComprateEsercito>>(`${this.localhostUrl}/attacco/coda/addestramento`)
  }

  // CODAAAA

  caricaCoda(indice:number) {
    console.log('carica coda')

    let uceLength = this.uce.length;
    console.log('UCE', this.uce)
    this.codaTempTot = this.uce[uceLength-1].tempoRimanenteTotaleMillisecondi + 1000;

    this.caricaPrimoElementoCoda(indice);
    this.caricaCodaSecondaria();

  }

  caricaPrimoElementoCoda(indice:number) {
    console.log('carica primo elemento')
    this.codaTempoPrimoElemento = Math.floor((this.uce[indice].tempoRimanenteMillisecondi - Date.now() + 1000) / 1000);
    this.soldatiInAddestramentoPrimoElemento = this.uce[indice].numeroSoldatiDaComprare;
    if(this.uce.length > 0 && !this.timerInEsecuzione) {
      let soldatoDto:StrutturaDto = this.esercitoDto.find(soldato => soldato.id === this.uce[indice].soldatoId)!;
      console.log('NON PUO ENTRAREEEE', soldatoDto, this.esercitoDto)
      this.codaTitoloPrimoElemento = soldatoDto.nome;
      this.codaImgPrimoElemento = soldatoDto.urlImg;

      this.contoAllaRovescia(this.uce[indice].tempoRimanenteMillisecondi + 1000);
    }

  }

  caricaCodaSecondaria() {
    console.log('carica secondaria')
    this.elementiSecondariCoda = [];
    for (let i:number = 1; i<this.uce.length; i++) {
      console.log(`elemento ${i}`, this.uce[i]);
      let soldatoDto:StrutturaDto = this.esercitoDto.find(soldato => soldato.id === this.uce[i].soldatoId)!;
      let elemento:ElementoCoda = {
        nome : soldatoDto.nome,
        img: soldatoDto.urlImg,
        quantita: this.uce[i].numeroSoldatiDaComprare,
        secondiAddestramento: this.uce[i].secondiAddestramento
      };
      this.elementiSecondariCoda.push(elemento);
    }
    console.log(`CODAAAA`,this.elementiSecondariCoda)
  }

  contoAllaRovescia(tempoMilli: number) {
    console.log('conto rovescia')
    if (!this.timerInEsecuzione && this.codaTempoPrimoElemento > 0) {
      this.timerInEsecuzione = true;
      this.intervalId = setInterval(() => {

        const now = Date.now();
        if (now < tempoMilli) {
          console.log('tempo')
          this.codaTempoPrimoElemento = Math.floor((tempoMilli - now) / 1000);
          this.codaTempoTotale = Math.floor((this.codaTempTot - now) / 1000);
        } else {
          this.clearTimer();
        }

      }, 1000);
    }
  }

  clearTimer(): void {
    console.log('clear timer')
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.timerInEsecuzione = false;
      console.log('uce.length', this.uce.length)
      if(this.uce.length > 1) {
        this.caricaCoda(1);
        this.codaTempoPrimoElemento--;
      }
      this.uce.splice(0, 1);
      this.caricaCodaSecondaria();
    }
  }


}
