import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  NgbModule,
  NgbAccordion,
  NgbPanel,
  NgbPagination,
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { Annonce } from '../../domain/Annonce';
import { DetailCovoiturageComponent } from '../detail-covoiturage/detail-covoiturage.component';
import {
  getLocaleDateTimeFormat,
  getLocaleDateFormat,
  FormatWidth
} from '@angular/common';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Mode } from '../liste-annonces/Mode';
import { ReserverVehicule } from '../../domain/ReserverVehicule';
import { ConfirmAnnulationComponent } from '../confirm-annulation/confirm-annulation.component';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservationsCovoitEnCours: Observable<Annonce[]>;
  reservationsCovoitHisto: Observable<Annonce[]>;
  reservationsSocEnCours: Observable<ReserverVehicule[]>;
  reservationsSocHisto: Observable<ReserverVehicule[]>;
  modes = Mode;
  modalActionRef: TemplateRef<any>;
  modalCancel: NgbModalRef;
  @ViewChild('confirmTemplate') confirmTemplate: TemplateRef<any>;
  reservationsEnCours: Observable<Annonce[]>;
  reservationsHisto: Observable<Annonce[]>;
  constructor(
    private dataSvc: DataService,
    private modalService: NgbModal,
    private loginSvc: LoginService
  ) {
    console.log(this.loginSvc.user.matricule);
    this.reservationsEnCours = this.dataSvc.myReservations.map(annonces =>
      annonces.filter(
        a =>
          new Date(a.dateDepart).getTime() >= Date.now() &&
          !a.annulations.some(
            co => co.matricule === this.loginSvc.user.matricule
          )
      )
    );
    this.reservationsHisto = this.dataSvc.myReservations.map(annonces =>
      annonces.filter(
        a =>
          new Date(a.dateDepart).getTime() < Date.now() ||
          a.annulations.some(
            co => co.matricule === this.loginSvc.user.matricule
          )
      )
    );
    this.reservationsSocEnCours = this.dataSvc.myReservationsSoc.map(
      reservations =>
        reservations.filter(
          r => new Date(r.dateReservation).getTime() >= Date.now()
        )
    );
    this.reservationsSocHisto = this.dataSvc.myReservationsSoc.map(
      reservations =>
        reservations.filter(
          r => new Date(r.dateReservation).getTime() < Date.now()
        )
    );
  }

  ngOnInit() {}

  openDetailAnnonce(reservation: Annonce) {
    const modalRef = this.modalService.open(DetailCovoiturageComponent);
    modalRef.componentInstance.reservation = reservation;
    modalRef.componentInstance.title = 'Détails du covoiturage';
  }

  openCancelModal(reservation: Annonce) {
    const modalRef = this.modalService.open(ConfirmAnnulationComponent);
    modalRef.componentInstance.reservation = reservation;
    modalRef.componentInstance.title =
      'Etes-vous sûr de vouloir annuler cette réservation ?';
    modalRef.componentInstance.actionTemplate = this.confirmTemplate;
    this.modalCancel = modalRef;
  }

  confirmCancel(reservation: Annonce) {
    this.dataSvc
      .cancelReservation(reservation)
      .subscribe(resp => this.modalCancel.close());
  }
}
