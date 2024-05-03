import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAttivitaComponent } from './registro-attivita.component';

describe('RegistroAttivitaComponent', () => {
  let component: RegistroAttivitaComponent;
  let fixture: ComponentFixture<RegistroAttivitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroAttivitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroAttivitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
