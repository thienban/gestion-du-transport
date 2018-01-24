import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperChauffeurComponent } from './wrapper-chauffeur/wrapper-chauffeur.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PlanningComponent } from './planning/planning.component';
import { OccupationComponent } from './occupation/occupation.component';
//calendar
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

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
    BrowserAnimationsModule, //calendar
    CalendarModule.forRoot() //calendar
  ],
  declarations: [
    WrapperChauffeurComponent,
    PlanningComponent,
    OccupationComponent
  ]
})
export class ChauffeurModule {}
