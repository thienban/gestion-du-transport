import { Component, OnInit } from '@angular/core';
import { AgmCoreModule as google } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AutocompletionService } from '../../shared/services/autocompletion.service';

@Component({
  selector: 'app-test-autocompletion',
  templateUrl: './test-autocompletion.component.html',
  styleUrls: ['./test-autocompletion.component.css']
})
export class TestAutocompletionComponent implements OnInit {
  address: string = '';
  predictionsSubject:BehaviorSubject<string[]> = new BehaviorSubject<string[]>;

  constructor(private http: HttpClient, private auto:AutocompletionService) {}

  ngOnInit() {}

  

}
