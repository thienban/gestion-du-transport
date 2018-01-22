import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WrapperCollaborateurComponent } from './wrapper-collaborateur/wrapper-collaborateur.component';
import { SharedModule } from '../shared/shared.module';
import { ReservationsComponent } from './reservations/reservations.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { NgbModule, NgbAccordion, NgbPanel } from '@ng-bootstrap/ng-bootstrap';

const collabRoutes: Routes = [
  {
    path: '',
    component: WrapperCollaborateurComponent,
    children: [
      { path: 'annonces', component: AnnoncesComponent },
      { path: 'reservations', component: ReservationsComponent },
      { path: '', redirectTo: 'reservations' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(collabRoutes),
    NgbModule.forRoot()
  ],
  declarations: [
    WrapperCollaborateurComponent,
    ReservationsComponent,
    AnnoncesComponent
  ],
  providers: [NgbAccordion, NgbPanel]
})
export class CollaborateurModule {}
