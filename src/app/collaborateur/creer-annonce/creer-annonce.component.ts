import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CreateNewAutocompleteGroup,
  SelectedAutocompleteItem,
  NgAutocompleteComponent
} from 'ng-auto-complete';

@Component({
  selector: 'app-creer-annonce',
  templateUrl: './creer-annonce.component.html',
  styleUrls: ['./creer-annonce.component.css']
})
export class CreerAnnonceComponent implements OnInit {
  @ViewChild(NgAutocompleteComponent) public completer: NgAutocompleteComponent;

  constructor(private fb: FormBuilder) {}
  annonceForm: FormGroup;
  public group = [
    CreateNewAutocompleteGroup(
      'Adresse',
      'completer',
      [
        { title: 'Option 1', id: '1' },
        { title: 'Option 2', id: '2' },
        { title: 'Option 3', id: '3' },
        { title: 'Option 4', id: '4' },
        { title: 'Option 5', id: '5' }
      ],
      { titleKey: 'title', childrenKey: null }
    )
  ];

  selected(item: SelectedAutocompleteItem) {
    console.log(item);
  }

  ngOnInit() {
    const itineraire = this.fb.group({
      adresseDepart: ['', Validators.required],
      adresseArrivee: ['', Validators.required],
      distance: [''],
      duration: ['']
    });

    const vehicule = this.fb.group({
      immatriculation: ['', Validators.required],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      nbPlacesDispo: [
        '',
        [Validators.required, Validators.max(20), Validators.min(1)]
      ]
    });

    const dateTime = this.fb.group({
      date: ['', Validators.required],
      heure: ['', Validators.required]
    });

    this.annonceForm = this.fb.group({
      itineraire,
      vehicule,
      dateTime
    });
    this.initObservables(itineraire, vehicule, dateTime);
  }

  initObservables(
    itineraire: FormGroup,
    vehicule: FormGroup,
    dateTime: FormGroup
  ) {
    itineraire.valueChanges.subscribe(next => {
      console.log(next);
    });
  }
}
