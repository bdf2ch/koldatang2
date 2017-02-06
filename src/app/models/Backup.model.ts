export class Backup {
  backup: {} = {};


  constructor() {
    this.backup = {};
  };


  /**
   *
   * @param fields
   */
  setup(fields: string[]): void {
    let length: number = fields.length;
    for (var i = 0; i < length; i++) {
      if (this[fields[i]] !== undefined) {
        this.backup[fields[i]] = this[fields[i]];
      }
    }
  };


  restore(): void {
    for (let i in this.backup) {
      if (this[i] !== undefined)
        this[i] = this.backup[i];
    }
  };


};
