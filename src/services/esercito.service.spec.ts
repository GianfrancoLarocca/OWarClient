import { TestBed } from '@angular/core/testing';

import { EsercitoService } from './esercito.service';

describe('EsercitoService', () => {
  let service: EsercitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsercitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
