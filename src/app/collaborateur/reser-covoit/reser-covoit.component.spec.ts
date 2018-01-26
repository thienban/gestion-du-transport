import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserCovoitComponent } from './reser-covoit.component';

describe('ReserCovoitComponent', () => {
  let component: ReserCovoitComponent;
  let fixture: ComponentFixture<ReserCovoitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserCovoitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserCovoitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
