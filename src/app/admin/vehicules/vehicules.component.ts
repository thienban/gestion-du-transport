import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { VehiculeSociete } from '../../domain/VehiculeSociete';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { CreerVehiculeComponent } from '../creer-vehicule/creer-vehicule.component';

@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.css']
})
export class VehiculesComponent implements OnInit {
  constructor(private dataSvc: DataService, private modalSvc: NgbModal) {}
  vehicules: Observable<VehiculeSociete[]>;

  ngOnInit() {
    this.vehicules = this.dataSvc.vehiculesSociete;
  }

  ajouterVehicule() {
    const modalRef = this.modalSvc.open(CreerVehiculeComponent);
  }
}
