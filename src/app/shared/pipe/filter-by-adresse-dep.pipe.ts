import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByAdresseDep'
})
export class FilterByAdresseDepPipe implements PipeTransform {
  transform(value: any[], arg?: string): any[] {
    // console.log('filtering annonces by departure', value, arg);
    if (!arg) {
      return value;
    } else {
      return value.filter(ans => {
        return ans.adresseDepart.toLowerCase().includes(arg.toLowerCase());
      });
    }
  }
}
