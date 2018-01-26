import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Annonce } from '../../domain/Annonce';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../shared/services/login.service';
import { FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Mode } from '../liste-annonces/Mode';
import { DetailCovoiturageComponent } from '../detail-covoiturage/detail-covoiturage.component';

@Component({
  selector: 'app-creer-reservation',
  templateUrl: './creer-reservation.component.html',
  styleUrls: ['./creer-reservation.component.css']
})
export class CreerReservationComponent implements OnInit {
  @ViewChild('actionTemplateForModal') actionTemplateForModal: ElementRef;

  annonces: Observable<Annonce[]>;
  modes = Mode;

  filterField1: FormControl = new FormControl();
  filterField2: FormControl = new FormControl();
  filterField3: FormControl = new FormControl();
  filtreAdrDep: string;
  filtreAdrAr: string;
  filtreDateAr: Date;
  closeResult: string;

  constructor(
    private dataSvc: DataService,
    private loginSvc: LoginService,
    private modalService: NgbModal
  ) {}
  modalRef: NgbModalRef;
  ngOnInit() {
    console.log(this.loginSvc.user.matricule);
    this.annonces = this.dataSvc.covoitsDisponibles;

    this.filterField1.valueChanges.subscribe(val => {
      this.filtreAdrDep = val;
    });
    this.filterField2.valueChanges.subscribe(val => {
      this.filtreAdrAr = val;
    });
    this.filterField3.valueChanges.subscribe(val => {
      this.filtreDateAr = val;
    });
  }

  open(reservation) {
    this.modalRef = this.modalService.open(DetailCovoiturageComponent);
    this.modalRef.componentInstance.reservation = reservation;
    this.modalRef.componentInstance.title = "Réservation d'un covoiturage";
    this.modalRef.componentInstance.actionTemplate = this.actionTemplateForModal;
  }

  saveBooking(annonce: Annonce) {
    this.dataSvc.bookAnnonce(annonce).subscribe(ann => {
      console.log('reservation ok', ann);
      this.modalRef.close();
    });
  }
  fermer() {
    this.modalRef.close();
  }
}
