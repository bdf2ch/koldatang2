export class Backup {
  private instance = undefined;
  backup: {} = {};


  constructor(link) {
    this.instance = link;
    this.backup = {};
  };


  /**
   *
   * @param fields
   */
  setup(fields: any[]): void {
    let length: number = fields.length;
    for (var i = 0; i < length; i++) {
      //if ([fields[i]] !== undefined) {
        this.backup[i] = fields[i];
      //}
    }
  };


  restore(): void {
    for (let i in this.backup) {
      if (this[i] !== undefined)
        this[i] = this.backup[i];
    }
  };


};
