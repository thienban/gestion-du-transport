import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterByAdresseDepPipe } from './pipe/filter-by-adresse-dep.pipe';
import { Component } from '@angular/core';
import {
  NgbModule,
  NgbModal,
  ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    RouterModule,
    NgbModule.forRoot()
  ],
  declarations: [NavbarComponent, FilterByAdresseDepPipe],
  exports: [NavbarComponent, FilterByAdresseDepPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [LoginService]
    };
  }
}
