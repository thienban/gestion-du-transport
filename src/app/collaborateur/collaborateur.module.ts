import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WrapperCollaborateurComponent } from './wrapper-collaborateur/wrapper-collaborateur.component';
import { SharedModule } from '../shared/shared.module';
import { ReservationsComponent } from './reservations/reservations.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { NgbModule, NgbAccordion, NgbPanel } from '@ng-bootstrap/ng-bootstrap';
import { ListeAnnoncesComponent } from './liste-annonces/liste-annonces.component';
import { DetailCovoiturageComponent } from './detail-covoiturage/detail-covoiturage.component';

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
    AnnoncesComponent,
    ListeAnnoncesComponent,
    DetailCovoiturageComponent
  ],
  providers: [NgbAccordion, NgbPanel],
  entryComponents: [DetailCovoiturageComponent]
})
export class CollaborateurModule {}
