import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WrapperCollaborateurComponent } from './wrapper-collaborateur/wrapper-collaborateur.component';
import { SharedModule } from '../shared/shared.module';
import { ReservationsComponent } from './reservations/reservations.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { CreerReservationComponent } from './creer-reservation/creer-reservation.component';
import { patch } from 'webdriver-js-extender';
import { CreerAnnonceComponent } from './creer-annonce/creer-annonce.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdresseAutocompleteInputComponent } from './adresse-autocomplete-input/adresse-autocomplete-input.component';
import { NgAutoCompleteModule } from 'ng-auto-complete';

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
    NgbModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgAutoCompleteModule
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
