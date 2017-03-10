import { Pipe, PipeTransform } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Contact } from "../models/Contact.model";

@Pipe({
  name: 'searchContacts',
  pure: false
})
export class SearchContactsPipe implements PipeTransform {

  constructor (private $contacts: ContactsService) {};

  transform(contacts: Contact[], divisionId: number): Contact[] {
    if (this.$contacts.searchQuery.length > 2 && divisionId !== 0 ) {
      console.log("local search");
      let length = this.$contacts.getAll().length;
      let result = [];
      for (let i = 0; i < length; i++) {
        let contact = this.$contacts.getAll()[i];
        if (contact.search.indexOf(this.$contacts.searchQuery.toLowerCase()) !== -1)
          result.push(contact);
      }
      return result;
    } else {
      console.log("server search");
      return contacts;
    }
  }

}
