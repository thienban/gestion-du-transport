import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperChauffeurComponent } from './wrapper-chauffeur.component';

describe('WrapperChauffeurComponent', () => {
  let component: WrapperChauffeurComponent;
  let fixture: ComponentFixture<WrapperChauffeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapperChauffeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
