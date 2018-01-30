import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Annonce } from '../../domain/Annonce';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';
import 'rxjs/add/operator/filter';
import { Mode } from '../liste-annonces/Mode';
import { ConfirmAnnulationComponent } from '../confirm-annulation/confirm-annulation.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
  constructor(private dataSvc: DataService, private modalSvc: NgbModal) {}
  annoncesHisto: Observable<Annonce[]>;
  annoncesCurrent: Observable<Annonce[]>;
  currentDate = new Date();
  modes = Mode;
  modalCancel: NgbModalRef;
  @ViewChild('confirmTemplate') confirmTemplate: TemplateRef<any>;

  ngOnInit() {
    this.annoncesHisto = this.dataSvc.myAnnonces.map(annonces =>
      annonces.filter(a => {
        return (
          new Date(a.dateDepart) < this.currentDate ||
          a.statusCovoit === 'ANNULE'
        );
      })
    );
    this.annoncesCurrent = this.dataSvc.myAnnonces.map(annonces =>
      annonces.filter(
        a =>
          new Date(a.dateDepart) >= this.currentDate &&
          a.statusCovoit !== 'ANNULE'
      )
    );
  }

  openCancelModal(annonce: Annonce) {
    const modalRef = this.modalSvc.open(ConfirmAnnulationComponent);
    modalRef.componentInstance.reservation = annonce;
    modalRef.componentInstance.title =
      'Etes-vous sûr de vouloir annuler cette annonce ?';
    modalRef.componentInstance.actionTemplate = this.confirmTemplate;
    this.modalCancel = modalRef;
  }

  confirmCancel(annonce: Annonce) {
    this.dataSvc
      .cancelAnnonce(annonce)
      .subscribe(resp => this.modalCancel.close());
  }
}
