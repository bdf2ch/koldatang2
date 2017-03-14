import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ContactsService } from "../contacts.service";
import { DivisionsService } from "../../divisions/divisions.service";
import { Contact } from "../../models/Contact.model";
import { Phone } from "../../models/Phone.model";

const apiUrl = '/assets/sereverside/api.php';

@Injectable()
export class EditContactResolveGuard implements Resolve<Observable<Contact>|Contact> {


  constructor(private $http: Http,
              private $contacts: ContactsService,
              private $divisions: DivisionsService) {};


  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|any {
    let id = +route.params["id"];
    let contact = this.$contacts.getById(id);

    if (contact === null) {
      console.log("starting resolving");
      return this.$contacts.fetchById(id).map((data: any) => {
        console.log("data = ", data);
        //if (this.$divisions.getAll().length === 0)
        //  this.$divisions.fetchAll().subscribe();
        return data;
      });
    } else {
      console.log("getting user from cache");
      let result = {
        contact: contact,
        phones: []
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
