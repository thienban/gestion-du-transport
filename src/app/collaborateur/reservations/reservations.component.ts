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

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: Annonce[];
  page;
  startLimit;
  endLimit;
  @Input() pageSize;
  @Input() maxSize;
  currentDate;

  constructor(
    private rService: ReservationsService,
    private modalService: NgbModal
  ) {
    this.rService
      .ListerReservationsCollab()
      .subscribe(r => (this.reservations = r));
  }

  ngOnInit() {
    this.currentDate = Date.now();

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
