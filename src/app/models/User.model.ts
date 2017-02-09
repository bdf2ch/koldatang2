import { Backup } from './Backup.model';
import { Status } from './Status.model';
import { Model } from './Model.class';
//import '../decorators/@backupable';

/*
function backupable(target: any, key: string) {
  // значение свойства
  var _val = target[key];
  Object.defineProperty(target, "backup", {
    enumerable: false,
    configurable: true
  });

  //target[backup] = {};

  // геттер для свойства
  var getter = function () {
    console.log(`Get: ${key} => ${_val}`);
    return _val;
  };

  // сеттер для свойства
  var setter = function (newVal) {
    console.log(`Set: ${key} => ${newVal}`);
    _val = newVal;
  };

  // Удаляем то, что уже находится в поле
  if (delete target[key]) {

    // Создаем новое поле с геттером и сеттером
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }
};
*/



export interface UserConfig {
  readonly id: number;
  tab_id?: number;
  department_id?: number;
  division_id?: number;
  surname: string;
  name: string;
  fname: string;
  position?: string;
  email?: string;
  is_administrator?: boolean;
};


export class User extends Model {
  readonly id: number = 0;
  tabId: number = 0;
  departmentId: number = 0;
  divisionId: number = 0;
  surname: string = "";
  name: string = "";
  fname: string = "";
  position: string = "";
  email: string = "";
  isAdministrator: boolean = false;
  fio: string = "";
  search: string = "";

  constructor (config?: UserConfig) {
    super();

    if (config) {
      this.id = config.id;
      if (config.tab_id)
        this.tabId = config.tab_id;
      if (config.department_id)
        this.departmentId = config.department_id;
      if (config.division_id)
        this.divisionId = config.division_id;
      this.surname = config.surname;
      this.name = config.name;
      this.fname = config.fname;
      if (config.position)
        this.position = config.position;
      if (config.email)
        this.email = config.email;
      if (config.is_administrator)
        this.isAdministrator = config.is_administrator;
    }

    this.fio = this.surname + " " + this.name + " " + this.fname;
    this.search = this.surname.toLowerCase() + " " + this.name.toLowerCase() + " " + this.fname.toLowerCase() + " " + this.email;
  };
};
