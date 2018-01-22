import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Annonce } from '../../shared/domain/annonce';
import { AnnonceService } from '../../shared/services/annonce.service';

@Component({
  selector: 'app-creer-reservation',
  templateUrl: './creer-reservation.component.html',
  styleUrls: ['./creer-reservation.component.css']
})
export class CreerReservationComponent implements OnInit {
  annonces: Annonce[];
  limite: string;
  filter: string = null;

  constructor(private annonceService: AnnonceService) {}

  ngOnInit() {
    //lister
    this.annonceService
      .listerAnnonces()
      .subscribe(annonces => (this.annonces = annonces));
  }

  setAdrDep(valeurAdresseDep: string) {
    this.filter = valeurAdresseDep;
  }
}
