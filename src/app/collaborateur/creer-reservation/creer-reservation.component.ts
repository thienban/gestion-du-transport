import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { Annonce } from '../../shared/domain/annonce';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-creer-reservation',
  templateUrl: './creer-reservation.component.html',
  styleUrls: ['./creer-reservation.component.css']
})
export class CreerReservationComponent implements OnInit {
  annonceSubject: BehaviorSubject<Annonce[]> = new BehaviorSubject([]);
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  trouverAnnonceByDateAdresse(
    adresseDepart: string,
    adresseDestination: string,
    dateDepart: Date
  ): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(
      `http://localhost:8080/reservations/?adresseDepart=${adresseDepart}&adresseDestination=${adresseDestination}&dateDepart=${dateDepart}`
    );
  }
}
