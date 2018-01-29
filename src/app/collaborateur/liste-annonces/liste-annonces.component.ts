import { Component, OnInit, Input } from '@angular/core';
import { Annonce } from '../../domain/Annonce';
import { Mode } from './Mode';
import { TemplateRef } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-liste-annonces',
  templateUrl: './liste-annonces.component.html',
  styleUrls: ['./liste-annonces.component.css']
})
export class ListeAnnoncesComponent implements OnInit {
  @Input() mode: Mode;
  @Input() annonces: Annonce[];
  @Input() histo: boolean;
  @Input() actionTemplate: TemplateRef<any>;
  modes = Mode;
  startLimit: number;
  endLimit: number;
  page: number;
  pageSize: number;
  constructor(private loginSvc: LoginService) {}

  ngOnInit() {
    this.page = 1;
    this.pageSize = 5;
    this.startLimit = 0;
    this.endLimit = this.pageSize;
  }

  onChange() {
    this.startLimit = this.page * this.pageSize - this.pageSize;
    this.endLimit = this.startLimit + this.pageSize;
  }

  getAnnonceStatus(annonce: Annonce): string {
    if (annonce.statusCovoit) {
      return annonce.statusCovoit;
    }
    return new Date(annonce.dateDepart).getTime() <= Date.now()
      ? 'Terminé'
      : annonce.annulations.some(
          c => c.matricule === this.loginSvc.user.matricule
        )
        ? 'Annulé'
        : 'En cours';
  }
}
