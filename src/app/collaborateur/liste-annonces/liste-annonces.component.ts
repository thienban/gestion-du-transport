import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailCovoiturageComponent } from '../detail-covoiturage/detail-covoiturage.component';

@Component({
  selector: 'app-liste-annonces',
  templateUrl: './liste-annonces.component.html',
  styleUrls: ['./liste-annonces.component.css']
})
export class ListeAnnoncesComponent implements OnInit {
  @Input() libelleListe;
  @Input() titre;
  @Input() reservations;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    console.log(this.libelleListe);
    console.log(this.titre);
    console.log(this.reservations);
  }

  detailAnnonce(reservation) {
    const modalRef = this.modalService.open(DetailCovoiturageComponent);
    modalRef.componentInstance.reservation = reservation;
  }
}
