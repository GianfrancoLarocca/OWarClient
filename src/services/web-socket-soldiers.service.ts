import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { Subject, Observable } from 'rxjs';
import SockJS from 'sockjs-client';
import { UnitaComprateEsercito } from '../models/unita-comprate-esercito';

@Injectable({
  providedIn: 'root'
})
export class WebSocketSoldiersService {

  private client!:Client;
  private unitaComprateEsercitoSubject: Subject<Array<UnitaComprateEsercito>>;
  private localUrl = 'http://localhost:7070/ws';
  private isConnected = false;

  constructor() {
    this.unitaComprateEsercitoSubject = new Subject<Array<UnitaComprateEsercito>>();
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
          this.isConnected = true;
          this.client.subscribe(`/topic/soldati/${id}`, (message: IMessage) => {
            console.log(message);
            this.unitaComprateEsercitoSubject.next(JSON.parse(message.body));
          });
        },
        onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
        },
        onDisconnect: () => {
          this.isConnected = false;
        }
      });

      this.client.activate();
    }
  }

  getSoldiers(): Observable<Array<UnitaComprateEsercito>> {
    return this.unitaComprateEsercitoSubject.asObservable();
  }

  sendMessage(destination: string, body?: any) {
    if (this.client && this.client.connected) {
      console.log(`Sending message to ${destination}:`, body);
      this.client.publish({
        destination: destination,
        body: body ? JSON.stringify(body) : ''
      });
    } else {
      console.error('Client is not connected');
    }
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.isConnected = false;
    }
  }
}
