import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEvent,
  CalendarDateFormatter,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import 'rxjs/add/operator/merge';
import { ReservationVehicule } from '../../domain/ReservationVehicule';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class PlanningComponent implements OnInit {
  constructor(private dataService: DataService, private http: HttpClient) {}
  myRaces: Observable<ReservationVehicule[]>;
  eventsToConfirm: Observable<CalendarEvent[]>;
  viewDate = new Date();
  locale = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  accept(resa: ReservationVehicule) {
    console.log('clicked', resa);
    this.dataService.acceptCourse(resa).subscribe(next => {
      console.log('resa ok', next);
    });
  }

  ngOnInit() {
    this.eventsToConfirm = this.dataService.races.map(races => {
      return races.map(r => {
        return {
          title: r.toConfirm ? 'Course en attente' : 'Course acceptée',
          color: r.toConfirm ? this.colors.red : this.colors.yellow,
          start: new Date(r.dateReservation),
          end: new Date(r.dateRetour),
          meta: {
            annonce: r
          }
        };
      });
    });
    this.dataService.fetchAllRaces().subscribe();
  }
}
