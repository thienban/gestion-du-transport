import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReservSocieteComponent } from './liste-reserv-societe.component';

describe('ListeReservSocieteComponent', () => {
  let component: ListeReservSocieteComponent;
  let fixture: ComponentFixture<ListeReservSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeReservSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeReservSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
