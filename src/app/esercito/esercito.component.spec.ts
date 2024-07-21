import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsercitoComponent } from './esercito.component';

describe('EsercitoComponent', () => {
  let component: EsercitoComponent;
  let fixture: ComponentFixture<EsercitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EsercitoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EsercitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
