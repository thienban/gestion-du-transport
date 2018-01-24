import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Collaborateur } from '../../domain/Collaborateur';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ChauffeurService {
  chauffeursBS: BehaviorSubject<Collaborateur[]> = new BehaviorSubject([]);
  chauffeurs: Collaborateur[];

  constructor(private http: HttpClient) {}

  refreshData() {
    this.http
      .get<Collaborateur[]>(environment.endpoint + '/collaborateurs/chauffeurs')
      .subscribe(ch => this.chauffeursBS.next(ch));
  }

  listerChauffeurs(): Observable<Collaborateur[]> {
    if (this.chauffeurs) {
      this.refreshData();
    }
    return this.chauffeursBS.asObservable();
  }
}
