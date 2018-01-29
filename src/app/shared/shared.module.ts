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
import { FilterByAdresseDepPipe } from './pipe/filter-by-adresse-dep.pipe';
import { FilterByAdresseArPipe } from './pipe/filter-by-adresse-ar.pipe';
import { FilterByDateDepPipe } from './pipe/filter-by-date-dep.pipe';
import { FilterByImmatPipe } from './pipe/filter-by-immat.pipe';
import { FilterByMarquePipe } from './pipe/filter-by-marque.pipe';

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
    FilterByImmatPipe,
    FilterByMarquePipe
  ],
  exports: [
    NavbarComponent,
    FilterByAdresseDepPipe,
    FilterByAdresseArPipe,
    FilterByDateDepPipe,
    FilterByImmatPipe,
    FilterByMarquePipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [LoginService]
    };
  }
}
