import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<HttpResponse<any>>(
        'http://localhost:8080/api/collaborateurs',
        credentials,
        { observe: 'response' }
      )
      .do(
        resp => {
          const token = resp.headers.get('Authorization');
          localStorage.setItem('access_token', token);
        },
        error => {
          console.log(error);
        }
      );
  }

  get user() {
    return 'wip';
  }
}
