import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByMatricule'
})
export class FilterByMatriculePipe implements PipeTransform {
  transform(value: any[], arg?: string): any[] {
    if (arg == '') {
      return value;
    } else {
      return value.filter(ans => {
        return ans.matricule.toLowerCase().startsWith(arg.toLowerCase());
      });
    }
  }
}
