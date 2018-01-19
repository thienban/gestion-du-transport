import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

@Component({
  selector: 'app-choix-role',
  templateUrl: './choix-role.component.html',
  styleUrls: ['./choix-role.component.css']
})
export class ChoixRoleComponent implements OnInit {
  @Input() role: string;

  constructor(private router: Router, private modal: NgbActiveModal) {}

  goToHomepage(profil) {
    this.modal.close();
    this.router.navigateByUrl(profil);
  }

  ngOnInit() {}
}
