import { Injectable, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Annonce } from '../domain/annonce';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/do';
@Injectable()
export class AnnonceService {
  annonce: Annonce;
  annonceSubject: BehaviorSubject<Annonce[]> = new BehaviorSubject([]);
  filtreSubject: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {
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
  bookAnnonce(annonce: Annonce): Observable<Annonce> {
    const body = { annonce_id: annonce.id };
    return this.http
      .post<Annonce>(environment.endpoint + '/reservations/creer', body)
      .do(this.refresh.bind(this));
  }
}
