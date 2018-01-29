import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperAdminComponent } from './wrapper-admin/wrapper-admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { ChauffeursComponent } from './chauffeurs/chauffeurs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreerChauffeurComponent } from './creer-chauffeur/creer-chauffeur.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: WrapperAdminComponent,
    children: [
      { path: 'vehicules', component: VehiculesComponent },
      { path: 'chauffeurs', component: ChauffeursComponent },
      { path: '', redirectTo: 'chauffeurs' }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    WrapperAdminComponent,
    VehiculesComponent,
    ChauffeursComponent,
    CreerChauffeurComponent
  ],
  entryComponents: [CreerChauffeurComponent]
})
export class AdminModule {}
