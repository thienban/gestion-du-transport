import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choix-role',
  templateUrl: './choix-role.component.html',
  styleUrls: ['./choix-role.component.css']
})
export class ChoixRoleComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToHomepage(profil) {
    this.router.navigateByUrl(profil);
  }
}
