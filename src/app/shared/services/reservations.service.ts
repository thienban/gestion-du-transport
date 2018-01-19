import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Annonce } from '../../domain/Annonce';

@Injectable()
export class ReservationsService {
  reservationsCovoit: BehaviorSubject<Annonce[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.refreshData();
  }

  refreshData() {
    this.http
      .get<Annonce[]>('http://localhost:8080/reservations')
      .subscribe(reser => this.reservationsCovoit.next(reser));
  }

  ListerReservationsCollab(): Observable<Annonce[]> {
    return this.reservationsCovoit.asObservable();
  }
}
