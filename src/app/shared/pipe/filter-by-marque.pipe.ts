import { Pipe, PipeTransform } from '@angular/core';
import { VehiculeSociete } from '../../domain/VehiculeSociete';

@Pipe({
  name: 'filterByMarque'
})
export class FilterByMarquePipe implements PipeTransform {
  transform(value: VehiculeSociete[], args?: string): any {
    if (!args) {
      return value;
    } else {
      return value.filter(veh =>
        veh.marque.toLowerCase().includes(args.toLowerCase())
      );
    }
  }
}
