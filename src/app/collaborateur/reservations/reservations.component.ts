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
  items;
  itemPerPage = 5;

  constructor(private rService: ReservationsService) {}

  ngOnInit() {
    this.rService
      .ListerReservationsCollab()
      .subscribe(r => (this.reservations = r));

    this.page = 1;
    this.items = [0];

    for (let i = 0; i < 100; i++) {
      this.items[i] = i;
    }
    this.startLimit = 0;
    this.maxSize = this.itemPerPage;
  }

  onChange() {
    console.log('page ', this.page);
    this.maxSize = this.page * this.itemPerPage;
    console.log('maxSize ', this.maxSize);
    this.startLimit = this.maxSize - this.itemPerPage;
    console.log('startLimit ', this.startLimit);
  }
}
