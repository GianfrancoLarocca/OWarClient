import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { Subscription, interval } from 'rxjs';
import { ChiudiFinestreService } from '../../services/chiudi-finestre.service';
import { BasicDto } from '../../models/basic-dto';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketNotificationService } from '../../services/web-socket-notification-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerNotification } from '../../models/player-notification';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
})
export class BaseComponent implements OnInit, OnDestroy {

  public playerService = inject(PlayerService);
  authService = inject(AuthService);
  router = inject(Router);
  public chiudiFinestre = inject(ChiudiFinestreService);
  notificationService = inject(WebSocketNotificationService);
  snackBar = inject(MatSnackBar);

  aggiornaRisorseSubscription: any;

  basicInfoPlayer?:BasicDto;

  private notificationSubscription!: Subscription;
  notification!:PlayerNotification;
  notificationCounter:number = 0;

  ngOnInit(): void {
    this.playerService.getRisorse();
    this.playerService.getProduzioneRisorse();
    this.playerService.getBasicPlayerInformation();

    this.aggiornaRisorseSubscription = interval(1000 * 5).subscribe(() => {
      this.playerService.getRisorse();
      console.log('Aggiorno risorse');
    });

    this.playerService.getPlayer().subscribe(info => {
      let playerId = info.id;
      this.notificationCounter = info.contatori.notificationCounter;
      this.notificationService.connect(playerId);
      this.notificationSubscription = this.notificationService.getNotifications().subscribe(notification => {
        this.notification = notification;
        this.notificationCounter++;
        console.log('notification', this.notification);
        this.mostraNotifica(this.notification.title);
      })
    });


  }

  chiudiTutto() {
    this.chiudiFinestre.chiudiFinestraErrore();
    this.chiudiFinestre.chiudiSuccOrFail();
    this.chiudiFinestre.chiudiSchedaTecnica();
  }

  ngOnDestroy() {
    this.aggiornaRisorseSubscription.unsubscribe();

    // Unsubscribe to avoid memory leaks
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
    // Disconnect the socket connection when the component is destroyed
    this.notificationService.disconnect();
  }

  mostraNotifica(message: string) {
    this.snackBar.open(message, 'OK', {duration: 5000, verticalPosition: 'top', horizontalPosition: 'left', panelClass:'custom-snackbar'});
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
