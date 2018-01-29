import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  NgbModule,
  NgbAccordion,
  NgbPanel,
  NgbPagination,
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { Annonce } from '../../domain/Annonce';
import { DetailCovoiturageComponent } from '../detail-covoiturage/detail-covoiturage.component';
import {
  getLocaleDateTimeFormat,
  getLocaleDateFormat,
  FormatWidth
} from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Mode } from '../liste-annonces/Mode';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservationsEnCours: Observable<Annonce[]>;
  reservationsHisto: Observable<Annonce[]>;
  modes = Mode;
  modalActionRef: TemplateRef<any>;

  constructor(private dataSvc: DataService, private modalService: NgbModal) {
    this.reservationsEnCours = this.dataSvc.myReservations.map(annonces =>
      annonces.filter(a => new Date(a.dateDepart).getTime() >= Date.now())
    );
    this.reservationsHisto = this.dataSvc.myReservations.map(annonces =>
      annonces.filter(a => new Date(a.dateDepart).getTime() < Date.now())
    );
  }

  ngOnInit() {}

  detailAnnonce(reservation) {
    const modalRef = this.modalService.open(DetailCovoiturageComponent);
    modalRef.componentInstance.reservation = reservation;
    modalRef.componentInstance.title = 'Détails du covoiturage';
  }
}
