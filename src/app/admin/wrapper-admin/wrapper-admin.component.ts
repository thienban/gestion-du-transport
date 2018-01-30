import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-wrapper-admin',
  templateUrl: './wrapper-admin.component.html',
  styleUrls: ['./wrapper-admin.component.css']
})
export class WrapperAdminComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {
    console.log('entering in collabs');
    this.dataService.fetchChauffeurs().subscribe(
      next => {
        if (next.length > 0) {
          console.log('chauffeurs data fetched', next);
        }
      },
      err => {
        console.log('error fetching chauffeurs data', err);
      }
    );
    this.dataService.fetchVehiculesSociete().subscribe(
      next => {
        if (next.length > 0) {
          console.log('vehicules data fetched', next);
        }
      },
      err => {
        console.log('error fetching vehicules data', err);
      }
    );
    this.dataService.fetchCategories().subscribe(
      next => {
        if (next.length > 0) {
          console.log('categories data fetched', next);
        }
      },
      err => {
        console.log('error fetching vehicules data', err);
      }
    );
  }
}
