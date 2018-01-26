import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { VehiculeSociete } from '../domain/VehiculeSociete';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Collaborateur } from '../domain/Collaborateur';
import { HttpClient } from '@angular/common/http';
import { Categorie } from '../domain/categorie';

@Injectable()
export class DataService {
  private _vehiculesSociete = new BehaviorSubject<VehiculeSociete[]>([]);
  private _chauffeurs = new BehaviorSubject<Collaborateur[]>([]);
  private _categories = new BehaviorSubject<Categorie[]>([]);

  constructor(private http: HttpClient) {}

  get vehiculesSociete(): Observable<VehiculeSociete[]> {
    return this._vehiculesSociete.asObservable();
  }

  get chauffeurs(): Observable<Collaborateur[]> {
    return this._chauffeurs.asObservable();
  }

  get categories(): Observable<Categorie[]> {
    return this._categories.asObservable();
  }

  fetchVehiculesSociete(): Observable<VehiculeSociete[]> {
    const url = `${environment.endpoint}/admin/vehicules`;
    return this.http.get<VehiculeSociete[]>(url).do(veh => {
      this._vehiculesSociete.next(veh);
      console.log('VehiculesSociete fetched');
    });
  }

  fetchChauffeurs(): Observable<Collaborateur[]> {
    const url = `${environment.endpoint}/admin/chauffeurs`;
    return this.http.get<Collaborateur[]>(url).do(ch => {
      this._chauffeurs.next(ch);
      console.log('Chauffeurs fetched');
    });
  }

  fetchCategories(): Observable<Categorie[]> {
    const url = `${environment.endpoint}/admin/vehicules/categories`;
    return this.http.get<Categorie[]>(url).do(cat => {
      this._categories.next(cat);
      console.log('Categories fetched');
    });
  }
}
