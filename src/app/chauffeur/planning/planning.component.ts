import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEvent,
  CalendarDateFormatter,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { Annonce } from '../../domain/Annonce';

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
  events: CalendarEvent[] = [
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
      start: new Date(Date.now() + 10 * 60 * 60 * 1000),
      end: new Date(Date.now() + 12 * 60 * 60 * 1000),
      meta: {
        annonce: {
          passagers: []
        }
      }
    }
  ];

  accept(annonce: Annonce) {}
}
