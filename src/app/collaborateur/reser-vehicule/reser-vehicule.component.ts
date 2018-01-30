import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehiculeSociete } from '../../domain/VehiculeSociete';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-reser-vehicule',
  templateUrl: './reser-vehicule.component.html',
  styleUrls: ['./reser-vehicule.component.css']
})
export class ReserVehiculeComponent implements OnInit {
  time = { hour: 7, minute: 12 };
  model = { year: 2018, month: 1, day: 2 };
  vehiculesDispos: VehiculeSociete[];

  constructor(private dataSvc: DataService, private modalService: NgbModal) {
    this.dataSvc.vehiculesDisponibles.subscribe(
      reserv => (this.vehiculesDispos = reserv)
    );
  }

  ngOnInit() {
    console.log(this.vehiculesDispos);
  }
}
