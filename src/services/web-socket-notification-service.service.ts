import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import { PlayerNotification } from '../models/player-notification';

@Injectable({
  providedIn: 'root'
})
export class WebSocketNotificationService {

  private client!:Client;
  private notificationsSubject: Subject<PlayerNotification>;
  private localUrl = 'http://localhost:7070/ws';

  constructor() {
    this.notificationsSubject = new Subject<PlayerNotification>();
  }

  connect(id:number) {

    if (!this.client || !this.client.connected) {
      this.client = new Client({
        webSocketFactory: () => new SockJS(this.localUrl),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: (str) => { console.log(str); },
        onConnect: (frame) => {
          this.client.subscribe(`/topic/notification/${id}`, (message: IMessage) => {
            console.log(message);
            this.notificationsSubject.next(JSON.parse(message.body));
          });
        },
        onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
        }
      });

      this.client.activate();
    }
  }

  getNotifications(): Observable<PlayerNotification> {
    return this.notificationsSubject.asObservable();
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
    }
  }

}

