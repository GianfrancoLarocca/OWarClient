import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChiudiFinestreService {

  errori = false;
  tryUpCond = false;
  success = false;
  fail = false;
  contenuto = false;

  constructor() { }

  chiudiFinestraErrore() {
    this.errori = false;
  }

  chiudiTryUp() {
      this.tryUpCond = false;
      this.success = false;
      this.fail = false;
      this.contenuto = false;

  }

  chiudiSuccOrFail() {

    if(this.success || this.fail) {
      this.tryUpCond = false;
      this.success = false;
      this.fail = false;
      this.contenuto = false;
    }
  }

  schedaTecnicaVista:boolean = false;
  vediSchedaTecnica(){
    if(!this.schedaTecnicaVista) {
      setTimeout(() => {
        this.schedaTecnicaVista = true;
      }, 30)
    }
  }

  chiudiSchedaTecnica() {
    if(this.schedaTecnicaVista) {
      this.schedaTecnicaVista = false;
    }
  }
}
