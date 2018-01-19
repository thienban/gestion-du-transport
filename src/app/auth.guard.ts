import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './shared/services/login.service';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private loginSvc: LoginService, private router: Router) {}
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    console.log('voila la route : ', route);
    const role = this.loginSvc.userRole;
    const requiredRoles: string[] = route.data.requiredRoles;
    console.log(
      'required roles : ',
      requiredRoles,
      'current user role :',
      role
    );
    if (requiredRoles.includes(role.toLowerCase())) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
