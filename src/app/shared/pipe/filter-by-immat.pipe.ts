import { Pipe, PipeTransform } from '@angular/core';
import { VehiculeSociete } from '../../domain/VehiculeSociete';

@Pipe({
  name: 'filterByImmat'
})
export class FilterByImmatPipe implements PipeTransform {
  transform(value: VehiculeSociete[], args?: string): any {
    if (!args) {
      return value;
    } else {
      return value.filter(veh =>
        veh.immatriculation.toLowerCase().includes(args.toLowerCase())
      );
    }
  }
}
