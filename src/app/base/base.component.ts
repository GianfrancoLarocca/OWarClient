import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { RisorsaDto } from '../../models/risorsa-dto';
import { interval } from 'rxjs';
import { ProduzioneRisorseDto } from '../../models/produzione-risorse-dto';
import { ChiudiFinestreService } from '../../services/chiudi-finestre.service';
import { BasicDto } from '../../models/basic-dto';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent implements OnInit, OnDestroy {

  public playerService = inject(PlayerService);
  public chiudiFinestre = inject(ChiudiFinestreService)

  aggiornaRisorseSubscription: any;

  basicInfoPlayer?:BasicDto;


  ngOnInit(): void {
    this.playerService.getRisorse();
    this.playerService.getProduzioneRisorse();
    this.playerService.getBasicPlayerInformation().subscribe(obj => this.basicInfoPlayer = obj);

    this.aggiornaRisorseSubscription = interval(1000 * 5).subscribe(() => {
      this.playerService.getRisorse();
      console.log('Aggiorno risorse');
    });
  }

  chiudiTutto() {
    this.chiudiFinestre.chiudiFinestraErrore();
    this.chiudiFinestre.chiudiSuccOrFail();
  }

  ngOnDestroy() {
    this.aggiornaRisorseSubscription.unsubscribe();
  }



}
