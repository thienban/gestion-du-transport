import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/Observable";

import { Annonce } from '../domain/annonce'

@Injectable()
export class AnnonceService {
  annonceSubject: BehaviorSubject<Annonce[]> = new BehaviorSubject([]);
  filtreSubject: BehaviorSubject<string> = new BehaviorSubject("");

  constructor() { }

  listerAnnonces(): Observable<Annonce[]> {
    // Make the HTTP request:
    return this.annonceSubject.asObservable();
  }

  getFiltreObservable(){
    return this.filtreSubject.asObservable();
  }
  setFiltre(value){
    this.filtreSubject.next(value);
  }
}
