import { Component, OnInit, Input } from '@angular/core';
import {
  NgbModule,
  NgbAccordion,
  NgbPanel,
  NgbPagination,
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { Annonce } from '../../domain/Annonce';
import { ReservationsService } from '../../shared/services/reservations.service';
import { DetailCovoiturageComponent } from '../detail-covoiturage/detail-covoiturage.component';
import {
  getLocaleDateTimeFormat,
  getLocaleDateFormat,
  FormatWidth
} from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  currentDate: number;

  constructor(
    private rService: ReservationsService,
    private modalService: NgbModal
  ) {
    this.currentDate = Date.now();

    this.rService.ListerReservationsCollab().subscribe(r => {
      this.reservations = r;
      r.forEach(re =>
        console.log(Date.parse(re.dateDepart.toString()).toString())
      );
      console.log(this.currentDate);
      this.reservationsHisto = r.filter(
        re => Date.parse(re.dateDepart.toString()) < this.currentDate
      );
      console.log(this.reservationsHisto);
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
