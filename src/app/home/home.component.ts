import { Component, HostListener, OnInit, inject } from '@angular/core';
import { StrutturaDto } from '../../models/struttura-dto';
import { PlayerService } from '../../services/player/player.service';
import { StrutturaDettDto } from '../../models/struttura-dett-dto';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, headShakeAnimation, heartBeatAnimation } from 'angular-animations';
import { ChiudiFinestreService } from '../../services/chiudi-finestre.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    fadeInOnEnterAnimation({duration: 500}),
    fadeOutOnLeaveAnimation({duration: 500}),
    heartBeatAnimation(),
    headShakeAnimation(),
  ]
})
export class HomeComponent implements OnInit{

  title = 'Home'
  showDetails: boolean = false;

  private playerService = inject(PlayerService);
  public chiudiFinestre = inject(ChiudiFinestreService);
  private struttureDto: Array<StrutturaDto> = [];

  public nanoChip?: StrutturaDto;
  public silicon?: StrutturaDto;
  public quantumCore?: StrutturaDto;
  public metalForge?: StrutturaDto;
  public steelWorks?: StrutturaDto;
  public alloyTech?: StrutturaDto;
  public nucleare?: StrutturaDto;
  public solare?: StrutturaDto;
  public eolica?: StrutturaDto;
  public appartamento?: StrutturaDto;
  public schiera?: StrutturaDto;
  public villa?: StrutturaDto;
  public cryptoVault?: StrutturaDto;
  public digitalCoin?: StrutturaDto;
  public blockchain?: StrutturaDto;
  public mare?: StrutturaDto;
  public sorgente?: StrutturaDto;
  public fiume?: StrutturaDto;

  public strutturaDettagli?: StrutturaDettDto;


  errori = false;
  tryUpCond = false;
  success = false;
  fail = false;
  contenuto = false;
  ngOnInit(): void {
    this.caricaStrutture();

    this.errori = this.chiudiFinestre.errori;
    this.tryUpCond = this.chiudiFinestre.tryUpCond;
    this.success = this.chiudiFinestre.success;
    this.fail = this.chiudiFinestre.fail;
    this.contenuto = this.chiudiFinestre.contenuto;
  }

  caricaStrutture() {
    this.playerService.getStrutture().subscribe(strutture => {
      this.struttureDto = strutture;

      this.nanoChip = this.struttureDto.find(struttura => struttura.nome === "NanoChip Technologies");
      this.silicon = this.struttureDto.find(struttura => struttura.nome === "Silicon Forge Solutions");
      this.quantumCore = this.struttureDto.find(struttura => struttura.nome === "QuantumCore Semiconductor");

      this.metalForge = this.struttureDto.find(struttura => struttura.nome === "MetalForge Industries");
      this.steelWorks = this.struttureDto.find(struttura => struttura.nome === "SteelWorks Corporation");
      this.alloyTech = this.struttureDto.find(struttura => struttura.nome === "AlloyTech Solutions");

      this.nucleare = this.struttureDto.find(struttura => struttura.nome === "Nucleare");
      this.solare = this.struttureDto.find(struttura => struttura.nome === "Solare");
      this.eolica = this.struttureDto.find(struttura => struttura.nome === "Eolica");

      this.appartamento = this.struttureDto.find(struttura => struttura.nome === "Appartamento");
      this.schiera = this.struttureDto.find(struttura => struttura.nome === "Casa a schiera");
      this.villa = this.struttureDto.find(struttura => struttura.nome === "Villa");

      this.cryptoVault = this.struttureDto.find(struttura => struttura.nome === "CryptoVault Bank");
      this.digitalCoin = this.struttureDto.find(struttura => struttura.nome === "DigitalCoin Bank");
      this.blockchain = this.struttureDto.find(struttura => struttura.nome === "Blockchain Trust Group");

      this.mare = this.struttureDto.find(struttura => struttura.nome === "Mare");
      this.sorgente = this.struttureDto.find(struttura => struttura.nome === "Sorgente");
      this.fiume = this.struttureDto.find(struttura => struttura.nome === "Fiume");
    })
  }

  public showDetailsMethod(div: any) {

    let nomeStruttura = div.querySelector('img').alt;

    if (nomeStruttura != undefined) {
      this.showDetails = true

      this.getStrutturaDettagli(nomeStruttura);
    }

  }

  getStrutturaDettagli(nomeStruttura:string) {
    this.playerService.getStrutturaDett(nomeStruttura).subscribe(strutturaDett => {
      this.strutturaDettagli = strutturaDett;
    })
  }

  messaggioErrore:string = '';
  tryUp(id: number) {

    this.playerService.canPay(id).subscribe(risultato => {

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

  public provaAlzaLivello(id: number, nomeStruttura:string) {
    this.playerService.provaAlzaLivello(id).subscribe(ris => {
      this.risultatoTry(nomeStruttura, true);
    },
    () => {
      this.risultatoTry(nomeStruttura, false);
    }
  )
    this.sceltaPositiva();
  }

  risultatoTry(nomeStruttura:string, risultato:boolean) {
    if(risultato) {
      this.chiudiFinestre.success = true;
      this.chiudiFinestre.fail = false;
      this.caricaStrutture();
      this.getStrutturaDettagli(nomeStruttura);
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
