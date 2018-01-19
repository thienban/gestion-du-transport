import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../shared/services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChoixRoleComponent } from '../choix-role/choix-role.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  credentials: { email: string; password: string } = {
    email: '',
    password: ''
  };
  closeResult = '';

  constructor(private loginSvc: LoginService, private modalService: NgbModal) {}

  ngOnInit() {}

  login() {
    this.loginSvc.login(this.credentials).subscribe(
      role => {
        this.openModal(role);
        console.log(role);
      },
      err => {
        // display error message
      }
    );
    // const httpOptions = {headers:new HttpHeaders({"Content-Type":"application/json"})};
  }

  openModal(role) {
    const modalRef = this.modalService.open(ChoixRoleComponent);
    modalRef.componentInstance.role = role;
  }
}
