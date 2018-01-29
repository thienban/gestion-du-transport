import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationVehicule } from '../domain/ReservationVehicule';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  private _myAnnonces = new BehaviorSubject<ReservationVehicule[]>([]);
  private _myReservations = new BehaviorSubject<ReservationVehicule[]>([]);
  private _covoitsDisponibles = new BehaviorSubject<ReservationVehicule[]>([]);

  get myAnnonces(): Observable<Annonce[]> {
    return this._myAnnonces.asObservable();
  }
  get myReservations(): Observable<Annonce[]> {
    return this._myReservations.asObservable();
  }
  get covoitsDisponibles(): Observable<Annonce[]> {
    return this._covoitsDisponibles.asObservable();
  }

  constructor(private http: HttpClient) {}

  fetchAllData() {
    return this.fetchAvailableCovoits()
      .merge(this.fetchMyAnnonces())
      .merge(this.fetchMyReservations());
  }
  fetchMyAnnonces(): Observable<Annonce[]> {
    const url = `${environment.endpoint}/annonces/me`;
    return this.http.get<Annonce[]>(url).do(annonces => {
      this._myAnnonces.next(annonces);
      console.log('MyAnnonces fetched');
    });
  }

  fetchMyReservations(): Observable<Annonce[]> {
    const url = `${environment.endpoint}/reservations/me`;
    return this.http.get<Annonce[]>(url).do(annonces => {
      this._myReservations.next(annonces);
      console.log('MyReservations fetched');
    });
  }

  fetchAvailableCovoits(): Observable<Annonce[]> {
    const url = `${environment.endpoint}/reservations/available`;
    return this.http.get<Annonce[]>(url).do(annonces => {
      this._covoitsDisponibles.next(annonces);
      console.log('AvailableCovoits fetched');
    });
  }
}
