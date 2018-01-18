import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperChauffeurComponent } from './wrapper-chauffeur/wrapper-chauffeur.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PlanningComponent } from './planning/planning.component';
import { OccupationComponent } from './occupation/occupation.component';
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
  imports: [CommonModule, RouterModule.forChild(chauffeurRoutes), SharedModule],
  declarations: [
    WrapperChauffeurComponent,
    PlanningComponent,
    OccupationComponent
  ]
})
export class ChauffeurModule {}
