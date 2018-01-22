import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
console.log(environment);
@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService,
    private router: Router
  ) {}

  login(credentials: { email: string; password: string }): Observable<string> {
    return this.http
      .post<HttpResponse<any>>(environment.endpoint + '/login', credentials, {
        observe: 'response'
      })
      .map(resp => {
        const token = resp.headers.get('Authorization');
        localStorage.setItem('access_token', token);
        return this.userRole;
      });
  }

  get userRole(): string {
    const token = localStorage.getItem('access_token');
    if (token) {
      return this.jwt.decodeToken(token)['role'];
    } else {
      return '';
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/login');
  }

  get token() {
    return localStorage.getItem('access_token');
  }
}
