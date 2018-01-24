import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../shared/services/annonce.service';
import { ReservationsService } from '../../shared/services/reservations.service';
import { Annonce } from '../../domain/Annonce';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
  constructor(
    private dataSvc: DataService,
    private reservationsSvc: ReservationsService
  ) {}
  annonces: Observable<Annonce[]>;

  ngOnInit() {
    this.annonces = this.dataSvc.myAnnonces;
  }
}
