import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerChauffeurComponent } from './creer-chauffeur.component';

describe('CreerChauffeurComponent', () => {
  let component: CreerChauffeurComponent;
  let fixture: ComponentFixture<CreerChauffeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerChauffeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
