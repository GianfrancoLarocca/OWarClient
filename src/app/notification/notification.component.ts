import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { WebSocketNotificationService } from '../../services/web-socket-notification-service.service';
import { PlayerService } from '../../services/player/player.service';
import { PlayerNotification } from '../../models/player-notification';
import { Subscription } from 'rxjs';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit, OnDestroy {

  playerService = inject(PlayerService);
  notificationService = inject(WebSocketNotificationService);
  base = inject(BaseComponent);

  notifications: Array<PlayerNotification> = [];
  private notificationSubscription!: Subscription;

  sceltaFattaIds: Array<number> = [];
  private player:any;

  ngOnInit() {
    this.playerService.getNotifications().subscribe(notifiche => {
      this.notifications = this.sortNotificationsByDate(notifiche);

      console.log(notifiche)
    });

    this.notificationSubscription = this.notificationService.getNotifications().subscribe(notification => {
      this.notifications.unshift(notification);
      this.base.notificationCounter = 0;
    })

    this.base.notificationCounter = 0;

    this.playerService.getPlayer().subscribe(p => {
      this.player = p
      this.sceltaFattaIds = p.sceltaRichiestaAmici;
      console.log('player: ', this.player, this.sceltaFattaIds)
    });

  }

  sortNotificationsByDate(notifications: Array<PlayerNotification>): Array<PlayerNotification> {
    return notifications.sort((a, b) => {

      return b.id - a.id;
    });
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

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }

    this.playerService.getNotifications().subscribe();
  }



}
