import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  NgbModule,
  NgbModal,
  ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './services/login.service';
import { ReservationsService } from './services/reservations.service';
import { AnnonceService } from './services/annonce.service';
import { ChauffeurService } from './services/chauffeur.service';
import { CollaborateurService } from './services/collaborateur.service';

import { FilterByAdresseDepPipe } from './pipe/filter-by-adresse-dep.pipe';
import { FilterByAdresseArPipe } from './pipe/filter-by-adresse-ar.pipe';
import { FilterByDateDepPipe } from './pipe/filter-by-date-dep.pipe';
import { FilterByMatriculePipe } from './pipe/filter-by-matricule.pipe';
import { FilterByNomPipe } from './pipe/filter-by-nom.pipe';
import { FilterByPrenomPipe } from './pipe/filter-by-prenom.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    RouterModule,
    NgbModule.forRoot()
  ],
  declarations: [
    NavbarComponent,
    FilterByAdresseDepPipe,
    FilterByAdresseArPipe,
    FilterByDateDepPipe,
    FilterByMatriculePipe,
    FilterByNomPipe,
    FilterByPrenomPipe
  ],
  exports: [
    NavbarComponent,
    FilterByAdresseDepPipe,
    FilterByAdresseArPipe,
    FilterByDateDepPipe,
    FilterByMatriculePipe,
    FilterByNomPipe,
    FilterByPrenomPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        LoginService,
        ReservationsService,
        AnnonceService,
        ChauffeurService,
        CollaborateurService
      ]
    };
  }
}
