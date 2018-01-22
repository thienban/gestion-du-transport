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
  @Input() maxSize;
  page;
  startLimit;
  itemPerPage = 5;
  currentDate;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.currentDate = Date.now();

    this.page = 1;

    this.startLimit = 1;
    this.maxSize = this.itemPerPage;
  }

  onChange() {
    this.startLimit =
      this.page * this.itemPerPage - this.itemPerPage + (this.page - 1);

    this.maxSize = this.startLimit + this.itemPerPage;
  }

  detailAnnonce(reservation) {
    const modalRef = this.modalService.open(DetailCovoiturageComponent);
    modalRef.componentInstance.reservation = reservation;
  }
}
