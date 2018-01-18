import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'collaborateur',
    loadChildren: './collaborateur/collaborateur.module#CollaborateurModule'
  },
  {
    path: 'chauffeur',
    loadChildren: './chauffeur/chauffeur.module#ChauffeurModule'
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: 'login',
    loadChildren: './login-module/login-module#LoginModule'
  },
  { path: '', redirectTo: 'collaborateur', pathMatch: 'full' }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
