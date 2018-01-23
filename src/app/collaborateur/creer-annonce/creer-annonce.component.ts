import { Component, OnInit } from '@angular/core';
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
import 'rxjs/add/observable/zip';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { concat } from 'rxjs/operators/concat';
import { AbstractControl, FormControl } from '@angular/forms/src/model';
import { Annonce } from '../../domain/Annonce';

@Component({
  selector: 'app-creer-annonce',
  templateUrl: './creer-annonce.component.html',
  styleUrls: ['./creer-annonce.component.css']
})
export class CreerAnnonceComponent implements OnInit {
  constructor(private fb: FormBuilder, private annonceSvc: AnnonceService) {}
  vehiculeForm: FormGroup;
  dateTimeForm: FormGroup;

  get heure() {
    return this.dateTimeForm.get('heure');
  }

  get date() {
    return this.dateTimeForm.get('date');
  }

  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () =>
    (this.searching = false)
  );

  origin: string;
  destination: string;
  distance: string;
  duration: string;

  originSelected = new BehaviorSubject<boolean>(false);
  destinationSelected = new BehaviorSubject<boolean>(false);

  validItineraire = false;
  ngOnInit() {
    this.vehiculeForm = this.fb.group({
      immatriculation: ['', Validators.required],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      nbPlaces: [
        '',
        [Validators.required, Validators.max(20), Validators.min(1)]
      ]
    });

    this.dateTimeForm = this.fb.group({
      date: ['', Validators.required],
      heure: ['', Validators.required]
    });

    this.originSelected
      .asObservable()
      .merge(this.destinationSelected.asObservable())
      .switchMap(val => {
        if (
          this.originSelected.getValue() &&
          this.destinationSelected.getValue()
        ) {
          this.validItineraire = true;
          return this.annonceSvc.getTrajetInfo(this.origin, this.destination);
        } else {
          return Observable.of(null);
        }
      })
      .subscribe(val => {
        if (val) {
          this.distance = val.distance ? val.distance.humanReadable : 'unknown';
          this.duration = val.duration ? val.duration.humanReadable : 'unknown';
        }
      });
  }

  selectedDestination(dest: any) {
    this.destination = dest.item;
    this.destinationSelected.next(true);
  }
  selectedOrigin(origin: any) {
    this.origin = origin.item;
    this.originSelected.next(true);
  }

  publish() {
    const dateTime = this.dateTimeForm.value;
    const dateDepart = new Date(
      dateTime.date.year,
      dateTime.date.month,
      dateTime.date.day,
      dateTime.heure.hour,
      dateTime.heure.minute
    );
    const newAnnonce = new Annonce(
      this.origin,
      this.destination,
      dateDepart,
      this.vehiculeForm.value
    );
    console.log('publish : ', newAnnonce);
    this.annonceSvc.publishAnnonce(newAnnonce).subscribe(ann => {
      console.log('response to publish : ', ann);
    });
  }

  search = (text$: Observable<string>) => {
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
}
