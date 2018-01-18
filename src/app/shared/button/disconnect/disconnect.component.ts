import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disconnect',
  templateUrl: './disconnect.component.html',
  styleUrls: ['./disconnect.component.css']
})
export class DisconnectComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  disconnect(event) {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('login');
  }
}
