import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsersService, apiUrl } from '../users.service';
import { User } from '../../models/User.model';


@Injectable()
export class EditUserResolveGuard implements Resolve<Observable<User>|User> {


  constructor(private http: Http,
              private users: UsersService) {
  };


  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|any {
    let id = +route.params["id"];
    let user = this.users.getById(id);

    if (user === null) {
      console.log("starting resolving");
      let headers = new Headers({ "Content-Type": "application/json" });
      let options = new RequestOptions({ headers: headers });
      let params = { action: "getUserById", data: { id: id }};

      return this.http.post(apiUrl, params, options)
        .map((res: Response) => {
          let body = res.json();
          let user = new User(body);
          user.setupBackup(["tabId", "divisionId", "surname", "name", "fname", "position", "email", "activeDirectoryAccount", "isAdministrator"]);
          let result = {
            user: user,
            title: user.name + " " + user.fname + " " + user.surname
          };
          //result.user = user;
          //result.title = user.name + " " + user.fname + " " + user.surname;
          //return user;
          return result;
        })
        .catch(this.handleError);
    } else {
      let result = {
        user: user,
        title: user.name + " " + user.fname + " " + user.surname
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
