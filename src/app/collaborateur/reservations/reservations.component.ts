import { Component, OnInit, Input } from '@angular/core';
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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DataService } from '../data.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: Annonce[];
  reservationsHisto: Annonce[];
  page;
  startLimit;
  endLimit;
  pageSize;
  maxSize;
  currentDate = new Date();

  constructor(private dataSvc: DataService, private modalService: NgbModal) {
    console.log(this.currentDate.getFullYear());
    this.dataSvc.myReservations.subscribe(r => {
      this.reservations = r.filter(re => {
        return new Date(re.dateDepart).getTime() >= Date.now();
      });
      this.reservationsHisto = r.filter(re => {
        return new Date(re.dateDepart).getTime() < Date.now();
      });
    });
  }

  ngOnInit() {
    this.page = 1;
    this.pageSize = 5;
    this.startLimit = 0;
    this.endLimit = this.pageSize;
  }

  onChange() {
    this.startLimit = this.page * this.pageSize - this.pageSize;
    this.endLimit = this.startLimit + this.pageSize;
  }

  detailAnnonce(reservation) {
    const modalRef = this.modalService.open(DetailCovoiturageComponent);
    modalRef.componentInstance.reservation = reservation;
  }
}
