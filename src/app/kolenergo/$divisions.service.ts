import { Injectable } from '@angular/core';
import { Division, DivisionConfig } from '../models/Division.model';

@Injectable()
export class $divisions {
  divisions: Division[] = [];

  constructor() { };


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

}
