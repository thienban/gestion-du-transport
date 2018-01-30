import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import { VehiculeSociete } from '../../domain/VehiculeSociete';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreerVehiculeComponent } from '../creer-vehicule/creer-vehicule.component';

@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.css']
})
export class VehiculesComponent implements OnInit {
  filtreImmat: string = '';
  filtreMarque: string = '';
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor(public dataSvc: DataService, private modalSvc: NgbModal) {}
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
