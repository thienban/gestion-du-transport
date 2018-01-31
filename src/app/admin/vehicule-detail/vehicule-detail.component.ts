import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { VehiculeSociete } from '../../domain/VehiculeSociete';
import { ActivatedRoute } from '@angular/router/';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { ReservationVehicule } from '../../domain/ReservationVehicule';

@Component({
  selector: 'app-vehicule-detail',
  templateUrl: './vehicule-detail.component.html',
  styleUrls: ['./vehicule-detail.component.css']
})
export class VehiculeDetailComponent implements OnInit, OnDestroy {
  vehicule: VehiculeSociete;
  private sub: any;
  // reservationsPassees: Observable<ReservationVehicule[]>;
  // reservationsFutures: Observable<ReservationVehicule[]>;
  reservationsPassees: ReservationVehicule[];
  reservationsFutures: ReservationVehicule[];

  constructor(private route: ActivatedRoute, private ds: DataService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.ds.fetchVehiculeByImmat(params.immat).subscribe(veh => {
        console.log(veh);
        this.vehicule = veh;
      });

      this.ds.fetchReservationsDuVehicule(params.immat).subscribe(res => {
        this.reservationsFutures = res.filter(
          r => new Date(r.dateReservation).getTime() > Date.now()
        );
        //console.log(this.reservationsFutures);
        this.reservationsPassees = res.filter(
          r => new Date(r.dateReservation).getTime() < Date.now()
        );
        //console.log(this.reservationsPassees);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
