import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrl: './search-player.component.css'
})
export class SearchPlayerComponent implements OnInit{


  playerService = inject(PlayerService);
  router = inject(Router);

  players:Array<any> = [];

  cercaInput:string = '';

  player:any;
  friendsIds:Array<number> = [];
  friendRequests:Array<number> = [];

  ngOnInit(): void {
    this.playerService.getPlayer().subscribe(p => this.player = p);
    this.playerService.getFriendsIds().subscribe(friends => {
      this.friendsIds = friends
      console.log('friends', this.friendsIds);
    });

    this.playerService.getSentFriendRequests().subscribe(req => {
      this.friendRequests = req
      console.log('friendRequests', this.friendRequests);
    });
  }

  onInputChange() {

    if(this.cercaInput.length >= 1) {
      console.log(this.cercaInput)
      this.playerService.cercaPlayer(this.cercaInput).subscribe(risposta => {
        console.log(risposta);
        this.players = risposta;
      })
    }
  }

  vediPlayer(playerNickname:string) {
    this.router.navigate([`/player/${playerNickname}`]);
  }

  aggiungiAmico(playerId:number) {
    this.playerService.sendFriendRequest(playerId).subscribe(r => console.log(r))
  }

  dialog:boolean=false;
  phrase:string='';
  tipoAzione:string = '';
  friendId:number = 0;
  openDialog(tipo:string, id:number) {

    this.dialog = true;

    this.friendId = id;

    if(tipo === 'request') {
      this.tipoAzione = 'request';
      this.phrase = 'Confermi di voler mandare la richiesta amico?';
    }

  }

  si() {

    if(this.tipoAzione === 'request') {
      console.log('Richiesta d\'amicizia mandata a: ', this.friendId);
      this.playerService.sendFriendRequest(this.friendId).subscribe(r => console.log(r));
      this.friendRequests.push(this.friendId);
    }

    this.annulla();
  }

  annulla() {
    this.tipoAzione = '';
    this.friendId = 0;
    this.phrase = '';
    this.dialog = false;
  }

}
