import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { WrapperChauffeurComponent } from './wrapper-chauffeur/wrapper-chauffeur.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PlanningComponent } from './planning/planning.component';
import { OccupationComponent } from './occupation/occupation.component';
<<<<<<< HEAD
//calendar
import localeFr from '@angular/common/locales/fr';
import { CalendarModule } from 'angular-calendar';
import { DataService } from './data.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@auth0/angular-jwt';

registerLocaleData(localeFr);
=======
>>>>>>> master

const chauffeurRoutes: Routes = [
  {
    path: '',
    component: WrapperChauffeurComponent,
    children: [
      { path: 'planning', component: PlanningComponent },
      { path: 'occupation', component: OccupationComponent },
      { path: '', redirectTo: 'planning' }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(chauffeurRoutes),
    SharedModule,
    CalendarModule.forRoot() //calendar
  ],
  declarations: [
    WrapperChauffeurComponent,
    PlanningComponent,
    OccupationComponent
  ],
  providers: [
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class ChauffeurModule {}
