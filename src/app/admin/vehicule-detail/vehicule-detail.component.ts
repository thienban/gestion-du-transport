import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { VehiculeSociete } from '../../domain/VehiculeSociete';
import { ActivatedRoute } from '@angular/router/';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicule-detail',
  templateUrl: './vehicule-detail.component.html',
  styleUrls: ['./vehicule-detail.component.css']
})
export class VehiculeDetailComponent implements OnInit, OnDestroy {
  vehicule: VehiculeSociete;
  private sub: any;
  //reservationsPassees : Reservation[]
  //reservationsFutures : Reservation[]

  constructor(private route: ActivatedRoute, private ds: DataService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.ds.fetchVehiculeByImmat(params.immat).subscribe(veh => {
        console.log(veh);
        this.vehicule = veh;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
