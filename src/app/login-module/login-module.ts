import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const loginRoutes: Routes = [{ path: '', component: LoginPageComponent }];
import { LoginService } from '../shared/services/login.service';
import { ChoixRoleComponent } from './choix-role/choix-role.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes),
    SharedModule
  ],
  providers: [LoginService, NgbModal],
  exports: [LoginPageComponent],
  entryComponents: [ChoixRoleComponent],
  declarations: [LoginPageComponent, ChoixRoleComponent]
})
export class LoginModule {}
