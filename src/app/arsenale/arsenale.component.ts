import { Component, OnInit, inject } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { StrutturaDettDto } from '../../models/struttura-dett-dto';
import { StrutturaDto } from '../../models/struttura-dto';
import { ChiudiFinestreService } from '../../services/chiudi-finestre.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, heartBeatAnimation, headShakeAnimation } from 'angular-animations';

@Component({
  selector: 'app-arsenale',
  templateUrl: './arsenale.component.html',
  styleUrl: './arsenale.component.css',
  animations: [
    fadeInOnEnterAnimation({duration: 500}),
    fadeOutOnLeaveAnimation({duration: 500}),
    heartBeatAnimation(),
    headShakeAnimation(),
  ]
})
export class ArsenaleComponent implements OnInit {

  playerService = inject(PlayerService);
  public chiudiFinestre = inject(ChiudiFinestreService);

  title = 'Arsenale';

  private arsenaleDto: Array<StrutturaDto> = [];
  public arsenaleDett?: StrutturaDettDto;

  public P070?: StrutturaDto;
  public TT9000?: StrutturaDto;
  public S99K?: StrutturaDto;
  public BR88EVO?: StrutturaDto;
  public AKK164?: StrutturaDto;
  public SP3R?: StrutturaDto;

  fabbricaMunizioniLvl:number=0;

  ngOnInit(): void {

    this.playerService.tastoSelezionato = 'tasto_arsenale';

    this.playerService.getLivelloFabbrica().subscribe(livello => this.fabbricaMunizioniLvl = livello);
    this.caricaArsenale();

    /*
    this.playerService.getSviluppoArsenale().subscribe(r => console.log('arsenale', r))
    this.playerService.getSviluppoArsenaleDett(14).subscribe(r => console.log('arsenale dettagli', r))
    this.playerService.canPaySviluppoArsenale(14).subscribe(r => console.log('arsenale can pay', r))
    this.playerService.provaAlzaLivelloArsenale(14).subscribe(r => console.log('arsenale try lvl up', r))
    this.playerService.getLivelloFabbrica().subscribe(r => console.log('livello fabbrica', r))
    */
  }

  caricaArsenale() {
    this.playerService.getSviluppoArsenale().subscribe(r => {
      this.arsenaleDto = r;
      console.log('arsenaleDto', r);

      this.P070 = this.arsenaleDto.find(ars => ars.nome === "P070");
      this.TT9000 = this.arsenaleDto.find(ars => ars.nome === "TT9000");
      this.S99K = this.arsenaleDto.find(ars => ars.nome === "S99K");
      this.BR88EVO = this.arsenaleDto.find(ars => ars.nome === "BR88EVO");
      this.AKK164 = this.arsenaleDto.find(ars => ars.nome === "AKK164");
      this.SP3R = this.arsenaleDto.find(ars => ars.nome === "SP3R");
    });
  }

  showDetails: boolean = false;
  public showDetailsMethod(idArsenale:number) {

    if (idArsenale > 0) {
      this.showDetails = true

      console.log(idArsenale)

      this.playerService.getSviluppoArsenaleDett(idArsenale).subscribe(arsDett => this.arsenaleDett = arsDett);
    }
  }

  messaggioErrore:string = '';
  tryUp(id: number) {

    this.playerService.canPaySviluppoArsenale(id).subscribe(risultato => {

      if(risultato) {
        if(this.arsenaleDett!.livelloFabbricaRequisito! <= this.fabbricaMunizioniLvl) {
          this.chiudiFinestre.tryUpCond = true;
        } else {
          this.chiudiFinestre.errori = true;
          this.messaggioErrore = `Non hai soffisfatto i requisiti. Devi prima alzare la Fabbrica di munizioni al livello ${this.arsenaleDett?.livelloFabbricaRequisito} !!!`
        }
      } else {
        this.chiudiFinestre.errori = true;
        this.messaggioErrore = 'Non hai risorse a sufficenza per poter alzare questa arma!'
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
    this.playerService.provaAlzaLivelloArsenale(id).subscribe(ris => {
      console.log(ris)
      this.risultatoTry(idStruttura, true);
    },
    (err) => {
      console.log('errore', err);
      this.risultatoTry(idStruttura, false);
    })

    this.sceltaPositiva();
  }

  risultatoTry(arsenaleId:number, risultato:boolean) {
    if(risultato) {
      this.chiudiFinestre.success = true;
      this.chiudiFinestre.fail = false;
      this.caricaArsenale();
      this.showDetailsMethod(arsenaleId);
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

  schedaTecnicaVista:boolean = false;
  vediSchedaTecnica(){
    if(this.schedaTecnicaVista === false) {
      this.schedaTecnicaVista = true;
    }
  }

  chiudiSchedaTecnica() {
    if(this.schedaTecnicaVista === true) {
      this.schedaTecnicaVista = false;
    }
  }

}
