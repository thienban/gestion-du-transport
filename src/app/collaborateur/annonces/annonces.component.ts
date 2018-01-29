import { Component, OnInit } from '@angular/core';
import { Annonce } from '../../domain/Annonce';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';
import 'rxjs/add/operator/filter';
import { Mode } from '../liste-annonces/Mode';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
  constructor(private dataSvc: DataService) {}
  annoncesHisto: Observable<Annonce[]>;
  annoncesCurrent: Observable<Annonce[]>;
  currentDate = new Date();
  modes = Mode;
  ngOnInit() {
    this.annoncesHisto = this.dataSvc.myAnnonces.map(annonces =>
      annonces.filter(a => {
        return new Date(a.dateDepart) < this.currentDate;
      })
    );
    this.annoncesCurrent = this.dataSvc.myAnnonces.map(annonces =>
      annonces.filter(a => new Date(a.dateDepart) >= this.currentDate)
    );
  }
}
