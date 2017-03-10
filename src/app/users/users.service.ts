import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User, UserConfig } from '../models/User.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';

export const apiUrl = "/assets/serverside/api.php";

@Injectable()
export class UsersService {
  users: User[] = [];
  start: number = 0;
  limit: number = 50;
  total: number = 0;
  loading: boolean = false;
  inSearchMode: boolean = false;
  searchQuery: string = "";


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
      user.setupBackup(["tabId", "divisionId", "surname", "name", "fname", "position", "email", "activeDirectoryAccount", "fio", "isAdministrator"]);
      this.users.push(user);
      this.limit++;
    }
    return true;
  };



  /**
   * Запрашивает всех пользователей с сервера
   * @returns {User[]}
   */
  fetchAll(): Observable<User[]> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let params = { action: "getAllUsers" };
    let users = this.users;
    this.inSearchMode = false;
    this.loading = true;
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
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Запрашивает страницу пользователей с сервера
   * @returns {Observable<R>}
   */
  fetch(): Observable<User[]> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let params = { action: "getUsersPortion", data: { start: this.start, limit: this.limit } };
    this.inSearchMode = false;
    this.loading = true;

    return this.http.post(apiUrl, params, options)
      .map((res: Response) => {
        if (this.start === 0)
          this.users = [];
        let body = res.json();
        this.total = body.total;
        let length = body.users.length;
        for (var i = 0; i < length; i++) {
          var user = new User(body.users[i]);
          user.setupBackup(["tabId", "divisionId", "surname", "name", "fname", "position", "email", "activeDirectoryAccount", "fio", "isAdministrator"]);
          this.users.push(user);
          this.start++;
        }
        console.log(this.users);
        console.log("total = ", this.total);
        this.loading = false;
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Запрашивает пользователя с сервера по идентификатору
   * @param id {number} - идентификатор пользователя
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
          user.setupBackup(["tabId", "divisionId", "surname", "name", "fname", "position", "email", "activeDirectoryAccount", "fio", "isAdministrator"]);
          return user;
        } else
          return null;
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Запрашивает пользователей с сервера по идентификатору структурного подразделения
   * @param id {number} - идентификатор структурного подразделения
   * @returns {Observable<R>}
   */
  fetchByDivisionId(id: number): Observable<User[]|null> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers })
    let parameters = {action: "getUsersByDivisionId", data: { divisionId: id } };
    return this.http.post(apiUrl, parameters, options)
      .map((res: Response) => {
        if (res instanceof Response) {
          let body = res.json();
          let length = body.length;
          this.users.splice(0, this.users.length);
          for (let i = 0; i < length; i++) {
            let user = new User(body[i]);
            user.setupBackup(["tabId", "divisionId", "surname", "name", "fname", "position", "email", "activeDirectoryAccount", "fio", "isAdministrator"]);
            this.users.push(user);
            this.start = 0;
            this.loading = false;
          }
        } else {
          this.loading = false;
          return null;
        }
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Запрашивает пользователей с сервера в соответствии с условиями поиска
   * @returns {Observable<User>}
   */
  search(): Observable<User[]> | null {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let params = { action: "searchUsers", data: { search: this.searchQuery } };
    this.inSearchMode = true;
    this.loading = true;

    return this.http.post(apiUrl, params, options)
      .map((res: Response) => {
        this.loading = false;
        let body = res.json();
        if (body !== null) {
          let length = body.length;
          this.users.splice(0, this.users.length);
          for (let i = 0; i < length; i++) {
            let user = new User(body[i]);
            user.setupBackup(["tabId", "divisionId", "surname", "name", "fname", "position", "email", "activeDirectoryAccount", "fio", "isAdministrator"]);
            this.users.push(user);
            this.start = 0;
            this.loading = false;
          }
        } else
          return null;
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Получение всех загруженных пользователей
   * @returns {User[]}
   */
  getAll(): User[] {
    return this.users;
  };


  /**
   * Получение пользователя по идентификатору
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
   * Получение общего количества пользователей
   * @returns {number}
   */
  getTotal (): number {
    return this.total;
  };


  /**
   * Добавление нового пользователя
   * @param user {User} - добавляемый пользователь
   * @returns {Observable<R>}
   */
  add(user: User, callback?: any): Observable<User> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let params = {
      action: "addUser",
      data: {
        tabId: user.tabId,
        divisionId: 0,
        departmentId: 0,
        surname: user.surname,
        name: user.name,
        fname: user.fname,
        position: user.position,
        email: user.email,
        password: user.password,
        activeDirectoryAccount: user.activeDirectoryAccount,
        isAdministrator: user.isAdministrator
      }
    };
    return this.http.post(apiUrl, params, options)
      .map((res: Response) => {
        let body = res.json();
        let user = new User(body);
        user.setupBackup(["tabId", "divisionId", "surname", "name", "fname", "position", "email", "activeDirectoryAccount", "fio", "isAdministrator"]);
        //this.users.push(user);
        if (callback !== undefined && typeof callback === "function")
          callback(user);
        return user;
      });
  };


  /**
   * Сохранение данных редактируемого пользователя
   * @param user {User} - редактируемый пользователь
   * @returns {Observable<R>}
   */
  edit(user: User): Observable<User> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let parameters = {
      action: 'editUser',
      data: {
        id: user.id,
        departmentId: 0,
        divisionId: user.divisionId,
        tabId: user.tabId,
        surname: user.surname,
        name: user.name,
        fname: user.fname,
        email: user.email,
        position: user.position,
        activeDirectoryAccount: user.activeDirectoryAccount,
        password: '',
        isAdministrator: user.isAdministrator
      }
    };
    this.loading = true;
    return this.http.post(apiUrl, parameters, options)
      .map((response: Response) => {
        user.setupBackup(["tabId", "divisionId", "surname", "name", "fname", "position", "email", "activeDirectoryAccount", "fio", "isAdministrator"]);
        user.changed(false);
        this.loading = false;
        return user;
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Получение статуса нахождения в режиме поиска пользователей
   * @returns {boolean}
   */
  isInSearchMode(): boolean {
    return this.inSearchMode;
  };


  isLoading(flag?: boolean) : boolean {
    if (flag !== undefined)
      this.loading = flag;
    return this.loading;
  } ;


  /**
   * Обработчик ошибок
   * @param error {Response|any}
   * @returns {any}
   */
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    this.loading = false;
    console.error(errMsg);
    return Observable.throw(errMsg);
  };

}
