import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { VehiculeSociete } from '../../domain/VehiculeSociete';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { CreerVehiculeComponent } from '../creer-vehicule/creer-vehicule.component';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.css']
})
export class VehiculesComponent implements OnInit {
  filtreImmat: string = '';
  filtreMarque: string = '';
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dataSvc: DataService, private modalSvc: NgbModal) {}
  vehicules: Observable<VehiculeSociete[]>;

  ngOnInit() {
    this.vehicules = this.dataSvc.vehiculesSociete;
    this.dataSvc
      .getFiltreImmatObservable()
      .subscribe(immat => (this.filtreImmat = immat));
    this.dataSvc
      .getFiltreMarqueObservable()
      .subscribe(mq => (this.filtreMarque = mq));
  }

  ajouterVehicule() {
    const modalRef = this.modalSvc.open(CreerVehiculeComponent);
  }
}
