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
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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
  confirmModal: NgbModalRef;
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
      { validator: this.dateTimeValidator.bind(this) }
    );
  }
  dateTimeValidator(control: AbstractControl): { [key: string]: boolean } {
    if (control.get('date').valid && control.get('heure').valid) {
      const dateTime = this.ngbDateToNative(control.value);
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
    const dateDepart = this.ngbDateToNative(this.dateTimeForm.value);
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
    this.confirmModal = modalRef;
  }
  publish() {
    this.dataSvc.publishAnnonce(this.newAnnonce).subscribe(ann => {
      this.confirmModal.close();
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

  ngbDateToNative(dateTime) {
    return new Date(
      dateTime.date.year,
      dateTime.date.month - 1,
      dateTime.date.day,
      dateTime.heure.hour,
      dateTime.heure.minute
    );
  }
}
