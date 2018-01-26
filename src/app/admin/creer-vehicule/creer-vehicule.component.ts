import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Categorie } from '../../domain/categorie';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { Observable } from 'rxjs';
import { VehiculeSociete } from '../../domain/VehiculeSociete';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-creer-vehicule',
  templateUrl: './creer-vehicule.component.html',
  styleUrls: ['./creer-vehicule.component.css']
})
export class CreerVehiculeComponent implements OnInit {
  immat: string;
  marque: string;
  modele: string;
  categorie: { id: number; libelle: string };
  nbPlaces: number;
  photo: string;

  categoriesObs: Observable<Categorie[]>;

  constructor(
    private fb: FormBuilder,
    private modal: NgbModal,
    private activeModal: NgbActiveModal,
    private ds: DataService
  ) {}

  ngOnInit() {
    this.categoriesObs = this.ds.categories;
  }

  creerVehicule() {
    forkJoin(
      this.ds.checkMarque(this.marque),
      this.ds.checkModele(this.modele)
    ).subscribe(allResults => {
      const marqueObject = allResults[0];
      const modelObject = allResults[1];

      console.log(allResults);

      const newVehicule = new VehiculeSociete(
        this.immat,
        marqueObject,
        modelObject,
        this.categorie,
        this.nbPlaces,
        this.photo
      );
      console.log('publish : ', newVehicule);
      this.ds.publishVehicule(newVehicule).subscribe(veh => {
        console.log('response to publish : ', veh);
      });
    });
  }
}
