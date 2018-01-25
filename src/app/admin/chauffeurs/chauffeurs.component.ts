import { Component, OnInit } from '@angular/core';
import { Collaborateur } from '../../domain/Collaborateur';
import { ChauffeurService } from '../../shared/services/chauffeur.service';
@Component({
  selector: 'app-chauffeurs',
  templateUrl: './chauffeurs.component.html',
  styleUrls: ['./chauffeurs.component.css']
})
export class ChauffeursComponent implements OnInit {
  chauffeurs: Collaborateur[];

  constructor(private chService: ChauffeurService) {
    console.log('passe');
    this.chService.listerChauffeurs().subscribe(ch => {
      this.chauffeurs = ch;
      console.log(this.chauffeurs);
    });
  }

  ngOnInit() {}
}
