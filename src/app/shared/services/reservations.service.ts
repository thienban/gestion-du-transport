import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Annonce } from '../../domain/Annonce';
import { environment } from '../../../environments/environment';

@Injectable()
export class ReservationsService {
  reservationsCovoit: BehaviorSubject<Annonce[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient, private jwt: JwtHelperService) {
    this.refreshData();
  }

  refreshData() {
    this.http
      .get<Annonce[]>(environment.endpoint + '/reservations/')
      .subscribe(reser => this.reservationsCovoit.next(reser));
  }

  ListerReservationsCollab(): Observable<Annonce[]> {
    console.log(this.reservationsCovoit);
    return this.reservationsCovoit.asObservable();
  }
}
