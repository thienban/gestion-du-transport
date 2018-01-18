import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/';
import { LoginService } from '../shared/services/login.service';
import { ChoixRoleComponent } from './choix-role/choix-role.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [LoginService, NgbModal],
  exports: [LoginPageComponent],
  entryComponents: [ChoixRoleComponent],
  declarations: [LoginPageComponent, ChoixRoleComponent]
})
export class LoginModule {}
