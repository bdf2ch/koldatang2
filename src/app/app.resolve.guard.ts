import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApplicationService } from './application.service';

const apiUrl = "/assets/serverside/api.php";

@Injectable()
export class AppResolveGuard implements Resolve<Observable<any>|void> {

  constructor ( private $http: Http,
                private $application: ApplicationService) {};


  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|void {
    console.log("app resolve guard start");

    if (this.$application.getData() === null) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let parameters = { action: 'getInitialData' };
      return this.$http.post(apiUrl, parameters, options)
        .map((res: Response) => {
          let data = res.json();
          return data;
        })
        .catch(this.handleError);
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
