import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        whitelistedDomains: [environment.endpoint, 'localhost:8080'],
        throwNoTokenError: false
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
