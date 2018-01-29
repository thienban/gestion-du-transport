import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Annonce } from '../../domain/Annonce';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-detail-covoiturage',
  templateUrl: './detail-covoiturage.component.html',
  styleUrls: ['./detail-covoiturage.component.css']
})
export class DetailCovoiturageComponent implements OnInit {
  @Input() reservation: Annonce;
  @Input() title: string;
  @Input() actionTemplate: TemplateRef<any>;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
