import { Model } from "./Model.class";


export interface ATSConfig {
  id: number;
  parent_id: number;
  type: number;
  title: string;
};


export class ATS extends Model {
  readonly id: number = 0;
  parentId: number = 0;
  type: number = 1;
  title: string = '';

  constructor (config?: ATSConfig) {
    super();
    if (config) {
      this.id = config.id;
      this.parentId = config.parent_id;
      this.type = config.type;
      this.title = config.title;
    }
  };
};
