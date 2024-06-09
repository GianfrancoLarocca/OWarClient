import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RisorsaDto } from '../../models/risorsa-dto';
import { StrutturaDto } from '../../models/struttura-dto';
import { StrutturaDettDto } from '../../models/struttura-dett-dto';
import { ProduzioneRisorseDto } from '../../models/produzione-risorse-dto';
import { BasicDto } from '../../models/basic-dto';
import { PageAttivita } from '../../models/page-attivita';
import { Classifica } from '../../models/classifica';
import { AuthService } from '../auth/auth.service';
import { PlayerNotification } from '../../models/player-notification';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

    //backend url
    localhostUrl: string = 'http://localhost:7070/api/player';
    localClassificaUrl:string = 'http://localhost:7070/api/classifica'

    //dependencies
    http = inject(HttpClient);
    router = inject(Router);
    auth = inject(AuthService);

    //general fields

    basicInfoPlayer?:BasicDto;
    progressPercentage: number = 0;

    public risorseDto: Array<RisorsaDto> = [];

    public microchipDto?: RisorsaDto;
    public metalloDto?: RisorsaDto;
    public energiaDto?: RisorsaDto;
    public civiliDto?: RisorsaDto;
    public bitcoinDto?: RisorsaDto;
    public acquaDto?: RisorsaDto;

    public produzioneRisorse: any

    public microchipProd?: ProduzioneRisorseDto;
    public metalloProd?: ProduzioneRisorseDto;
    public energiaProd?: ProduzioneRisorseDto;
    public civiliProd?: ProduzioneRisorseDto;
    public bitcoinProd?: ProduzioneRisorseDto;
    public acquaProd?: ProduzioneRisorseDto;

    public tastoSelezionato = '';

  constructor() { }

  updateExpBar() {

    //var esperienzaIniziale = this.basicInfoPlayer!.expStartLvl;
    var esperienzaIniziale = 0;
    var esperienzaAttuale = this.basicInfoPlayer!.exp;
    var esperienzaProssimoLivello = this.basicInfoPlayer!.expNextLevel;

    var diffProssimoLivello = esperienzaProssimoLivello - esperienzaIniziale;

    var diffLivelloPrecedente = esperienzaAttuale - esperienzaIniziale;

    var lunghezzaBarraEsperienza = diffLivelloPrecedente / diffProssimoLivello * 100;
    this.progressPercentage = lunghezzaBarraEsperienza;
  }

  getBasicPlayerInformation() {
    this.http.get<BasicDto>(`${this.localhostUrl}/basic`).subscribe(risposta => {
      this.basicInfoPlayer = risposta;
      this.updateExpBar();
    });
  }

  getPlayer() {
    return this.http.get<any>(`${this.localhostUrl}`);
  }

  getNotifications() {
    return this.http.get<Array<PlayerNotification>>(`${this.localhostUrl}/notifications`);
  }

  getBasicPlayerInformationByPlayerNickname(nickname:string) {
    return this.http.get<BasicDto>(`${this.localhostUrl}/basic/${nickname}`);
  }

  getRegistroAttivita(pageN:number, pageSize:number) {
    return this.http.get<PageAttivita>(`${this.localhostUrl}/registro-attivita/${pageN}/${pageSize}`);
  }

  getRisorse() {
    this.http.get<Array<RisorsaDto>>(`${this.localhostUrl}/risorse`).subscribe(risposta => {
      this.risorseDto = risposta;
      this.microchipDto = this.risorseDto.find(risorsa => risorsa.nomeRisorsa === "MICROCHIP");
      this.metalloDto = this.risorseDto.find(risorsa => risorsa.nomeRisorsa === "METALLO");
      this.energiaDto = this.risorseDto.find(risorsa => risorsa.nomeRisorsa === "ENERGIA");
      this.civiliDto = this.risorseDto.find(risorsa => risorsa.nomeRisorsa === "CIVILI");
      this.bitcoinDto = this.risorseDto.find(risorsa => risorsa.nomeRisorsa === "BITCOIN");
      this.acquaDto = this.risorseDto.find(risorsa => risorsa.nomeRisorsa === "ACQUA");
    },
    err => {
      console.error(err);
      this.auth.logout();
    }
    );
  }

  getStrutture() {
    return this.http.get<Array<StrutturaDto>>(`${this.localhostUrl}/strutture`);
  }

  getStruttureByNickname(nickname:string) {
    return this.http.get<Array<StrutturaDto>>(`${this.localhostUrl}/strutture/${nickname}`);
  }

  getStrutturaDett(nomeStruttura:string) {
    return this.http.get<StrutturaDettDto>(`${this.localhostUrl}/strutture/nome/${nomeStruttura}`);
  }

  getProduzioneRisorse() {
    this.http.get<ProduzioneRisorseDto>(`${this.localhostUrl}/strutture/produzione`).subscribe(risposta => {
      this.produzioneRisorse = risposta;
      this.microchipProd = this.produzioneRisorse.find((produzione: { risorsa: string; }) => produzione.risorsa === "MICROCHIP");
      this.metalloProd = this.produzioneRisorse.find((produzione: { risorsa: string; }) => produzione.risorsa === "METALLO");
      this.energiaProd = this.produzioneRisorse.find((produzione: { risorsa: string; }) => produzione.risorsa === "ENERGIA");
      this.civiliProd = this.produzioneRisorse.find((produzione: { risorsa: string; }) => produzione.risorsa === "CIVILI");
      this.bitcoinProd = this.produzioneRisorse.find((produzione: { risorsa: string; }) => produzione.risorsa === "BITCOIN");
      this.acquaProd = this.produzioneRisorse.find((produzione: { risorsa: string; }) => produzione.risorsa === "ACQUA");
    });
  }

  provaAlzaLivello(sviluppoId: number) {
    return this.http.get(`${this.localhostUrl}/strutture/id/${sviluppoId}/alzalivello`, { responseType: 'text' });
  }

  canPay(sviluppoId: number) {
    return this.http.get<Boolean>(`${this.localhostUrl}/strutture/id/${sviluppoId}/canpay`);
  }

  getClassificaLivello() {
    return this.http.get<Array<Classifica>>(`${this.localClassificaUrl}/livello`);
  }

  getClassificaCp() {
    return this.http.get<Array<Classifica>>(`${this.localClassificaUrl}/cp`);
  }

  getFriends() {
    return this.http.get<Array<any>>(`${this.localhostUrl}/friends`);
  }

  getFriendsIds() {
    return this.http.get<Array<number>>(`${this.localhostUrl}/friends/ids`);
  }

  getSentFriendRequests() {
    return this.http.get<Array<number>>(`${this.localhostUrl}/friend-requests/ids`);
  }

  getReceivedFriendRequests() {
    return this.http.get<Array<any>>(`${this.localhostUrl}/received-friend-requests`);
  }

  addFriend(id:number) {
    return this.http.post<boolean>(`${this.localhostUrl}/friend/add/${id}`, {})
  }

  removeFriend(id:number) {
    return this.http.post<boolean>(`${this.localhostUrl}/friend/remove/${id}`, {})
  }

  cercaPlayer(nickname:string) {
    return this.http.get<any>(`${this.localhostUrl}/find/${nickname}`);
  }

  sendFriendRequest(playerId:number) {
    return this.http.get<boolean>(`${this.localhostUrl}/send-friend-request/${playerId}`);
  }

  friendRequestChose(playerId:number) {
    return this.http.get<boolean>(`${this.localhostUrl}/friend-request-chose/${playerId}`);
  }

  //SVILUPPO

  getSviluppoStrutture() {
    return this.http.get<Array<StrutturaDto>>(`${this.localhostUrl}/sviluppo/strutture`);
  }

  getSviluppoStrutturaDett(idSviluppoStruttura:number) {
    return this.http.get<StrutturaDettDto>(`${this.localhostUrl}/sviluppo/strutture/id/${idSviluppoStruttura}`);
  }

  canPaySviluppoStrutture(sviluppoId: number) {
    return this.http.get<Boolean>(`${this.localhostUrl}/sviluppo/strutture/id/${sviluppoId}/canpay`);
  }

  provaAlzaLivelloSviluppoStrutture(sviluppoId: number) {
    return this.http.get(`${this.localhostUrl}/sviluppo/strutture/id/${sviluppoId}/alzalivello`, { responseType: 'text' });
  }
}
