import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Collaborateur } from '../../domain/Collaborateur';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginService } from './login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class ChauffeurService {
  chauffeursBS: BehaviorSubject<Collaborateur[]> = new BehaviorSubject([]);
  chauffeurs: Collaborateur[];

  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService,
    private loginSvc: LoginService
  ) {
    this.refreshData();
  }

  refreshData() {
    this.http
      .get<Collaborateur[]>(environment.endpoint + '/collaborateurs/chauffeurs')
      .subscribe(ch => this.chauffeursBS.next(ch));
  }

  listerChauffeurs(): Observable<Collaborateur[]> {
    return this.chauffeursBS.asObservable();
  }

  creerChauffeur(matricule: string) {
    this.http
      .post<Collaborateur[]>(
        environment.endpoint + '/collaborateurs/chauffeurs/creer',
        matricule
      )
      .subscribe(ch => this.chauffeursBS.next(ch));
  }
}
