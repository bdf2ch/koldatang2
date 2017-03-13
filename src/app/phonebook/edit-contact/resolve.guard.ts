import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ContactsService } from "../contacts.service";
import { DivisionsService } from "../../divisions/divisions.service";
import { Contact } from "../../models/Contact.model";

const apiUrl = '/assets/sereverside/api.php';

@Injectable()
export class EditContactResolveGuard implements Resolve<Observable<Contact>|Contact> {


  constructor(private $http: Http,
              private $contacts: ContactsService,
              private $divisions: DivisionsService) {
  };


  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|any {
    let id = +route.params["id"];
    let contact = this.$contacts.getById(id);

    if (contact === null) {
      if (this.$divisions.getAll().length === 0)
        this.$divisions.fetchAll().subscribe();

      console.log("starting resolving");
      let headers = new Headers({ "Content-Type": "application/json" });
      let options = new RequestOptions({ headers: headers });
      let params = { action: "getContactById", data: { contactId: id }};

      return this.$http.post(apiUrl, params, options)
        .map((res: Response) => {
          console.log("RESPONSE", res);
          let body = res.json();
          if (body !== null) {
            let contact = new Contact(body.contact);
            contact.setupBackup(["divisionId", "surname", "name", "fname", "position", "email"]);
            let result = {
              contact: contact,
              title: contact.name + " " + contact.fname + " " + contact.surname
            };
            return result;
          } else {
            let result = {
              contact: null
            };
            return result;
          }
        })
        .catch(this.handleError);
    } else {
      console.log("getting user from cache");
      let result = {
        contact: contact,
        title: contact.name + " " + contact.fname + " " + contact.surname
      };
      return result;
    }
  };


  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  };

};
