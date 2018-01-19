import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() role: string;
  constructor(private loginSvc: LoginService) {}

  buttons: {
    nom: string;
    route: string;
  }[] = [];

  ngOnInit() {
    if (this.role === 'collaborateur') {
      this.buttons.push({ nom: 'Mes réservations', route: 'reservations' });
      this.buttons.push({ nom: 'Mes annonces', route: 'annonces' });
    }
    if (this.role === 'admin') {
      this.buttons.push({ nom: 'Chauffeurs', route: 'chauffeurs' });
      this.buttons.push({ nom: 'Véhicules', route: 'vehicules' });
    }
    if (this.role === 'chauffeur') {
      this.buttons.push({ nom: 'Occupation', route: 'occupation' });
      this.buttons.push({ nom: 'Planning', route: 'planning' });
    }
  }

  logout() {
    this.loginSvc.logout();
  }
}
