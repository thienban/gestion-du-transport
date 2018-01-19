import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../shared/services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
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

  constructor(private ls: LoginService, private modalService: NgbModal) {}

  ngOnInit() {}

  login() {
    console.log(this.credentials);
    this.ls.login(this.credentials).subscribe(
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
