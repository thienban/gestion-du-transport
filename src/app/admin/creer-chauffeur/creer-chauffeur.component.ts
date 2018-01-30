import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChauffeurService } from '../../shared/services/chauffeur.service';
import { Collaborateur } from '../../domain/Collaborateur';
import { CollaborateurService } from '../../shared/services/collaborateur.service';
import { Role } from '../../domain/role';

@Component({
  selector: 'app-creer-chauffeur',
  templateUrl: './creer-chauffeur.component.html',
  styleUrls: ['./creer-chauffeur.component.css']
})
export class CreerChauffeurComponent implements OnInit {
  matricule: string;
  collab: Collaborateur;
  chauffeurs: Collaborateur[];
  message: string;

  constructor(
    public activeModal: NgbActiveModal,
    private chService: ChauffeurService,
    private cService: CollaborateurService
  ) {}

  ngOnInit() {
    this.matricule = '';
    this.message = '';
  }

  creer(newMatricule: string) {
    this.chService.listerChauffeurs().subscribe(ch => (this.chauffeurs = ch));

    if (
      this.chauffeurs.find(
        c => c.matricule.toLowerCase() === newMatricule.toLowerCase()
      ) != null
    ) {
      // collaborateur déjà chauffeur
      this.message = 'Le collaborateur est déjà chauffeur';
    } else {
      this.cService.listerCollabs().subscribe(co => {
        this.collab = co.find(
          c => c.matricule.toLowerCase() === newMatricule.toLowerCase()
        );

        if (this.collab == null) {
          // collaborateur n'existe pas
          this.message = "Le collaborateur n'existe pas";
        } else {
          // chauffeur créé
          this.chService.creerChauffeur(newMatricule.toLowerCase());
          this.message = 'Le collaborateur est maintenant un chauffeur';
        }
      });
    }
  }
}
