import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  NgbModule,
  NgbModal,
  ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
import { ReservationsService } from './services/reservations.service';
import { AnnonceService } from './services/annonce.service';
import { FilterByAdresseDepPipe } from './pipe/filter-by-adresse-dep.pipe';
import { FilterByAdresseArPipe } from './pipe/filter-by-adresse-ar.pipe';
import { FilterByDateDepPipe } from './pipe/filter-by-date-dep.pipe';

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
    FilterByDateDepPipe
  ],
  exports: [
    NavbarComponent,
    FilterByAdresseDepPipe,
    FilterByAdresseArPipe,
    FilterByDateDepPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [LoginService, ReservationsService, AnnonceService]
    };
  }
}
