import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Annonce } from '../../domain/Annonce';
import { environment } from '../../../environments/environment';
import { LoginService } from './login.service';
import 'rxjs/add/operator/do';

@Injectable()
export class ReservationsService {
  reservationsCovoit: BehaviorSubject<Annonce[]> = new BehaviorSubject([]);
  reservations: Annonce[];
  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService,
    private loginSvc: LoginService
  ) {}

  refreshData() {
    this.http
      .get<Annonce[]>(environment.endpoint + '/reservations/me')
      .do(resa => {
        console.log('refresh reservations');
        this.reservations = resa;
      })
      .subscribe(reser => this.reservationsCovoit.next(reser));
  }

  ListerReservationsCollab(): Observable<Annonce[]> {
    if (this.reservations) {
      this.refreshData();
    }
    return this.reservationsCovoit.asObservable();
  }
}
