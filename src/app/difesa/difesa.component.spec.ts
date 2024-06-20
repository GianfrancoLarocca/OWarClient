import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifesaComponent } from './difesa.component';

describe('DifesaComponent', () => {
  let component: DifesaComponent;
  let fixture: ComponentFixture<DifesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DifesaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DifesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
