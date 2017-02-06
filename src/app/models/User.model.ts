import { Backup } from './Backup.model';
import { Status } from './Status.model';

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


export class User implements Backup, Status {
  readonly id: number = 0;
  tabId: number = 0;
  departmentId: number = 0;
  divisionId: number = 0;
  surname: string;
  name: string;
  fname: string;
  position: string;
  email: string;
  isAdministrator: boolean = false;


  constructor (config: UserConfig) {
    //super();
    this.id = config.id;
    this.surname = config.surname;
    this.name = config.name;
    this.fname = config.fname;

    if (config.tab_id)
      this.tabId = config.tab_id;
    if (config.department_id)
      this.departmentId = config.department_id;
    if (config.division_id)
      this.divisionId = config.division_id;
    if (config.position)
      this.position = config.position;
    if (config.email)
      this.email = config.email;
    if (config.is_administrator)
      this.isAdministrator = config.is_administrator;
  };
};
