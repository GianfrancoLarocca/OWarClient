import { Component, OnInit, inject } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { Attivita } from '../../models/attivita';
import { PageAttivita } from '../../models/page-attivita';



@Component({
  selector: 'app-registro-attivita',
  templateUrl: './registro-attivita.component.html',
  styleUrl: './registro-attivita.component.css'
})
export class RegistroAttivitaComponent implements OnInit {

  playerService = inject(PlayerService);
  attivita?: PageAttivita;

  pageNumber: number = 0;
  pageSize: number = 20;

  selected:string = 'tutto';

  ngOnInit(): void {

    this.playerService.tastoSelezionato = 'tasto_registro_attivita';

    this.playerService.getRegistroAttivita(this.pageNumber, this.pageSize).subscribe(attivita => {
      this.attivita = attivita;
    })
  }

  caricaAltriElementi() {

    if(!this.attivita?.last) {
      this.playerService.getRegistroAttivita(this.pageNumber, this.attivita!.numberOfElements+this.pageSize).subscribe(attivita => {
        this.attivita = attivita;
      })
    }
  }

  nulla(){}

  regTutto() {

    if(this.selected !== 'tutto') {

      this.selected = 'tutto';

      this.playerService.getRegistroAttivita(this.pageNumber, this.pageSize).subscribe(attivita => {
        this.attivita = attivita;
      })
    }

  }

  regUp() {
    if(this.selected !== 'upgrade') {
      this.selected = 'upgrade';
    }

  }

  regBattaglie() {
    if(this.selected !== 'battaglie') {
      this.selected = 'battaglie';
    }
  }

}
