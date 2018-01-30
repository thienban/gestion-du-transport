import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { getISOWeek } from 'date-fns';
import { DatePipe } from '@angular/common';

export class CustomDateFormatter extends CalendarDateFormatter {
  public weekViewTitle({ date, locale }: DateFormatterParams): string {
    const year: string = new DatePipe(locale).transform(date, 'y', locale);
    const weekNumber: number = getISOWeek(date);
    return `Semaine ${weekNumber} en ${year}`;
  }
  /*
  public dayViewTitle({ date, locale }: DateFormatterParams): string {
    const year: string = new DatePipe(locale).transform(date, 'y', locale);
    const month: string = new DatePipe(locale).transform(date, 'M', locale);
    return `${year} ${month} ${year}`;
  }
  */
}
