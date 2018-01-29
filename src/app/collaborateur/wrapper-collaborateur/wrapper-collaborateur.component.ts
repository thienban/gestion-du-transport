import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-wrapper-collaborateur',
  templateUrl: './wrapper-collaborateur.component.html',
  styleUrls: ['./wrapper-collaborateur.component.css']
})
export class WrapperCollaborateurComponent implements OnInit {
  constructor(private dataSvc: DataService) {
    console.log('entering in collabs');
    this.dataSvc.fetchAllData().subscribe(
      next => {
        if (next.length > 0) {
          console.log('collabs data fetched', next);
        }
      },
      err => {
        console.log('error fetching collabs data', err);
      }
    );
  }

  ngOnInit() {}
}
