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
    return this.canAccess(route);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canAccess(route);
  }

  private getRequiredRoles(route: Route | ActivatedRouteSnapshot) {
    return route.data.requiredRoles;
  }

  private canAccess(route: Route | ActivatedRouteSnapshot): boolean {
    console.log('#routeGuard');
    if (this.loginSvc.isLoggedIn) {
      const role = this.loginSvc.userRole;
      const requiredRoles: string[] = this.getRequiredRoles(route);
      if (requiredRoles.includes(role.toLowerCase())) {
        return true;
      } else {
        this.router.navigateByUrl('login');
        return false;
      }
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
