import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Contact } from "../models/Contact.model";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {Phone} from "../models/Phone.model";

const apiUrl = '/assets/serverside/api.php';

@Injectable()
export class ContactsService {
  contacts: Contact[] = [];
  searchQuery: string = "";
  loading: boolean = false;
  inSearchMode: boolean = false;


  constructor( private $http: Http) {};


  /**
   * Запрашивает с сервера информацию о контакте по идентификатору
   * @param id {number} - идентификатор контакта
   * @returns {Observable<R>}
   */
  fetchById(id: number): Observable<Contact|null> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: 'getContactById', data: { contactId: id}};
    this.inSearchMode = false;
    this.loading = true;

    return this.$http.post(apiUrl, parameters, options)
      .map((res: Response) => {
        this.loading = false;
        let body = res.json();
        if (body !== null) {
          let contact = new Contact(body.contact);
          contact.setupBackup(["divisionId", "surname", "name", "fname", "position", "email"]);
          let length = body.phones.length;
          let phones: Phone[] = [];
          for (let i = 0; i < length; i++) {
            let phone = new Phone(body.phones[i]);
            phone.setupBackup(['atsId', 'number']);
            phones.push(phone);
          }
          let result = {
            contact: contact,
            phones: phones
          };
          return result;
        } else {
          return null;
        }
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Запрашивает с сервера список контактов по идентификатору структурного подразделения
   * @param id {number} - идентификатор структурного подразделения
   * @returns {Observable<T>}
   */
  fetchByDivisionId(id: number): Observable<Contact[]|null> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: "getContactsByDivisionId", data: { divisionId: id } };
    this.loading = true;
    this.inSearchMode = false;

    return this.$http.post(apiUrl, parameters, options)
      .map((res: Response) => {
        let body = res.json();
        if (body !== null) {
          this.contacts = [];
          let length = body.length;
          for (let i = 0; i < length; i++) {
            let contact = new Contact(body[i]);
            contact.setupBackup(["divisionId", "surname", "name", "fname", "position", "email", "photo"]);
            this.contacts.push(contact);
          }
          console.log(this.contacts);
        } else
          return null;
        this.loading = false;
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Запрашивает контакты с сервера в соответствии с условиями поиска
   * @returns {Observable<R>}
   */
  search(): Observable<Contact[]>|null {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let params = { action: "searchContacts", data: { search: this.searchQuery } };
    this.inSearchMode = true;
    this.loading = true;

    return this.$http.post(apiUrl, params, options)
      .map((res: Response|null) => {
          this.loading = false;
          let body = res.json();
          if (body !== null) {
            let length = body.length;
            this.contacts.splice(0, this.contacts.length);
            for (let i = 0; i < length; i++) {
              let user = new Contact(body[i]);
              user.setupBackup(["divisionId", "surname", "name", "fname", "position", "email"]);
              this.contacts.push(user);
              this.loading = false;
            }
          } else
            return null;
      })
      .take(1)
      .catch(this.handleError);
  };


  editContact(contact: Contact): Observable<Contact> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let params = {
      action: "editContact",
      data: {
        contactId: contact.id,
        divisionId: contact.divisionId,
        surname: contact.surname,
        name: contact.name,
        fname: contact.fname,
        position: contact.position,
        email: contact.email,
        mobile: contact.mobile }
    };
    this.loading = true;

    return this.$http.post(apiUrl, params, options)
      .map((res: Response|null) => {
        this.loading = false;
        let body = res.json();
        if (body !== null) {
          contact.setupBackup(['divisionId', 'surname', 'name', 'fname', 'position', 'email', 'mobile']);
          contact.changed(false);
          this.loading = false;
        } else
          return null;
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   *
   * @param phone {Phone} - добавляемый телефон
   * @returns {Observable<R>}
   */
  addContactPhone(phone: Phone): Observable<Phone> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let params = { action: "addContactPhone", data: { contactId: phone.contactId, atsId: phone.atsId, number: phone.number }};
    this.loading = true;

    return this.$http.post(apiUrl, params, options)
      .map((res: Response) => {
        this.loading = false;
        let body = res.json();
        let phone = new Phone(body);
        phone.setupBackup(['atsId', 'number']);
        let contact = this.getById(phone.contactId);
        if (contact !== null)
          contact.phones.push(phone);
        return phone;
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Изменение контактного телефона
   * @param phone {Phone} - редактируемый контактный телефон телефон
   * @returns {Observable<R>}
   */
  editContactPhone(phone: Phone): Observable<Phone> {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let params = { action: "editContactPhone", data: { phoneId: phone.id, atsId: phone.atsId, number: phone.number }};
    this.loading = true;

    return this.$http.post(apiUrl, params, options)
      .map((res: Response) => {
        this.loading = false;
        phone.setupBackup(['atsId', 'number']);
        phone.changed(false);
        return phone;
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Удаление контактного телефона
   * @param phone {Phone} - удаляемый контактный телефон
   * @returns {Observable<boolean>}
   */
  deleteContactPhone(phone: Phone): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: 'deleteContactPhone', data: { phoneId: phone.id }};
    this.loading = true;
    return this.$http.post(apiUrl, parameters, options)
      .map((res: Response) => {
        this.loading = false;
        let body = res.json();
        console.log(body);
        if (body === true) {
          let contact = this.getById(phone.contactId);
          if (contact !== null) {
            let length = contact.phones.length;
            for (let i = 0; i < length; i++) {
              if (contact.phones[i].id === phone.id) {
                contact.phones.splice(i, 1);
                return true;
              }
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
   *
   * @returns {Contact[]}
   */
  getAll(): Contact[] {
    return this.contacts;
  };


  /**
   *
   * @param id
   * @returns {any}
   */
  getById(id: number): Contact|null {
    let length = this.contacts.length;
    for (let i = 0; i < length; i++) {
      if (this.contacts[i].id === id)
        return this.contacts[i];
    }
    return null;
  };


  clear(): void {
    this.contacts.splice(0, this.contacts.length);
    this.inSearchMode = false;
  };


  isInSearchMode(): boolean {
    return this.inSearchMode;
  };


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
