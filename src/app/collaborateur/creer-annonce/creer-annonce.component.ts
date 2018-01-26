import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';
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
import { Annonce } from '../../domain/Annonce';
import { DataService } from '../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailCovoiturageComponent } from '../detail-covoiturage/detail-covoiturage.component';

@Component({
  selector: 'app-creer-annonce',
  templateUrl: './creer-annonce.component.html',
  styleUrls: ['./creer-annonce.component.css']
})
export class CreerAnnonceComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dataSvc: DataService,
    private modalService: NgbModal
  ) {}
  vehiculeForm: FormGroup;
  dateTimeForm: FormGroup;
  newAnnonce: Annonce;

  @ViewChild('actionConfirm') actionConfirm: TemplateRef<any>;

  get immatriculation() {
    return this.vehiculeForm.get('immatriculation');
  }
  get marque() {
    return this.vehiculeForm.get('marque');
  }

  get modele() {
    return this.vehiculeForm.get('modele');
  }
  get nbPlaces() {
    return this.vehiculeForm.get('nbPlaces');
  }

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
  isInvalid = false;

  ngOnInit() {
    this.createForms();
    this.observeItineraireChanges();

    this.dateTimeForm.valueChanges.subscribe(c => console.log(c));

    this.dateTimeForm.valueChanges
      .filter(val => val.date && val.heure)
      .map(
        val =>
          new Date(
            val.date.year,
            val.date.month - 1,
            val.date.day,
            val.heure.hour,
            val.heure.minute
          )
      )
      .map(dateTime => dateTime.getTime() <= Date.now())
      .subscribe(isInvalid => {
        console.log('isInvalid : ', isInvalid);
        this.isInvalid = isInvalid;
      });
  }

  observeItineraireChanges() {
    this.originSelected
      .asObservable()
      .merge(this.destinationSelected.asObservable())
      .switchMap(val => {
        if (
          this.originSelected.getValue() &&
          this.destinationSelected.getValue()
        ) {
          this.validItineraire = true;
          return this.dataSvc.getTrajetInfo(this.origin, this.destination);
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
  createForms() {
    this.vehiculeForm = this.fb.group({
      immatriculation: [''],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      nbPlaces: [
        '',
        [
          Validators.required,
          Validators.max(20),
          Validators.min(1),
          Validators.pattern(/^\d+$/)
        ]
      ]
    });
    this.dateTimeForm = this.fb.group(
      {
        date: ['', Validators.required],
        heure: ['', Validators.required]
      },
      { validator: this.dateTimeValidator }
    );
  }
  dateTimeValidator(control: AbstractControl): { [key: string]: boolean } {
    const date = control.get('date').value;
    const time = control.get('heure').value;
    if (control.get('date').valid && control.get('heure').valid) {
      const dateTime = new Date(
        date.year,
        date.month - 1,
        date.day,
        time.hour,
        time.minute
      );
      if (dateTime.getTime() <= Date.now()) {
        return { anterior: true };
      }
    }
    return null;
  }
  selectedDestination(dest: any) {
    this.destination = dest.item;
    this.destinationSelected.next(true);
  }
  selectedOrigin(origin: any) {
    this.origin = origin.item;
    this.originSelected.next(true);
  }
  confirmAnnonce() {
    const modalRef = this.modalService.open(DetailCovoiturageComponent);
    const dateTime = this.dateTimeForm.value;
    const dateDepart = new Date(
      dateTime.date.year,
      dateTime.date.month,
      dateTime.date.day,
      dateTime.heure.hour,
      dateTime.heure.minute
    );
    this.newAnnonce = new Annonce(
      this.origin,
      this.destination,
      dateDepart,
      this.vehiculeForm.value
    );
    delete this.newAnnonce.nbPlacesRestantes;
    modalRef.componentInstance.reservation = this.newAnnonce;
    modalRef.componentInstance.title = 'Comfirmation de votre proposition';
    modalRef.componentInstance.actionTemplate = this.actionConfirm;
  }
  publish() {
    this.dataSvc.publishAnnonce(this.newAnnonce).subscribe(ann => {
      console.log('response to publish : ', ann);
    });
  }

  search = (text$: Observable<string>) => {
    return text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => (this.searching = true))
      .switchMap(term =>
        this.dataSvc
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
