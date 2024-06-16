import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArsenaleComponent } from './arsenale.component';

describe('ArsenaleComponent', () => {
  let component: ArsenaleComponent;
  let fixture: ComponentFixture<ArsenaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArsenaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArsenaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
