import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Collaborateur } from '../../domain/Collaborateur';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
console.log(environment);
@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService,
    private router: Router
  ) {}

  private _logged_in = new BehaviorSubject<boolean>(this.isLoggedIn);

  get logged_in(): Observable<boolean> {
    return this._logged_in.asObservable();
  }

  login(credentials: { email: string; password: string }): Observable<string> {
    return this.http
      .post<HttpResponse<any>>(environment.endpoint + '/login', credentials, {
        observe: 'response'
      })
      .map(resp => {
        const token = resp.headers.get('Authorization');
        localStorage.setItem('access_token', token);
        this._logged_in.next(true);
        return this.userRole;
      });
  }

  get userRole(): string {
    return this.user.role;
  }
  get isLoggedIn(): boolean {
    return this.user !== null && this.user !== undefined;
  }
  get user(): Collaborateur {
    if (this.token) {
      return this.jwt.decodeToken(this.token);
    } else {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/login');
    this._logged_in.next(false);
  }

  get token() {
    return localStorage.getItem('access_token');
  }
}
