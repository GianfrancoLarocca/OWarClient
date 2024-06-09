import { Component, OnInit, inject } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { StrutturaDto } from '../../models/struttura-dto';
import { StrutturaDettDto } from '../../models/struttura-dett-dto';
import { ChiudiFinestreService } from '../../services/chiudi-finestre.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, heartBeatAnimation, headShakeAnimation } from 'angular-animations';

@Component({
  selector: 'app-strutture',
  templateUrl: './strutture.component.html',
  styleUrl: './strutture.component.css',
  animations: [
    fadeInOnEnterAnimation({duration: 500}),
    fadeOutOnLeaveAnimation({duration: 500}),
    heartBeatAnimation(),
    headShakeAnimation(),
  ]
})
export class StruttureComponent implements OnInit {

  playerService = inject(PlayerService);
  public chiudiFinestre = inject(ChiudiFinestreService);

  title = 'Strutture';

  private struttureDto: Array<StrutturaDto> = [];
  public strutturaDettagli?: StrutturaDettDto;

  public laboratorio?: StrutturaDto;
  public fabbrica?: StrutturaDto;
  public addestramento?: StrutturaDto;
  public caveau?: StrutturaDto;
  public bunker?: StrutturaDto;
  public cyber?: StrutturaDto;
  public deposito?: StrutturaDto;
  public infermeria?: StrutturaDto;
  public cimitero?: StrutturaDto;


  ngOnInit(): void {

    this.playerService.tastoSelezionato = 'tasto_strutture';

    this.caricaStrutture();

  }

  caricaStrutture() {
    this.playerService.getSviluppoStrutture().subscribe(r => {
      this.struttureDto = r;
      console.log('strutture', r);

      this.laboratorio = this.struttureDto.find(struttura => struttura.nome === "Laboratorio di ricerca");
      this.fabbrica = this.struttureDto.find(struttura => struttura.nome === "Fabbrica di munizioni");
      this.addestramento = this.struttureDto.find(struttura => struttura.nome === "Campo di addestramento");
      this.caveau = this.struttureDto.find(struttura => struttura.nome === "Caveau");
      this.bunker = this.struttureDto.find(struttura => struttura.nome === "Bunker");
      this.cyber = this.struttureDto.find(struttura => struttura.nome === "CyberGuardians Inc.");
      this.deposito = this.struttureDto.find(struttura => struttura.nome === "Deposito bellico");
      this.infermeria = this.struttureDto.find(struttura => struttura.nome === "Infermeria");
      this.cimitero = this.struttureDto.find(struttura => struttura.nome === "Cimitero di guerra");
    });
  }


  showDetails: boolean = false;
  public showDetailsMethod(idSviluppoStruttura:number) {

    if (idSviluppoStruttura > 0) {
      this.showDetails = true


      console.log(idSviluppoStruttura)

      console.log('Chiamata a getSviluppoStrutturaDett');
      this.playerService.getSviluppoStrutturaDett(idSviluppoStruttura).subscribe(strutturaDett => this.strutturaDettagli = strutturaDett);
    }

  }







  messaggioErrore:string = '';
  tryUp(id: number) {

    this.playerService.canPaySviluppoStrutture(id).subscribe(risultato => {

      if(risultato) {
        this.chiudiFinestre.tryUpCond = true;
      } else {
        this.chiudiFinestre.errori = true;
        this.messaggioErrore = 'Non hai risorse a sufficenza per poter alzare questa struttura!'
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
    this.playerService.provaAlzaLivelloSviluppoStrutture(id).subscribe(ris => {
      console.log(ris)
      this.risultatoTry(idStruttura, true);
    },
    (err) => {
      console.log('errore', err);
      this.risultatoTry(idStruttura, false);
    }
  )
    this.sceltaPositiva();
  }

  risultatoTry(idStruttura:number, risultato:boolean) {
    if(risultato) {
      this.chiudiFinestre.success = true;
      this.chiudiFinestre.fail = false;
      this.caricaStrutture();
      this.showDetailsMethod(idStruttura);
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
