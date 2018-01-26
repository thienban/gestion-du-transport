import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByNom'
})
export class FilterByNomPipe implements PipeTransform {
  transform(value: any[], arg?: string): any {
    if (arg == '') {
      return value;
    } else {
      return value.filter(ans => {
        return ans.nom.toLowerCase().startsWith(arg.toLowerCase());
      });
    }
  }
}
