import { Pipe, PipeTransform } from '@angular/core';
import { DivisionsService } from "../divisions/divisions.service";

@Pipe({
  name: 'departmentByDivisionId'
})
export class DepartmentByDivisionIdPipe implements PipeTransform {

  constructor (private $divisions: DivisionsService) {};

  transform(id: number): any {
    let division = this.$divisions.getById(id);
    if (division !== null && division.departmentId !== 0) {
      let department = this.$divisions.getById(division.departmentId);
      return department !== null ? department.title : "";
    } else
      return "";
  }

}
