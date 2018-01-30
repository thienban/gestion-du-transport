import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperAdminComponent } from './wrapper-admin/wrapper-admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { ChauffeursComponent } from './chauffeurs/chauffeurs.component';
import { CreerChauffeurComponent } from './creer-chauffeur/creer-chauffeur.component';

import { DataService } from './data.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { CreerVehiculeComponent } from './creer-vehicule/creer-vehicule.component';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { FilterByImmatPipe } from '../shared/pipe/filter-by-immat.pipe';
import { FilterByMarquePipe } from '../shared/pipe/filter-by-marque.pipe';
import { VehiculeDetailComponent } from './vehicule-detail/vehicule-detail.component';
const adminRoutes: Routes = [
  {
    path: '',
    component: WrapperAdminComponent,
    children: [
      { path: 'vehicules', component: VehiculesComponent },
      { path: 'chauffeurs', component: ChauffeursComponent },
      { path: 'vehicules/', component: VehiculeDetailComponent },
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
    CreerVehiculeComponent,
    ChauffeursComponent,
    CreerChauffeurComponent,
    VehiculeDetailComponent
  ],
  providers: [
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    NgbActiveModal
  ],
  entryComponents: [CreerVehiculeComponent, CreerChauffeurComponent]
})
export class AdminModule {}
