import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByDateDep'
})
export class FilterByDateDepPipe implements PipeTransform {
  transform(value: any[], arg?: string): any[] {
    console.log('filtering annonces by departure', value, arg);
    if (!arg) {
      return value;
    } else {
      return value.filter(ans => {
        return ans.dateDepart.toLowerCase().includes(arg.toLowerCase());
      });
    }
  }
}
