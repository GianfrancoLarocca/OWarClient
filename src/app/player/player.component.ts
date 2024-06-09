import { Component, OnInit, inject } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { BasicDto } from '../../models/basic-dto';
import { StrutturaDto } from '../../models/struttura-dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit{

  playerService = inject(PlayerService);
  actRoute = inject(ActivatedRoute);
  route = inject(Router);

  playerInfo!:BasicDto;

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

  ngOnInit(): void {

    this.playerService.tastoSelezionato = '';

    if(this.actRoute.snapshot.paramMap.get('nickname')) {
      //console.log(this.actRoute.snapshot.paramMap.get('nickname'));
      this.caricaPlayerInfo(this.actRoute.snapshot.paramMap.get('nickname')!);
      this.caricaStrutture(this.actRoute.snapshot.paramMap.get('nickname')!);
    } else {
      this.caricaPlayerInfo('');
      this.caricaStrutture('');
    }

  }

  caricaPlayerInfo(nick:string){

    let nickname:string;
    if(nick === '' || nick === null) {
       nickname = this.playerService.basicInfoPlayer!.nickname
    } else {
      nickname = nick;
    }

    this.playerService.getBasicPlayerInformationByPlayerNickname(nickname).subscribe( ris => {
      this.playerInfo = ris;
    })
  }

  caricaStrutture(nick:string) {

    let nickname:string;
    if(nick === '' || nick === null) {
       nickname = this.playerService.basicInfoPlayer!.nickname
    } else {
      nickname = nick;
    }

    this.playerService.getStruttureByNickname(nickname).subscribe(strutture => {
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
    },
    err => {
      this.route.navigate(['/home'])
    });
  }

}


