export interface DivisionConfig {
  id: number;
  parent_id: number;
  title: string;
  is_department?: boolean;
};


export class Division {
  readonly id: number = 0;
  parentId: number = 0;
  title: string;
  isDepartment: boolean = false;

  constructor (config: DivisionConfig) {
    this.id = config.id;
    this.parentId = config.parent_id;
    this.title = config.title;
    if (config.is_department)
      this.isDepartment = config.is_department;
  };

};