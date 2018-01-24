import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-covoiturage',
  templateUrl: './detail-covoiturage.component.html',
  styleUrls: ['./detail-covoiturage.component.css']
})
export class DetailCovoiturageComponent implements OnInit {
  @Input() reservation;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
