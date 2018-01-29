import { Component, OnInit, Input } from '@angular/core';
import { Annonce } from '../../domain/Annonce';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-liste-reserv-societe',
  templateUrl: './liste-reserv-societe.component.html',
  styleUrls: ['./liste-reserv-societe.component.css']
})
export class ListeReservSocieteComponent implements OnInit {
  @Input() reservations: Annonce[];
  @Input() maxSize;
  @Input() actionTemplate: TemplateRef<any>;
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
