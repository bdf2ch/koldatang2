import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User, UserConfig } from '../models/User.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class $users {
  users: User[] = [];


  constructor(private http: Http) {};


  /**
   * Производит инициализацию массива пользователей
   * @param source
   * @returns {boolean}
   */
  init(source: UserConfig[]): boolean {
    var length = source.length;
    for (let i = 0; i < length; i++) {
      let user = new User(source[i]);
      user.setupBackup(["surname", "name", "fname", "position", "email", "isAdministrator", "fio"]);
      this.users.push(user);
    }
    return true;
  };


  /**
   * Возвращает массив всех пользователей
   * @returns {User[]}
   */
  getAll(): Observable<User[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let params = { action: "getUsers" };
    return this.http.post("/src/app/serverside/api.php", params, options)
      .map(this.extractData)
      .catch(this.handleError);
  };


  /**
   * Поиск пользователя по идентификатору
   * @param id {number} - идентификатор пользователя
   * @returns {User|boolean}
   */
  getById(id: number): User | boolean {
    length = this.users.length;
    for (let i = 0; i < length; i++) {
      if (this.users[i].id === id)
        return this.users[i];
    }
    return false;
  };

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  };

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
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
  }

}
