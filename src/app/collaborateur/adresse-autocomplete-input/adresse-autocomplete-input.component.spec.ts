import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseAutocompleteInputComponent } from './adresse-autocomplete-input.component';

describe('AdresseAutocompleteInputComponent', () => {
  let component: AdresseAutocompleteInputComponent;
  let fixture: ComponentFixture<AdresseAutocompleteInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdresseAutocompleteInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdresseAutocompleteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
