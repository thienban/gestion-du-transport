import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/do';

import { ReservationVehicule } from '../domain/ReservationVehicule';

@Injectable()
export class DataService {
  private _confirmRace = new BehaviorSubject<ReservationVehicule[]>([]);

  get confirmRace(): Observable<ReservationVehicule[]> {
    return this._confirmRace.asObservable();
  }

  constructor(private http: HttpClient) {}

  fetchToConfirmRaces(): Observable<ReservationVehicule[]> {
    const url = `${environment.endpoint}/chauffeurs`;
    return this.http.get<ReservationVehicule[]>(url).do(races => {
      this._confirmRace.next(races);
      console.log('race to confirm');
    });
  }
}
