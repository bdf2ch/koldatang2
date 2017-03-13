import { Pipe, PipeTransform } from '@angular/core';
import { AtsService } from "./ats.service";

@Pipe({
  name: 'atsTitle',
  pure: false
})
export class AtsTitlePipe implements PipeTransform {

  constructor (private $ats: AtsService) {};

  transform(id: number): string {
    let ats = this.$ats.getATSById(id);
    return ats !== null ? ats.title : '';
  }

}
