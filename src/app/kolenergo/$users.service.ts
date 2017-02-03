import { Injectable } from '@angular/core';
import { User, UserConfig } from '../models/User.model';


@Injectable()
export class $users {
  users: User[] = [];


  constructor() {};


  /**
   * Производит инициализацию массива пользователей
   * @param source
   * @returns {boolean}
   */
  init(source: UserConfig[]): boolean {
    var length = source.length;
    for (let i = 0; i < length; i++) {
      let user = new User(source[i]);
      this.users.push(user);
    }
    return true;
  };


  /**
   * Возвращает массив всех пользователей
   * @returns {User[]}
   */
  getAll(): User[] {
    return this.users;
  };


  /**
   * Поиск пользователя по идентификатору
   * @param id {number} - идентификатор пользователя
   * @returns {any}
   */
  getById(id: number): User|boolean {
    length = this.users.length;
    for (let i = 0; i < length; i++) {
      if (this.users[i].id === id)
        return this.users[i];
    }
    return false;
  };

}
