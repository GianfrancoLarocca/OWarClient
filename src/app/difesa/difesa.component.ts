import { Component, OnInit, inject } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { StrutturaDto } from '../../models/struttura-dto';
import { StrutturaDettDto } from '../../models/struttura-dett-dto';
import { ChiudiFinestreService } from '../../services/chiudi-finestre.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, heartBeatAnimation, headShakeAnimation } from 'angular-animations';

@Component({
  selector: 'app-difesa',
  templateUrl: './difesa.component.html',
  styleUrl: './difesa.component.css',
  animations: [
    fadeInOnEnterAnimation({duration: 500}),
    fadeOutOnLeaveAnimation({duration: 500}),
    heartBeatAnimation(),
    headShakeAnimation(),
  ]
})
export class DifesaComponent implements OnInit {

  playerService = inject(PlayerService);
  public chiudiFinestre = inject(ChiudiFinestreService);

  title = 'Difesa';

  private difesaDto: Array<StrutturaDto> = [];
  public difesaDett?: StrutturaDettDto;

  public filo?: StrutturaDto;
  public mina?: StrutturaDto;
  public sentinella?: StrutturaDto;
  public torrettaLeggera?: StrutturaDto;
  public torrettaPesante?: StrutturaDto;
  public torrettaPrecisione?: StrutturaDto;
  public antiMissili?: StrutturaDto;
  public cannone?: StrutturaDto;
  public missileCalore?: StrutturaDto;
  public radio?: StrutturaDto;

  fabbricaMunizioniLvl:number=0;

  ngOnInit(): void {
    this.playerService.tastoSelezionato = 'tasto_difesa';

    this.playerService.getLivelloFabbrica().subscribe(livello => this.fabbricaMunizioniLvl = livello);

    this.caricaDifesa();

    /*
    this.playerService.getSviluppoDifesa().subscribe(r => console.log(r))
    this.playerService.getSviluppoDifesaDett(19).subscribe(r => console.log('dett', r))
    this.playerService.canPaySviluppoDifesa(19).subscribe(r => console.log('can pay?', r), r => console.log('can pay?', r))
    this.playerService.provaAlzaLivelloDifesa(19).subscribe(r => console.log('try', r), r => console.log('try', r))
    */
  }

  caricaDifesa() {
    this.playerService.getSviluppoDifesa().subscribe(r => {
      this.difesaDto = r;
      console.log('difesaDto', this.difesaDto);

      this.filo = this.difesaDto.find(ars => ars.nome === "Filo spinato");
      this.mina = this.difesaDto.find(ars => ars.nome === "Mina anti-uomo");
      this.sentinella = this.difesaDto.find(ars => ars.nome === "Sentinella");
      this.torrettaLeggera = this.difesaDto.find(ars => ars.nome === "Torretta leggera");
      this.torrettaPesante = this.difesaDto.find(ars => ars.nome === "Torretta pesante");
      this.torrettaPrecisione = this.difesaDto.find(ars => ars.nome === "Torretta di precisione");
      this.antiMissili = this.difesaDto.find(ars => ars.nome === "Sistema anti-missilistico");
      this.cannone = this.difesaDto.find(ars => ars.nome === "Cannone");
      this.missileCalore = this.difesaDto.find(ars => ars.nome === "Missile a ricerca di calore");
      this.radio = this.difesaDto.find(ars => ars.nome === "Disturbatore radio");
    });
  }

  showDetails: boolean = false;
  public showDetailsMethod(idDifesa:number) {

    if (idDifesa > 0) {
      this.showDetails = true

      console.log(idDifesa)



      this.playerService.getSviluppoDifesaDett(idDifesa).subscribe(difesaDett => {
          this.difesaDett = difesaDett;
          console.log('dett2', this.difesaDett);
      });
    }
  }

  messaggioErrore:string = '';
  tryUp(id: number) {

    this.playerService.canPaySviluppoDifesa(id).subscribe(risultato => {

      if(risultato) {
        if(this.difesaDett!.livelloFabbricaRequisito! <= this.fabbricaMunizioniLvl) {
          this.chiudiFinestre.tryUpCond = true;
        } else {
          this.chiudiFinestre.errori = true;
          this.messaggioErrore = `Non hai soffisfatto i requisiti. Devi prima alzare la Fabbrica di munizioni al livello ${this.difesaDett?.livelloFabbricaRequisito} !!!`
        }
      } else {
        this.chiudiFinestre.errori = true;
        this.messaggioErrore = 'Non hai risorse a sufficenza per poter alzare questa difesa!'
      }
    });
  }

  chiudiFinestraErrore() {
    this.chiudiFinestre.chiudiFinestraErrore();
  }

  chiudiTryUp() {
    this.chiudiFinestre.chiudiTryUp();
  }

  sceltaPositiva() {
    this.chiudiFinestre.contenuto = true;
  }

  public provaAlzaLivello(id: number, idStruttura:number) {

    console.log('prova alza livello');
    this.playerService.provaAlzaLivelloDifesa(id).subscribe(ris => {
      console.log(ris)
      this.risultatoTry(idStruttura, true);
    },
    (err) => {
      console.log('errore', err);
      this.risultatoTry(idStruttura, false);
    })

    this.sceltaPositiva();
  }

  risultatoTry(difesaId:number, risultato:boolean) {
    if(risultato) {
      this.chiudiFinestre.success = true;
      this.chiudiFinestre.fail = false;
      this.caricaDifesa();
      this.showDetailsMethod(difesaId);
      this.playerService.getProduzioneRisorse();
      this.playerService.getBasicPlayerInformation();
    } else {
      this.chiudiFinestre.success = false;
      this.chiudiFinestre.fail = true;
    }
    this.animate();
    this.playerService.getRisorse();
  }

  animationState = false;
  animationWithState = false;
  cond = false;
  animate() {
    this.cond = true;
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
      this.animationWithState = !this.animationWithState;
    }, 1);
  }

}
