import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { VehiculeSociete } from '../../domain/VehiculeSociete';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.css']
})
export class VehiculesComponent implements OnInit {
  constructor(private dataSvc: DataService) {}
  vehicules: Observable<VehiculeSociete[]>;

  ngOnInit() {
    this.vehicules = this.dataSvc.vehiculesSociete;
  }
}
