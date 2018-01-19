import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-choix-role',
  templateUrl: './choix-role.component.html',
  styleUrls: ['./choix-role.component.css']
})
export class ChoixRoleComponent implements OnInit {
  constructor(private router: Router) {}

  goToHomepage(profil) {
    this.router.navigateByUrl(profil);
  }
  @Input() role: string;

  ngOnInit() {}
}
