import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/';
import { RouterModule, Routes } from '@angular/router';
const loginRoutes: Routes = [{ path: '', component: LoginPageComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forChild(loginRoutes)
  ],
  providers: [NgbModal],
  exports: [LoginPageComponent],
  declarations: [LoginPageComponent]
})
export class LoginModule {}
