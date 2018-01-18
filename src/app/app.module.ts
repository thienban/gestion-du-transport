import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginModule } from './login-module/login-module';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http/';

function tokenGetterFunc() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetterFunc,
        whitelistedDomains: [environment.endpoint, 'localhost:8080'],
        throwNoTokenError: false
      }
    })
  ],
  providers: [LoginModule, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
