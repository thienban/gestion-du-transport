import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCovoiturageComponent } from './detail-covoiturage.component';

describe('DetailCovoiturageComponent', () => {
  let component: DetailCovoiturageComponent;
  let fixture: ComponentFixture<DetailCovoiturageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCovoiturageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
