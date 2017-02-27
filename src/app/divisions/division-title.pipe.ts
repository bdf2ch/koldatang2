import { Pipe, PipeTransform } from '@angular/core';
import { DivisionsService } from './divisions.service';

@Pipe({
  name: 'divisionTitle'
})
export class DivisionTitlePipe implements PipeTransform {

  constructor (private $divisions: DivisionsService) {};


  transform(value: number): string {
    let division = this.$divisions.getById(value);
    return division !== null ? division.title : "";
  }

}
