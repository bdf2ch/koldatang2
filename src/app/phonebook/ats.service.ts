import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { ATS, ATSConfig } from "../models/ATS.model";
import { ATSCode } from "../models/ATSCode.model";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


const apiUrl = '/assets/serverside/api.php';

@Injectable()
export class AtsService {
  ats: ATS[] = [];
  codes: ATSCode[] = [];
  loading: boolean = false;

  constructor(private $http: Http) {};


  /**
   * Запрашивает с сервера массив всех АТС
   * @returns {Observable<R>}
   */
  fetchAllATS(): Observable<ATS[]|null> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: 'getAllATS'};
    this.loading = true;
    return this.$http.post(apiUrl, parameters, options)
      .map((res: Response) => {
        this.loading = false;
        let body = res.json();
        if (body !== null) {
          let length = body.length;
          for (let i = 0; i < length; i++) {
            let ats = new ATS(body[i]);
            ats.setupBackup(['parentId', 'type', 'title']);
            this.ats.push(ats);
          }
          return this.ats;
        } else
          return null;
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Запрашивает с сервера массив всех кодов АТС
   * @returns {Observable<R>}
   */
  fetchAllATSCodes(): Observable<ATSCode[]|null> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: 'getAllATSCodes'};
    this.loading = true;
    return this.$http.post(apiUrl, parameters, options)
      .map((res: Response) => {
        this.loading = false;
        let body = res.json();
        if (body !== null) {
          let length = body.length;
          for (let i = 0; i < length; i++) {
            let code = new ATSCode(body[i]);
            code.setupBackup(['sourceATSId', 'targetATSId', 'code']);
            this.codes.push(code);
          }
          return this.codes;
        } else
          return null;
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Запрашивает с сервера массив кодов АТС по идентификатору АТС
   * @id {number} - идентификатор АТС
   * @returns {Observable<R>}
   */
  fetchATSCodesByATSId(id: number): Observable<ATSCode[]|null> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: 'getATSCodesByATSId', data: { atsId: id }};
    this.loading = true;
    return this.$http.post(apiUrl, parameters, options)
      .map((res: Response) => {
        this.loading = false;
        let body = res.json();
        if (body !== null) {
          let codes = [];
          let length = body.length;
          for (let i = 0; i < length; i++) {
            let code = new ATSCode(body[i]);
            code.setupBackup(['sourceATSId', 'targetATSId', 'code']);
            codes.push(code);
          }
          return codes;
        } else
          return null;
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Добавление новогй АТС
   * @param ats {ATS} - добавляемая АТС
   * @returns {Observable<R>}
   */
  addATS(ats: ATS): Observable<ATS> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: 'addATS', data: { parentId: ats.parentId, type: ats.type, title: ats.title }};
    this.loading = true;
    return this.$http.post(apiUrl, parameters, options)
      .map((res: Response) => {
        this.loading = false;
        let body = res.json();
        let ats = new ATS(body);
        ats.setupBackup(['parentId', 'type', 'title']);
        this.ats.push(ats);
        return ats;
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Добавление нового кода АТС
   * @param ats {ATSCode} - добавляемый код АТС
   * @returns {Observable<R>}
   */
  addATSCode(code: ATSCode): Observable<ATSCode> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: 'addATSCode', data: { sourceATSId: code.sourceATSId, targetATSId: code.targetATSId, code: code.code }};
    this.loading = true;
    return this.$http.post(apiUrl, parameters, options)
      .map((res: Response) => {
        this.loading = false;
        let body = res.json();
        let code = new ATSCode(body);
        code.setupBackup(['sourceATSId', 'targetATSId', 'code']);
        this.codes.push(code);
        return code;
      })
      .take(1)
      .catch(this.handleError);
  };



  /**
   *
   * @param ats {ATS} - редактируемая АТС
   * @returns {Observable<R>}
   */
  editATS(ats: ATS): Observable<ATS> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: 'editATS', data: { id: ats.id, parentId: ats.parentId, type: ats.type, title: ats.title }};
    this.loading = true;
    return this.$http.post(apiUrl, parameters, options)
      .map((res: Response) => {
        this.loading = false;
        ats.setupBackup(['parentId', 'type', 'title']);
        ats.changed(false);
        return ats;
      })
      .take(1)
      .catch(this.handleError)
  };


  /**
   * Удаление кода выхода АТС
   * @param code {ATSCode} - удаляемый код выхода АТС
   * @returns {Observable<R>}
   */
  deleteATSCode(code: ATSCode): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: 'deleteATSCode', data: { atsCodeId: code.id }};
    this.loading = true;
    return this.$http.post(apiUrl, parameters, options)
      .map((res: Response) => {
        this.loading = false;
        let body = res.json();
        console.log(body);
        if (body === true) {
          let length = this.codes.length;
          for (let i = 0; i < length; i++) {
            if (this.codes[i].id === code.id) {
              this.codes.splice(i, 1);
              return true;
            }
          }
          return false;
        } else
          return false;
      })
      .take(1)
      .catch(this.handleError)
  };


  /**
   * Получение массива всех АТС
   * @returns {ATS[]}
   */
  getAllATS(): ATS[] {
    return this.ats;
  };


  /**
   * Получение АТС по идентификатору
   * @param id {number} - идентификатор АТС
   * @returns {any}
   */
  getATSById(id: number): ATS|null {
    let length = this.ats.length;
    for (let i = 0; i < length; i++) {
      if (this.ats[i].id === id)
        return this.ats[i];
    }
    return null;
  };


  /**
   * Проверка, выполняется ли загрузка
   * @returns {boolean}
   */
  isLoading(): boolean {
    return this.loading;
  };


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
