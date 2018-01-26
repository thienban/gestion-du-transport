import { Component, OnInit } from '@angular/core';
import { Annonce } from '../../domain/Annonce';
import { AnnonceService } from '../../shared/services/annonce.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../shared/services/login.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reser-covoit',
  templateUrl: './reser-covoit.component.html',
  styleUrls: ['./reser-covoit.component.css']
})
export class ReserCovoitComponent implements OnInit {
  annonces: Annonce[];
  annonce: Annonce = null;
  closeResult: string;
  filterField1: FormControl = new FormControl();
  filterField2: FormControl = new FormControl();
  filterField3: FormControl = new FormControl();
  filtreAdrDep: string;
  filtreAdrAr: string;
  filtreDateAr: Date;

  constructor(
    private annonceService: AnnonceService,
    private loginSvc: LoginService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    console.log(this.loginSvc.user.matricule);
    this.annonceService.listerAnnonces().subscribe(
      annonces =>
        (this.annonces = annonces.filter(a => {
          return (
            new Date(a.dateDepart).getTime() >= Date.now() &&
            a.nbPlacesRestantes > 0 &&
            !a.passagers.some(
              p => p.matricule === this.loginSvc.user.matricule
            ) &&
            a.auteur.matricule !== this.loginSvc.user.matricule
          );
        }))
    );
    this.filterField1.valueChanges.subscribe(val => {
      this.filtreAdrDep = val;
    });
    this.filterField2.valueChanges.subscribe(val => {
      this.filtreAdrAr = val;
    });
    this.filterField3.valueChanges.subscribe(val => {
      this.filtreDateAr = val;
    });
  }
  open(content) {
    this.modalService.open(content);
  }
  saveBooking(annonce: Annonce) {
    this.annonceService.bookAnnonce(annonce).subscribe();
  }
}
