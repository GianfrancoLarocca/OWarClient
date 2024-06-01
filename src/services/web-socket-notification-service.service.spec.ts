import { TestBed } from '@angular/core/testing';

import { WebSocketNotificationServiceService } from './web-socket-notification-service.service';

describe('WebSocketNotificationServiceService', () => {
  let service: WebSocketNotificationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketNotificationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
