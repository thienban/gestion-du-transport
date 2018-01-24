import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Annonce } from '../../domain/Annonce';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../shared/services/login.service';
import { FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-creer-reservation',
  templateUrl: './creer-reservation.component.html',
  styleUrls: ['./creer-reservation.component.css']
})
export class CreerReservationComponent implements OnInit {
  annonces: Annonce[];
  annonce: Annonce = null;

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

  ngOnInit() {
    console.log(this.loginSvc.user.matricule);
    this.dataSvc.covoitsDisponibles.subscribe(
      annonces =>
        (this.annonces = annonces.filter(a => {
          return (
            new Date(a.dateDepart).getTime() >= Date.now() &&
            a.nbPlacesRestantes > 0 &&
            !a.passagers.some(
              p => p.matricule === this.loginSvc.user.matricule
            ) &&
            a.auteur.matricule !== this.loginSvc.user.matricule
          );
        }))
    );
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

  open(content) {
    this.modalService.open(content);
  }

  saveBooking(annonce: Annonce) {
    this.dataSvc.bookAnnonce(annonce).subscribe();
  }
}
