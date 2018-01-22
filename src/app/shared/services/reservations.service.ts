import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Annonce } from '../../domain/Annonce';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http/src/params';

@Injectable()
export class ReservationsService {
  reservationsCovoit: BehaviorSubject<Annonce[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.refreshData();
  }

  refreshData() {
    const httpParams = new HttpParams().set(
      'matricule',
      localStorage.getItem('matricule')
    );

    this.http
      .get<Annonce[]>(environment.endpoint + 'reservations', {
        params: httpParams
      })
      .subscribe(reser => this.reservationsCovoit.next(reser));
  }

  ListerReservationsCollab(): Observable<Annonce[]> {
    return this.reservationsCovoit.asObservable();
  }
}
