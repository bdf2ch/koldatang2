import { Pipe, PipeTransform } from '@angular/core';
import { UsersService } from "./users.service";
import { User } from "../models/User.model";

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  constructor (private $users: UsersService) {};

  transform(users: User[], divisionId: number): User[] {
    console.log("search length", this.$users.searchQuery.length);
    if (this.$users.searchQuery.length > 2 && divisionId !== 0 ) {
      console.log("local search");
      let length = this.$users.getAll().length;
      let result = [];
      for (let i = 0; i < length; i++) {
        let user = this.$users.getAll()[i];
        if (user.search.indexOf(this.$users.searchQuery) !== -1 && user.divisionId === divisionId)
          result.push(user);
      }
      return result;
    } else {
      console.log("server search");
      return users;
    }
  }

}
