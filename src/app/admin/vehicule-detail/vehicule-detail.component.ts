import { Component, OnInit } from '@angular/core';
import { VehiculeSociete } from '../../domain/VehiculeSociete';
import { Input } from '@angular/core';

@Component({
  selector: 'app-vehicule-detail',
  templateUrl: './vehicule-detail.component.html',
  styleUrls: ['./vehicule-detail.component.css']
})
export class VehiculeDetailComponent implements OnInit {
  @Input() vehicule: VehiculeSociete;

  constructor() {}

  ngOnInit() {}
}
