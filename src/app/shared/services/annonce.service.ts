import { Injectable, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { Annonce } from '../domain/annonce';
import { environment } from '../../../environments/environment';

@Injectable()
export class AnnonceService {
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

  autocomplete(term: string): Observable<string[]> {
    if (term.length < 4) {
      return Observable.of([]);
    }
    return this.http.get<string[]>(
      environment.endpoint + '/autocomplete/' + term
    );
  }
}
