import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import { ReservationVehicule } from '../domain/ReservationVehicule';

@Injectable()
export class DataService {
  private _confirmRace = new BehaviorSubject<ReservationVehicule[]>([]);
  private _myRaces = new BehaviorSubject<ReservationVehicule[]>([]);
  private _races = new BehaviorSubject<ReservationVehicule[]>([]);

  get confirmRace(): Observable<ReservationVehicule[]> {
    return this._confirmRace.asObservable();
  }

  get myRaces(): Observable<ReservationVehicule[]> {
    return this._myRaces.asObservable();
  }

  get races(): Observable<ReservationVehicule[]> {
    return this._races.asObservable();
  }

  constructor(private http: HttpClient) {}

  fetchAllRaces(): Observable<ReservationVehicule[]> {
    return Observable.forkJoin([
      this.fetchMyRaces(),
      this.fetchToConfirmRaces()
    ])
      .map(races => races[0].concat(races[1]))
      .do(races => {
        this._races.next(races);
      });
  }

  fetchToConfirmRaces(): Observable<ReservationVehicule[]> {
    const url = `${environment.endpoint}/chauffeurs`;
    return this.http.get<ReservationVehicule[]>(url).do(races => {
      races.map(resa => {
        resa.toConfirm = true;
        return resa;
      });
      this._confirmRace.next(races);
      console.log('courses à accepter : ', races);
    });
  }

  fetchMyRaces(): Observable<ReservationVehicule[]> {
    const url = `${environment.endpoint}/chauffeurs/me`;
    return this.http.get<ReservationVehicule[]>(url).do(races => {
      races.map(resa => {
        resa.toConfirm = false;
        return resa;
      });
      this._myRaces.next(races);
      console.log('mes courses : ', races);
    });
  }

  acceptCourse(resa: ReservationVehicule): Observable<ReservationVehicule> {
    const url = `${environment.endpoint}/chauffeurs/accept`;
    return this.http.post<ReservationVehicule>(url, {
      reservationVehicule_id: resa.id
    });
  }
}
