import { Model } from "./Model.class";


export class ATSCodeConfig {
  id: number;
  source_ats_id: number;
  target_ats_id: number;
  code: string;
};


export class ATSCode extends Model {
  readonly id: number = 0;
  sourceATSId: number = 0;
  targetATSId: number = 0;
  code: string = '';

  constructor (config?: ATSCodeConfig) {
    super();
    if (config) {
      this.id = config.id;
      this.sourceATSId = config.source_ats_id;
      this.targetATSId = config.target_ats_id;
      this.code = config.code;
    }
  };
};
