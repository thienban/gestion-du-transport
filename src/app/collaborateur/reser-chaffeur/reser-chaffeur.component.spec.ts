import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserChaffeurComponent } from './reser-chaffeur.component';

describe('ReserChaffeurComponent', () => {
  let component: ReserChaffeurComponent;
  let fixture: ComponentFixture<ReserChaffeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserChaffeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserChaffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
