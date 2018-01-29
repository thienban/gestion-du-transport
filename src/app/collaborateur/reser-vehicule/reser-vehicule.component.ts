import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reser-vehicule',
  templateUrl: './reser-vehicule.component.html',
  styleUrls: ['./reser-vehicule.component.css']
})
export class ReserVehiculeComponent implements OnInit {
  time = { hour: 7, minute: 12 };
  constructor() {}

  ngOnInit() {}
}
