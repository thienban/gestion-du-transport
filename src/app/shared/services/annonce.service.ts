import { Injectable, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Annonce } from '../../domain/Annonce';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/do';
import { ReservationsService } from './reservations.service';

@Injectable()
export class AnnonceService {
  annonce: Annonce;
  annonceSubject: BehaviorSubject<Annonce[]> = new BehaviorSubject([]);
  filtreSubject: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private http: HttpClient,
    private reservationSvc: ReservationsService
  ) {
    this.refresh();
  }

  listerAnnonces(): Observable<Annonce[]> {
    return this.annonceSubject.asObservable();
  }

  getFiltreObservable() {
    return this.filtreSubject.asObservable();
  }
  setFiltre(value) {
    this.filtreSubject.next(value);
  }
  refresh() {
    this.http
      .get<Annonce[]>(environment.endpoint + '/reservations')
      .subscribe(ans => {
        this.annonceSubject.next(ans);
        console.log(ans);
      });
  }

  autocomplete(term: string): Observable<string[]> {
    if (term.length < 3) {
      return Observable.of([]);
    }
    return this.http.get<string[]>(
      environment.endpoint + '/maps/autocomplete/' + term
    );
  }

  publishAnnonce(nouvAnnonce: Annonce) {
    return this.http
      .post<Annonce[]>(environment.endpoint + '/annonces/creer', nouvAnnonce)
      .do(ann => {
        this.annonceSubject.next(ann);
      });
  }

  getTrajetInfo(origin: string, destination: string): Observable<any> {
    const params = new HttpParams()
      .set('origin', origin)
      .set('destination', destination);
    return this.http.get(environment.endpoint + '/maps/directions', {
      params
    });
  }

  bookAnnonce(annonce: Annonce): Observable<Annonce> {
    const body = { annonce_id: annonce.id };
    return this.http
      .post<Annonce>(environment.endpoint + '/reservations/creer', body)
      .do(this.refresh.bind(this))
      .do(() => {
        this.reservationSvc.refreshData();
      });
  }
}
