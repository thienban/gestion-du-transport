import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Collaborateur } from '../../domain/Collaborateur';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class CollaborateurService {
  collabsBS: BehaviorSubject<Collaborateur[]> = new BehaviorSubject([]);
  collabs: Collaborateur[];

  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService,
    private loginSvc: LoginService
  ) {
    this.refreshData();
  }

  refreshData() {
    this.http
      .get<Collaborateur[]>(environment.endpoint + '/collaborateurs')
      .subscribe(c => this.collabsBS.next(c));
  }

  listerCollabs(): Observable<Collaborateur[]> {
    return this.collabsBS.asObservable();
  }
}
