import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StruttureComponent } from './strutture.component';

describe('StruttureComponent', () => {
  let component: StruttureComponent;
  let fixture: ComponentFixture<StruttureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StruttureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StruttureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
