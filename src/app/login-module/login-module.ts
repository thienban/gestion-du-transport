import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const loginRoutes: Routes = [{ path: '', component: LoginPageComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes),
    SharedModule
  ],
  providers: [NgbModal],
  declarations: [LoginPageComponent]
})
export class LoginModule {}
