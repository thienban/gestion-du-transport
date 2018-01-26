import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Categorie } from '../../domain/categorie';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-creer-vehicule',
  templateUrl: './creer-vehicule.component.html',
  styleUrls: ['./creer-vehicule.component.css']
})
export class CreerVehiculeComponent implements OnInit {
  immat: FormControl;
  marque: FormControl;
  modele: FormControl;
  categorie: FormControl;
  nbPlaces: FormControl;
  photo: FormControl;

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
}
