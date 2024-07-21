import { TestBed } from '@angular/core/testing';

import { WebSocketSoldiersService } from './web-socket-soldiers.service';

describe('WebSocketSoldiersService', () => {
  let service: WebSocketSoldiersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketSoldiersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
