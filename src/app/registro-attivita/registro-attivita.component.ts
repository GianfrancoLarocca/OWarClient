import { Component, OnInit, inject } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { Attivita } from '../../models/attivita';



@Component({
  selector: 'app-registro-attivita',
  templateUrl: './registro-attivita.component.html',
  styleUrl: './registro-attivita.component.css'
})
export class RegistroAttivitaComponent implements OnInit{

  playerService = inject(PlayerService);
  attivita: Array<Attivita> = [];

  ngOnInit(): void {
    this.playerService.getRegistroAttivita().subscribe(attivita => {
      this.attivita = attivita;
      console.log(this.attivita);
    })
  }


}
