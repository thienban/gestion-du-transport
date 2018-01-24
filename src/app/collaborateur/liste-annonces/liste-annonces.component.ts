import { Component, OnInit, Input } from '@angular/core';
import { Annonce } from '../../domain/Annonce';

@Component({
  selector: 'app-liste-annonces',
  templateUrl: './liste-annonces.component.html',
  styleUrls: ['./liste-annonces.component.css']
})
export class ListeAnnoncesComponent implements OnInit {
  @Input() mode: string;
  @Input() annonces: Annonce[];
  @Input() maxSize;
  startLimit: number;
  endLimit: number;
  page;
  pageSize;
  constructor() {}

  ngOnInit() {
    this.page = 1;
    this.pageSize = this.maxSize ? this.maxSize : 5;
    this.startLimit = 0;
    this.endLimit = this.pageSize;
  }

  onChange() {
    this.startLimit = this.page * this.pageSize - this.pageSize;
    this.endLimit = this.startLimit + this.pageSize;
  }
}
