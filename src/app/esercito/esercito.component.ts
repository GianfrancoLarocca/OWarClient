import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { WebSocketSoldiersService } from '../../services/web-socket-soldiers.service';
import { PlayerService } from '../../services/player/player.service';
import { Subscription } from 'rxjs';
import { ChiudiFinestreService } from '../../services/chiudi-finestre.service';
import { EsercitoDettagliDto } from '../../models/esercito-dettagli-dto';
import { EsercitoService } from '../../services/esercito.service';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-esercito',
  templateUrl: './esercito.component.html',
  styleUrl: './esercito.component.css',
  animations: [
    fadeInOnEnterAnimation({duration: 500}),
    fadeOutOnLeaveAnimation({duration: 500})
  ]
})
export class EsercitoComponent implements OnInit, OnDestroy {

  playerService = inject(PlayerService);
  esercitoWebSocketService = inject(WebSocketSoldiersService);
  esercitoService = inject(EsercitoService);
  public chiudiFinestre = inject(ChiudiFinestreService);

  private soldatiSubscription: Subscription | undefined

  public soldatiDaAddestrareInput: number = 1;
  public playerId:number = 0;

  title = 'Esercito';

  public esercitoDettagli?: EsercitoDettagliDto;

  errorMessage: string = '';
  isVisible: boolean = false;

  ngOnInit(): void {

    this.playerService.tastoSelezionato = 'tasto_esercito';

    this.caricaEsercito();

    this.esercitoService.getCodaAddestramento().subscribe(coda => {
      if (coda.length > 0) {
        console.log("CODA", coda);
        this.esercitoService.uce = coda;
        this.esercitoService.caricaCoda(0);
      } else {
        console.log("Array vuoto", coda);
      }

    },
      err => console.error('errore coda', err)
    );

    this.playerService.getPlayer().subscribe(info => {
      this.playerId = info.id;
      this.esercitoWebSocketService.connect(this.playerId);
      this.soldatiSubscription = this.esercitoWebSocketService.getSoldiers().subscribe(soldiers => {
        this.esercitoService.uce = soldiers;
        console.log('Unità comprate esercito', this.esercitoService.uce);
        this.incremenentaSoldato(this.esercitoService.uce[0].soldatoId);
        this.esercitoService.soldatiInAddestramentoPrimoElemento--;
      })
    });
  }

  caricaEsercito() {
    this.esercitoService.loadEsercito();
  }

  showDetails: boolean = false;
  public showDetailsMethod(soldatoId:number) {

    this.soldatiDaAddestrareInput = 1;

    if (soldatoId > 0) {
      this.showDetails = true

      console.log(soldatoId)

      this.esercitoService.getSoldatoDettagli(soldatoId).subscribe(esercitoDettagli => {
        this.esercitoDettagli = esercitoDettagli;
        console.log(esercitoDettagli)
      });
    }
  }

  incremenentaSoldato(soldatoId:number) {
    this.esercitoService.esercitoDto.forEach(soldato => {
      if(soldato.id === soldatoId) {
        soldato.soldati ++;
      }
    });
    this.esercitoService.updateEsercito(this.esercitoService.esercitoDto);
  }

  compraSoldati(soldatoId:number, quantita:number) {

    if (quantita > 999999999) {
      quantita = 1000000000
    }

    this.soldatiDaAddestrareInput = 1;

    this.esercitoService.compraSoldati(soldatoId, quantita).subscribe(
      uce => {
        console.log('ADDESTRAMENTO: ', uce);
        this.esercitoService.uce = uce;
        this.esercitoService.caricaCoda(0);
      },
      err => {
        console.log(err)
        this.errorMessage = err.error;
        this.isVisible = true;
      }
    );
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Nasconde il messaggio di errore quando si clicca sul documento
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    if (this.soldatiSubscription) {
      this.soldatiSubscription.unsubscribe();
      console.log('Subscription closed:', this.soldatiSubscription)
    }


    this.esercitoWebSocketService.disconnect();
  }

}
