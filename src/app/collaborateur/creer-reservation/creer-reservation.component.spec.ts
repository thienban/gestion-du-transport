import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerReservationComponent } from './creer-reservation.component';

describe('CreerReservationComponent', () => {
  let component: CreerReservationComponent;
  let fixture: ComponentFixture<CreerReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
