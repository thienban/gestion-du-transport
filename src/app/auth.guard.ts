import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './shared/services/login.service';
import { CanActivate } from '@angular/router/src/interfaces';
import {
  RouterState,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router/src/router_state';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private loginSvc: LoginService, private router: Router) {}
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    console.log('voila la route : ', route);
    const role = this.loginSvc.userRole;
    const requiredRoles: string[] = this.getRequiredRoles(route);
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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('voila la route : ', route);
    const role = this.loginSvc.userRole;
    const requiredRoles: string[] = this.getRequiredRoles(route);
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

  getRequiredRoles(route: Route | ActivatedRouteSnapshot) {
    return route.data.requiredRoles;
  }
}
