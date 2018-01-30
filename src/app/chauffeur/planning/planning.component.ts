import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEvent,
  CalendarDateFormatter,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';

import { ReservationVehicule } from '../../domain/ReservationVehicule';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

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
export class PlanningComponent {
  constructor(private dataService: DataService) {}
  races: Observable<ReservationVehicule[]>;
  events: CalendarEvent[] = [];

  ngOnInit() {
    this.races = this.dataService.confirmRace;
    this.dataService.fetchToConfirmRaces().subscribe();
    this.races.subscribe(tabReservations => {
      this.events = tabReservations.map(r => {
        console.log(r);
        return {
          title: 'Course en attente',
          color: this.colors.red,
          start: new Date(r.dateReservation),
          end: new Date(r.dateReservation),
          meta: {
            r: {
              passagers: []
            }
          }
        };
      });
      /*
      [
        {
          title: 'A non all day event',
          color: this.colors.blue,
          start: new Date(),
          end: new Date(Date.now() + 12 * 60 * 60 * 1000),
          meta: {
            annonce: {
              passagers: []
            }
          }
        },
        {
          title: 'Course en attente',
          color: this.colors.red,
          start: new Date(r[0].dateReservation),
          end: new Date(r[0].dateReservation),
          meta: {
            races: {
              passagers: []
            }
          }
        }
      ];
      */
    });
  }

  viewDate = new Date();
  locale: string = 'fr';
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
}
