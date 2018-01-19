import { Component, OnInit } from '@angular/core';
import { NgbModule, NgbAccordion, NgbPanel } from '@ng-bootstrap/ng-bootstrap';
import { Annonce } from '../../domain/Annonce';
import { ReservationsService } from '../../shared/services/reservations.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: Annonce[];

  constructor(private rService: ReservationsService) {}

  ngOnInit() {
    this.rService
      .ListerReservationsCollab()
      .subscribe(r => (this.reservations = r));
  }
}
