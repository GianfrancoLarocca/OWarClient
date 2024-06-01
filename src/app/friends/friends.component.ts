import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent implements OnInit {


  playerService = inject(PlayerService);
  router = inject(Router);

  friends:Array<any> = [];

  ngOnInit(): void {
    this.aggiornaListaAmici();
  }

  aggiornaListaAmici() {
    this.playerService.getFriends().subscribe(risposta => {
      this.friends = risposta;
    })
  }

  vediPlayer(playerNickname:string) {
    this.router.navigate([`/player/${playerNickname}`]);
  }

  cercaPlayer() {
    this.router.navigate([`/search-player`]);
  }

  rimuoviAmicoDialogo:boolean = false;
  amicoDaRimuovereId:number = 0;
  rimuoviAmicoDialog(id:number) {
    this.rimuoviAmicoDialogo = true
    this.amicoDaRimuovereId = id;
  }

  rimuoviAmicoSi() {
    this.rimuoviAmico(this.amicoDaRimuovereId);
    this.amicoDaRimuovereId = 0;
    this.rimuoviAmicoDialogo = false;
  }

  rimuoviAmicoAnnulla() {
    this.amicoDaRimuovereId = 0;
    this.rimuoviAmicoDialogo = false;
  }

  rimuoviAmico(id:number){
    this.playerService.removeFriend(id).subscribe(risposta => {
      console.log(`Rimozione dell' amico con id: ${id}` , risposta)
      this.aggiornaListaAmici();
    });

  }

}
