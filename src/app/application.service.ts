import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { DivisionsService }  from './divisions/divisions.service';
import { DivisionConfig } from './models/Division.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApplicationService {
  data: any|null = null;
  loading: boolean = false;


  constructor(private $http: Http,
              private $divisions: DivisionsService) {
    /*
    if (this.data === null) {
      this.fetchInitialData().subscribe(
        (data: { divisions: DivisionConfig[] }) => {
          if (data.divisions !== undefined)
            this.$divisions.init(data.divisions);
        },
      function (error:any) {},
      function () {
        console.log("fetch initial data complete");
      })
    };
    */
  };


  fetchInitialData(): Observable<any> {
    console.log("getting initial data");
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: "getInitialData" };
    this.loading = true;
    return this.$http.post("/assets/serverside/api.php", parameters, options)
      .map((response: Response) => {
        let data = response.json();
        return data;
      })
      .catch(this.handleError);
  };


  getData(): any {
    return this.data;
  };


  setData(data: any): any {
    this.data = data;
  };


  parseData(): void {
    if (this.data !== null) {
      if (this.data['divisions'] !== undefined)
        this.$divisions.init(this.data['divisions']);
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
