import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../shared/services/annonce.service';
import { ReservationsService } from '../../shared/services/reservations.service';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
  constructor(
    private annonceSvc: AnnonceService,
    private reservationsSvc: ReservationsService
  ) {}

  ngOnInit() {
    this.annonceSvc.refreshData();
    this.reservationsSvc.refreshData();
  }
}
