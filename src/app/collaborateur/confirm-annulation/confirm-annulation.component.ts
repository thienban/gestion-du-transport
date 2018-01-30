import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Annonce } from '../../domain/Annonce';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-confirm-annulation',
  templateUrl: './confirm-annulation.component.html'
})
export class ConfirmAnnulationComponent implements OnInit {
  @Input() reservation: Annonce;
  @Input() title: string;
  @Input() actionTemplate: TemplateRef<any>;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
