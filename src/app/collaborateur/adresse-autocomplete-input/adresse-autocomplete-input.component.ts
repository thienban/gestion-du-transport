import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adresse-autocomplete-input',
  templateUrl: './adresse-autocomplete-input.component.html',
  styleUrls: ['./adresse-autocomplete-input.component.css']
})
export class AdresseAutocompleteInputComponent implements OnInit {
  adresse: string;
  constructor(private http: HttpClient) {}

  ngOnInit() {}
}
