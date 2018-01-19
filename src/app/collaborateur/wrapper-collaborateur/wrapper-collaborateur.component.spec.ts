import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperCollaborateurComponent } from './wrapper-collaborateur.component';

describe('WrapperCollaborateurComponent', () => {
  let component: WrapperCollaborateurComponent;
  let fixture: ComponentFixture<WrapperCollaborateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapperCollaborateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
