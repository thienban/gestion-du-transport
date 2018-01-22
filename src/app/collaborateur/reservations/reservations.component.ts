import { Component, OnInit, Input } from '@angular/core';
import {
  NgbModule,
  NgbAccordion,
  NgbPanel,
  NgbPagination
} from '@ng-bootstrap/ng-bootstrap';
import { Annonce } from '../../domain/Annonce';
import { ReservationsService } from '../../shared/services/reservations.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: Annonce[];
  title = 'app';
  page;
  startLimit;
  @Input() maxSize;
  itemPerPage = 5;
  currentDate;

  constructor(private rService: ReservationsService) {
    this.rService
      .ListerReservationsCollab()
      .subscribe(r => (this.reservations = r));
  }

  ngOnInit() {
    this.currentDate = Date.now();

    this.page = 1;

    this.startLimit = 1;
    this.maxSize = this.itemPerPage;
  }

  onChange() {
    this.startLimit =
      this.page * this.itemPerPage - this.itemPerPage + (this.page - 1);

    this.maxSize = this.startLimit + this.itemPerPage;
  }
}
