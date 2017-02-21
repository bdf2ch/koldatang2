import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Division, DivisionConfig } from '../models/Division.model';
import { Observable } from 'rxjs/Observable';

export const apiUrl = "/assets/serverside/api.php";


@Injectable()
export class DivisionsService {
  divisions: Division[] = [];


  constructor(private http: Http) {};


  /**
   * Получает все структурные подразделения с сервера
   * @returns {Observable<Division[]>}
   */
  fetchAll(): Observable<Division[]> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: "getAllDivisions" };

    return this.http.post(apiUrl, parameters, options)
      .map((res: Response) => {
        let result: Division[] = [];
        let body = res.json();
        let length = body.length;
        for (let i = 0; i < length; i++) {
          let division = new Division(body[i]);
          division.setupBackup(["parentId", "title", "isDepartment"]);
          this.divisions.push(division);
          result.push(division);
        }
        console.log(result);
        return result;
      })
      .catch(this.handleError);
  };


  /**
   * Производит инициализацию массива структурных подразделений
   * @param source
   * @returns {boolean}
   */
  init(source: DivisionConfig[]): boolean {
    let length = source.length;
    for (let i = 0; i < length; i++) {
      let division = new Division(source[i]);
      this.divisions.push(division);
    }
    return true;
  };


  /**
   * Возвращает массив всех структурных подразделений
   * @returns {Division[]}
   */
  getAll(): Division[] {
    return this.divisions;
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


  /**
   *
   * @param id
   * @returns {any}
   */
  getById(id:number): Division|null {
    let length = this.divisions.length;
    for (let i = 0; i < length; i++) {
      if (this.divisions[i].id === id)
        return this.divisions[i];
    }
    return null;
  };
}
