import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { DataService } from '../data.service';
import { Categorie } from '../../domain/categorie';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/observable';
import { VehiculeSociete } from '../../domain/VehiculeSociete';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-creer-vehicule',
  templateUrl: './creer-vehicule.component.html',
  styleUrls: ['./creer-vehicule.component.css']
})
export class CreerVehiculeComponent implements OnInit {
  categoriesObs: Observable<Categorie[]>;

  constructor(
    private fb: FormBuilder,
    private modal: NgbModal,
    public activeModal: NgbActiveModal,
    private ds: DataService
  ) {}

  vehiculeForm: FormGroup;

  get immatriculation() {
    return this.vehiculeForm.get('immatriculation');
  }
  get marque() {
    return this.vehiculeForm.get('marque');
  }

  get modele() {
    return this.vehiculeForm.get('modele');
  }

  get categorie() {
    return this.vehiculeForm.get('categorie');
  }

  get nbPlaces() {
    return this.vehiculeForm.get('nbPlaces');
  }

  get photo() {
    return this.vehiculeForm.get('photo');
  }

  ngOnInit() {
    this.categoriesObs = this.ds.categories;

    this.vehiculeForm = this.fb.group({
      immatriculation: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z][A-Z]-\d\d\d-[A-Z][A-Z]$/)
        ]
      ],
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      categorie: ['', Validators.required],
      nbPlaces: [
        '',
        [
          Validators.required,
          Validators.max(20),
          Validators.min(1),
          Validators.pattern(/^\d+$/)
        ]
      ],
      photo: ['']
    });
  }

  creerVehicule() {
    forkJoin(
      this.ds.checkMarque(this.marque.value),
      this.ds.checkModele(this.modele.value)
    ).subscribe(allResults => {
      const marqueObject = allResults[0];
      const modelObject = allResults[1];

      console.log(allResults);

      const newVehicule = new VehiculeSociete(
        this.immatriculation.value,
        marqueObject,
        modelObject,
        this.categorie.value,
        this.nbPlaces.value,
        this.photo.value
      );
      console.log('publish : ', newVehicule);
      this.ds.publishVehicule(newVehicule).subscribe(veh => {
        console.log('response to publish : ', veh);
      });
    });
    this.activeModal.close();
  }
}
