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

  public granata?: StrutturaDto;
  public droneEsplosivo?: StrutturaDto;
  public sistemaMissilistico?: StrutturaDto;
  public moody?: StrutturaDto;
  public doody?: StrutturaDto;
  public zanq?: StrutturaDto;

  public dodo?: StrutturaDto;
  public icio?: StrutturaDto;
  public manu?: StrutturaDto;
  public virus?: StrutturaDto;
  public cargo?: StrutturaDto;
  public droneSpia?: StrutturaDto;

  fabbricaMunizioniLvl:number=0;

  ngOnInit(): void {

    this.playerService.tastoSelezionato = 'tasto_arsenale';

    this.playerService.getLivelloFabbrica().subscribe(livello => this.fabbricaMunizioniLvl = livello);
    this.caricaArsenale();
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

      this.granata = this.arsenaleDto.find(ars => ars.nome === "Granata");
      this.droneEsplosivo = this.arsenaleDto.find(ars => ars.nome === "Drone esplosivo");
      this.sistemaMissilistico = this.arsenaleDto.find(ars => ars.nome === "Sistema missilistico");
      this.moody = this.arsenaleDto.find(ars => ars.nome === "Aer M-00DY");
      this.doody = this.arsenaleDto.find(ars => ars.nome === "Aer D-00DY");
      this.zanq = this.arsenaleDto.find(ars => ars.nome === "Aer ZANQ v92");

      this.dodo = this.arsenaleDto.find(ars => ars.nome === "BOMB-DODO");
      this.icio = this.arsenaleDto.find(ars => ars.nome === "FF IC-10");
      this.manu = this.arsenaleDto.find(ars => ars.nome === "JJ M4-NU");
      this.virus = this.arsenaleDto.find(ars => ars.nome === "Virus informatico");
      this.cargo = this.arsenaleDto.find(ars => ars.nome === "Cargo");
      this.droneSpia = this.arsenaleDto.find(ars => ars.nome === "Drone spia");
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

}
