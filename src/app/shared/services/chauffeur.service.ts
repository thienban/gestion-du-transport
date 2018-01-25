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
  ) {}

  refreshData() {
    this.http
      .get<Collaborateur[]>(environment.endpoint + '/collaborateurs/chauffeurs')
      .do(chauf => {
        console.log('refresh reservations');
        this.chauffeurs = chauf;
      })
      .subscribe(ch => this.chauffeursBS.next(ch));
  }

  listerChauffeurs(): Observable<Collaborateur[]> {
    if (this.chauffeurs) {
      this.refreshData();
    }
    return this.chauffeursBS.asObservable();
  }
}
