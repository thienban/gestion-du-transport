import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AnnonceService } from '../../shared/services/annonce.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-creer-annonce',
  templateUrl: './creer-annonce.component.html',
  styleUrls: ['./creer-annonce.component.css']
})
export class CreerAnnonceComponent implements OnInit {
  constructor(private fb: FormBuilder, private annonceSvc: AnnonceService) {}
  annonceForm: FormGroup;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () =>
    (this.searching = false)
  );

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
      if (
        next.adresseDepart &&
        next.adresseArrivee &&
        next.adresseArrivee.length > 5
      ) {
        this.annonceSvc
          .getTrajetInfo(next.adresseDepart, next.adresseArrivee)
          .subscribe(trajetInfo => {
            console.log('trajet info :', trajetInfo);
          });
      }
    });
  }

  publish() {
    const iti = this.annonceForm.value.itineraire;
    const dateTime = this.annonceForm.value.dateTime;
    const vehicule = this.annonceForm.value.vehicule;

    const objectToSend = {
      adresseDepart: iti.adresseDepart,
      adresseArrivee: iti.adresseArrivee,
      immatriculation: vehicule.immatriculation,
      marque: vehicule.marque,
      modele: vehicule.modele,
      nbPlaces: vehicule.nbPlacesDispo,
      dateDepart: new Date(
        dateTime.date.year,
        dateTime.date.month,
        dateTime.date.day,
        dateTime.heure.hour,
        dateTime.heure.minute
      ).toISOString()
    };
  }

  search = (text$: Observable<string>) => {
    console.log(text$);
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => (this.searching = true))
      .switchMap(term =>
        this.annonceSvc
          .autocomplete(term)
          .do(() => (this.searchFailed = false))
          .catch(() => {
            this.searchFailed = true;
            return Observable.of([]);
          })
      )
      .do(() => (this.searching = true))
      .merge(this.hideSearchingWhenUnsubscribed);
  };

  searchArrival(text$: Observable<string>) {
    return this.search(text$).do(resp => {
      console.log('arrival searched', resp);
    });
  }

  searchDeparture(text$: Observable<string>) {
    return this.search(text$).do(resp => {});
  }

  arrivalClicked(r) {
    console.log('arrival clicked', r);
  }
}
