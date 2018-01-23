import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WrapperCollaborateurComponent } from './wrapper-collaborateur/wrapper-collaborateur.component';
import { SharedModule } from '../shared/shared.module';
import { ReservationsComponent } from './reservations/reservations.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { CreerReservationComponent } from './creer-reservation/creer-reservation.component';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
=======
import { patch } from 'webdriver-js-extender';
import { CreerAnnonceComponent } from './creer-annonce/creer-annonce.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdresseAutocompleteInputComponent } from './adresse-autocomplete-input/adresse-autocomplete-input.component';
import { NgAutoCompleteModule } from 'ng-auto-complete';
>>>>>>> 1299707656033d4f8acafdf70e3a6c448a70b429

const collabRoutes: Routes = [
  {
    path: '',
    component: WrapperCollaborateurComponent,
    children: [
      { path: 'annonces', component: AnnoncesComponent },
      {
        path: 'reservations',
        component: ReservationsComponent
      },
      { path: 'reservations/creer', component: CreerReservationComponent },
      { path: 'annonces/creer', component: CreerAnnonceComponent },
      { path: '', redirectTo: 'reservations' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(collabRoutes),
<<<<<<< HEAD
    SharedModule,
    HttpClientModule
=======
    NgbModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgAutoCompleteModule
>>>>>>> 1299707656033d4f8acafdf70e3a6c448a70b429
  ],
  declarations: [
    WrapperCollaborateurComponent,
    ReservationsComponent,
    AnnoncesComponent,
    CreerReservationComponent,
    CreerAnnonceComponent,
    AdresseAutocompleteInputComponent
  ]
})
export class CollaborateurModule {}
