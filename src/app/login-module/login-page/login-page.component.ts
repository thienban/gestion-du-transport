import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../shared/services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChoixRoleComponent } from '../choix-role/choix-role.component';
import { ValidatorFn } from '@angular/forms/src/directives/validators';
import { AbstractControl } from '@angular/forms/src/model';
import { concat } from 'rxjs/observable/concat';

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
  badCredentials = false;

  constructor(private ls: LoginService, private modalService: NgbModal) {}

  ngOnInit() {}

  login() {
    console.log(this.credentials);
    this.ls.login(this.credentials).subscribe(
      role => {
        this.badCredentials = false;
        this.openModal(role);
        console.log(role);
      },
      err => {
        this.badCredentials = true;
      }
    );
    //const httpOptions = {headers:new HttpHeaders({"Content-Type":"application/json"})};
  }

  openModal(role) {
    const modalRef = this.modalService.open(ChoixRoleComponent);
    modalRef.componentInstance.role = role;
    console.log(modalRef.componentInstance);
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

  // getInvalidMsg(): string {
  //   if (!this.credentials.email) {
  //     return 'Veuillez entrer un email valide.';
  //   } else if (!this.credentials.password) {
  //     return 'Veuillez entrer le mot de passe.';
  //   }
  // }
}
