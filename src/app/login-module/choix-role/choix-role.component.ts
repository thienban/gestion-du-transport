import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-choix-role',
  templateUrl: './choix-role.component.html',
  styleUrls: ['./choix-role.component.css']
})
export class ChoixRoleComponent implements OnInit {
  @Input() role: string;
  constructor() {}

  ngOnInit() {}
}
