import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Division, DivisionConfig } from '../models/Division.model';
import { Observable } from 'rxjs/Observable';

export const apiUrl = "/assets/serverside/api.php";


@Injectable()
export class DivisionsService {
  divisions: Division[] = [];
  selected: Division|null = null;


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
      division.setupBackup(["parentId", "title", "isDepartment"]);
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


  getSelected(): Division|null {
    return this.selected;
  };

  /**
   * Добавляет структурное подразделение
   * @param division {Division} - добавляемое структурное подразделение
   * @returns {Observable<Division>}
   */
  add(division: Division): Observable<Division> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let parameters = {
      action: "addDivision",
      data: {
        parentId: division.parentId,
        title: division.title,
        isDepartment: division.isDepartment
      }
    };
    return this.http.post(apiUrl, parameters, options)
      .map((res: Response) => {
        let body = res.json();
        let division = new Division(body);
        division.setupBackup(["parentId", "title", "isDepartment"]);
        this.divisions.push(division);
        return division;
      })
      .catch(this.handleError);
  };


  /**
   * Редактирует структурное подразделение
   * @param division {Division} - структурное подразделение
   * @returns {Observable<boolean>}
   */
  edit(division: Division): Observable<Division> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let parameters = {
      action: "editDivision",
      data: {
        id: division.id,
        parentId: division.parentId,
        title: division.title,
        isDepartment: division.isDepartment
      }
    };
    return this.http.post(apiUrl, parameters, options)
      .map(() => {
        division.setupBackup(["parentId", "title", "isDepartment"]);
        return division;
      })
      .catch(this.handleError);
  };


  /**
   * Выбирает текущее структурное подразделение
   * @param id {number|null} - Идентификатор структурного подразделения/null
   * @returns {Division|null}
   */
  select(id: number|null): Division|null {
    if (id !== null) {
      let length = this.divisions.length;
      for (let i = 0; i < length; i++) {
        if (this.divisions[i].id === id)
          this.selected = this.divisions[i];
      }
    } else
      this.selected = null;
    return this.selected;
  };


  private handleError (error: Response|any) {
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

}
