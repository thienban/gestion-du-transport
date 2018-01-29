import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByPrenom'
})
export class FilterByPrenomPipe implements PipeTransform {
  transform(value: any[], arg?: string): any {
    if (arg == '') {
      return value;
    } else {
      return value.filter(ans => {
        return ans.prenom.toLowerCase().startsWith(arg.toLowerCase());
      });
    }
  }
}
