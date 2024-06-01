import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrl: './friend-requests.component.css'
})
export class FriendRequestsComponent implements OnInit{

  playerService = inject(PlayerService);
  router = inject(Router);

  requests:any;
  sceltaFattaIds: Array<number> = [];
  friendsIds:Array<number> = [];
  private player:any;

  ngOnInit(): void {
    this.playerService.getReceivedFriendRequests().subscribe(reqSenders => {
      console.log(reqSenders);
      this.requests=reqSenders;
    });

    this.playerService.getPlayer().subscribe(p => {
      this.player = p
      this.sceltaFattaIds = p.sceltaRichiestaAmici;
      console.log('player: ', this.player, this.sceltaFattaIds)
    });

    this.playerService.getFriendsIds().subscribe(friends => {
      this.friendsIds = friends
      console.log('friends', this.friendsIds);
    });
  }

  vediPlayer(playerNickname:string) {
    this.router.navigate([`/player/${playerNickname}`]);
  }


  dialog:boolean=false;
  phrase:string='';
  tipoAzione:string = '';
  senderId:number = 0;
  openDialog(tipo:string, id:number) {

    this.dialog = true;

    this.senderId = id;

    if(tipo === 'accept') {
      this.tipoAzione = 'accept';
      this.phrase = 'Sei sicuro di volerlo aggiungere agli amici?';
    }

    if(tipo === 'reject') {
      this.tipoAzione = 'reject';
      this.phrase = 'Sei sicuro di NON volerlo aggiungere agli amici?';
    }
  }

  si() {

    if(this.tipoAzione === 'accept') {
      console.log('accettata la richiesta del player con id: ', this.senderId);
      this.playerService.addFriend(this.senderId).subscribe(r => console.log(r));
    }

    if(this.tipoAzione === 'reject') {
      console.log('rifiutata la richiesta del player con id: ', this.senderId);
    }

    this.sceltaFattaIds.push(this.senderId);
    this.playerService.friendRequestChose(this.senderId).subscribe(r => console.log(r));

    this.annulla();
  }

  annulla() {
    this.tipoAzione = '';
    this.senderId = 0;
    this.phrase = '';
    this.dialog = false;
  }
}
