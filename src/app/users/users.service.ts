import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User, UserConfig } from '../models/User.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export const apiUrl = "/assets/serverside/api.php";

@Injectable()
export class UsersService {
  users: User[] = [];
  start: number = 0;
  limit: number = 50;
  total: number = 0;


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
      this.limit++;
    }
    return true;
  };


  /**
   * Запрашивает массив всех пользователей с сервера
   * @returns {User[]}
   */
  fetchAll(): Observable<User[]> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let params = { action: "getAllUsers" };
    let users = this.users;
    return this.http.post(apiUrl, params, options)
      .map(function (res: Response) {
        let body = res.json();
        let result: User[] = [];
        let length = body.length;
        for (let i = 0; i < length; i++) {
          let user = new User(body[i]);
          result.push(user);
          users.push(user);
        }
        return result;
      })
      .catch(this.handleError);
  };


  /**
   *
   * @returns {Observable<R>}
   */
  fetch(): Observable<User[]> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let params = { action: "getUsersPortion", data: { start: this.start, limit: this.limit } };

    return this.http.post(apiUrl, params, options)
      .map((res: Response) => {
        let body = res.json();
        this.total = body.total;
        let length = body.users.length;
        for (var i = 0; i < length; i++) {
          var user = new User(body.users[i]);
          user.setupBackup(["surname", "name", "fname", "position", "email", "isAdministrator", "fio"]);
          this.users.push(user);
          this.start++;
        }
        console.log(this.users);
        console.log("total = ", this.total);
      })
      .catch(this.handleError);
  };


  /**
   *
   * @param id
   * @returns {Observable<User>}
   */
  fetchById(id: number): Observable<User|null> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let params = { action: "getUserById", data: { id: id } };
    return this.http.post(apiUrl, params, options)
      .map(function (res: Response) {
        let body = res.json();
        console.log(body);
        if (body !== null) {
          let user = new User(body);
          user.setupBackup(["tabId", "divisionId", "surname", "name", "fname", "position", "email", "isAdministrator"]);
          return user;
        } else
          return null;
      })
      .catch(this.handleError);
  };


  /**
   *
   * @param search
   * @returns {Observable<User>}
   */
  search(search: string): Observable<User[]> | null {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let params = { action: "searchUsers", data: { search: search } };

    return this.http.post(apiUrl, params, options)
      .map(function (res: Response | null) {
        if (res instanceof Response) {
          let body = res.json();
          let length = body.length;
          for (let i = 0; i < length; i++) {
            let user = new User(body[i]);
            user.setupBackup(["surname", "name", "fname", "position", "email", "isAdministrator", "fio"]);
            this.users.push(user);
            this.start = 0;
          }
        } else
          return null;
      })
      .catch(this.handleError);
  };


  /**
   *
   * @returns {User[]}
   */
  getAll(): User[] {
    return this.users;
  };


  /**
   * Поиск пользователя по идентификатору
   * @param id {number} - идентификатор пользователя
   * @returns {User|boolean}
   */
  getById(id: number): User | null {
    let length = this.users.length;
    for (let i = 0; i < length; i++) {
      if (this.users[i].id === id)
        return this.users[i];
    }
    return null;
  };


  /**
   *
   * @returns {number}
   */
  getTotal (): number {
    return this.total;
  };


  /**
   *
   * @param user
   * @returns {Observable<R>}
   */
  add(user: User, callback: any): Observable<User> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let params = {
      action: "addUser",
      data: {
        divisionId: 0,
        departmentId: 0,
        surname: user.surname,
        name: user.name,
        fname: user.fname,
        position: user.position,
        email: user.email,
        activeDirectoryAccount: user.activeDirectoryAccount,
        isAdministrator: user.isAdministrator
      }
    };

    return this.http.post(apiUrl, params, options)
      .map((res: Response) => {
        let body = res.json();
        let user = new User(body);
        user.setupBackup(["tabId", "divisionId", "departmentId", "surname", "name", "fname", "position", "email", "activeDirectoryAccount", "isAdministrator"]);
        this.users.push(user);
        if (callback !== undefined && typeof callback === "function")
          callback(user);
        return user;
      });
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

}
