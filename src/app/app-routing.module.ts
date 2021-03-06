import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { Role } from './domain/role';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: 'collaborateur',
    loadChildren: './collaborateur/collaborateur.module#CollaborateurModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      requiredRoles: [Role.ADMIN, Role.CHAUFFEUR, Role.COLLABORATEUR]
    }
  },
  {
    path: 'chauffeur',
    loadChildren: './chauffeur/chauffeur.module#ChauffeurModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      requiredRoles: [Role.ADMIN, Role.CHAUFFEUR]
    }
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      requiredRoles: [Role.ADMIN]
    }
  },
  {
    path: 'login',
    loadChildren: './login-module/login-module#LoginModule'
  },
  { path: '**', redirectTo: 'collaborateur', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
