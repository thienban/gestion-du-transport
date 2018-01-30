import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserVehiculeComponent } from './reser-vehicule.component';

describe('ReserVehiculeComponent', () => {
  let component: ReserVehiculeComponent;
  let fixture: ComponentFixture<ReserVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserVehiculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
