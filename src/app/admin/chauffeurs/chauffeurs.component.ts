import { Component, OnInit } from '@angular/core';
import { Collaborateur } from '../../domain/Collaborateur';
import { ChauffeurService } from '../../shared/services/chauffeur.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreerChauffeurComponent } from '../creer-chauffeur/creer-chauffeur.component';

@Component({
  selector: 'app-chauffeurs',
  templateUrl: './chauffeurs.component.html',
  styleUrls: ['./chauffeurs.component.css']
})
export class ChauffeursComponent implements OnInit {
  chauffeurs: Collaborateur[];
  filtreMatricule: string;
  filtreNom: string;
  filtrePrenom: string;

  constructor(
    private chService: ChauffeurService,
    private modalService: NgbModal
  ) {
    this.chService.listerChauffeurs().subscribe(ch => {
      this.chauffeurs = ch;
    });

    this.filtreMatricule = '';
    this.filtreNom = '';
    this.filtrePrenom = '';
  }

  ngOnInit() {}

  ajout() {
    const modalRef = this.modalService.open(CreerChauffeurComponent);
  }
}
