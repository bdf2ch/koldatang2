import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/User.model';

@Pipe({
  name: 'byUserName'
})
export class ByUserNamePipe implements PipeTransform {

  transform(value: User[], search: string): any {
    if (search !== "") {
      let result: User[] = [];
      let length = value.length;
      for (let i = 0; i < length; i++) {
        if (value[i].search.indexOf(search.toLowerCase()) !== -1)
          result.push(value[i]);
      }
      return result;
    } else
      return value;
  };

};
