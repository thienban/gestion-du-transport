import { Component, OnInit, Input } from '@angular/core';
import { Annonce } from '../../domain/Annonce';
import { Mode } from './Mode';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-liste-annonces',
  templateUrl: './liste-annonces.component.html',
  styleUrls: ['./liste-annonces.component.css']
})
export class ListeAnnoncesComponent implements OnInit {
  @Input() mode: Mode;
  @Input() annonces: Annonce[];
  @Input() maxSize;
  @Input() actionTemplate: TemplateRef<any>;
  modes = Mode;
  startLimit: number;
  endLimit: number;
  page: number;
  pageSize: number;
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
