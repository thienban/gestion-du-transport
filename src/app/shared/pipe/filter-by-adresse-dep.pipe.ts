import { Pipe, PipeTransform } from '@angular/core';
import { Annonce } from '../domain/annonce';

@Pipe({
  name: 'filterByAdresseDep'
})
export class FilterByAdresseDepPipe implements PipeTransform {
  transform(value: Annonce[], arg?: string): Annonce[] {
    console.log('filtering annonces by departure');
    if (!arg) {
      return value;
    } else {
      return value.filter(ans =>
        ans.adresseDepartString.toLowerCase().includes(arg.toLowerCase())
      );
    }
  }
}
