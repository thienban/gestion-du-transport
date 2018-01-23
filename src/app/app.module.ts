import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './shared/services/login.service';
import { getToken } from './token-getter';
import { ListeAnnoncesComponent } from './collaborateur/liste-annonces/liste-annonces.component';
import { AnnonceService } from './shared/services/annonce.service';
import { HttpClientModule } from '@angular/common/http/src/module';
import { HttpClient } from '@angular/common/http/src/client';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpClient,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: [environment.endpoint, 'localhost:8080'],
        throwNoTokenError: false
      }
    })
  ],
  providers: [AnnonceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
