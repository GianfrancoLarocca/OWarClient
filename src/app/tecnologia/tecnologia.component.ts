import { Component, OnInit, inject } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { ChiudiFinestreService } from '../../services/chiudi-finestre.service';
import { StrutturaDto } from '../../models/struttura-dto';
import { StrutturaDettDto } from '../../models/struttura-dett-dto';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, heartBeatAnimation, headShakeAnimation } from 'angular-animations';

@Component({
  selector: 'app-tecnologia',
  templateUrl: './tecnologia.component.html',
  styleUrl: './tecnologia.component.css',
  animations: [
    fadeInOnEnterAnimation({duration: 500}),
    fadeOutOnLeaveAnimation({duration: 500}),
    heartBeatAnimation(),
    headShakeAnimation(),
  ]
})
export class TecnologiaComponent implements OnInit {

  playerService = inject(PlayerService);
  public chiudiFinestre = inject(ChiudiFinestreService);

  title = 'Tecnologie';

  private techDto: Array<StrutturaDto> = [];
  public techDett?: StrutturaDettDto;

  public scudo?: StrutturaDto;
  public performante?: StrutturaDto;
  public fortuna?: StrutturaDto;

  laboratorioRicerca:number=0;

  ngOnInit(): void {

    this.playerService.tastoSelezionato = 'tasto_tech';

    this.playerService.getLivelloLaboratorio().subscribe(livello => this.laboratorioRicerca = livello);
    this.caricaTecnologie();
  }

  caricaTecnologie() {
    this.playerService.getSviluppoTecnologia().subscribe(r => {
      this.techDto = r;
      console.log('tech', r);

      this.scudo = this.techDto.find(tech => tech.nome === "Scudo");
      this.performante = this.techDto.find(tech => tech.nome === "Performante");
      this.fortuna = this.techDto.find(tech => tech.nome === "Fortuna");
    });
  }

  showDetails: boolean = false;
  public showDetailsMethod(idTech:number) {

    if (idTech > 0) {
      this.showDetails = true

      console.log(idTech)

      this.playerService.getSviluppoTechDett(idTech).subscribe(techDett => this.techDett = techDett);
    }

  }

  messaggioErrore:string = '';
  tryUp(id: number) {

    this.playerService.canPaySviluppoTech(id).subscribe(risultato => {

      if(risultato) {
        if(this.techDett!.livelloLaboratorioRequisito! <= this.laboratorioRicerca) {
          this.chiudiFinestre.tryUpCond = true;
        } else {
          this.chiudiFinestre.errori = true;
          this.messaggioErrore = `Non hai soffisfatto i requisiti. Devi prima alzare il Laboratorio di reicerca al livello ${this.techDett?.livelloLaboratorioRequisito} !!!`
        }
      } else {
        this.chiudiFinestre.errori = true;
        this.messaggioErrore = 'Non hai risorse a sufficenza per poter alzare questa tecnologia!'
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
    this.playerService.provaAlzaLivelloTech(id).subscribe(ris => {
      console.log(ris)
      this.risultatoTry(idStruttura, true);
    },
    (err) => {
      console.log('errore', err);
      this.risultatoTry(idStruttura, false);
    })

    this.sceltaPositiva();
  }

  risultatoTry(idTech:number, risultato:boolean) {
    if(risultato) {
      this.chiudiFinestre.success = true;
      this.chiudiFinestre.fail = false;
      this.caricaTecnologie();
      this.showDetailsMethod(idTech);
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
