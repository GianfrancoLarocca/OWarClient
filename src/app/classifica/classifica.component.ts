import { Component, OnInit, inject } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { Classifica } from '../../models/classifica';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.component.html',
  styleUrl: './classifica.component.css'
})
export class ClassificaComponent implements OnInit{

  playerService = inject(PlayerService);
  router = inject(Router);

  playerId:number = 0;
  selected:string = 'lvl';

  classifica:Array<Classifica> = [];

  ngOnInit(): void {
    this.playerService.getClassificaLivello().subscribe(risposta => {
      this.classifica = risposta;
    })

    this.playerId = this.playerService.basicInfoPlayer!.id
  }

  lvlClassifica() {
    if(this.selected !== 'lvl') {
      this.selected = 'lvl';
      this.playerService.getClassificaLivello().subscribe(risposta => {
        this.classifica = risposta;
      })
    }
  }

  cpClassifica() {
    if(this.selected !== 'cp') {
      this.selected = 'cp';
      this.playerService.getClassificaCp().subscribe(risposta => {
        this.classifica = risposta;
      })
    }
  }

  vediPlayer(playerNickname:string) {
    this.router.navigate([`/player/${playerNickname}`])
  }
}
