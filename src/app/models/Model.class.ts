export class Model {
  _backupData = {};
  _statusData = {
    isChanged: false,
    isSelected: false
  };

  /**
   *
   * @param fields
   */
  setupBackup(fields: string[] | null): void {
    if (fields !== null) {
      let length = fields.length;
      for (let i = 0; i < length; i++) {
        if (this[fields[i]] !== null) {
          this._backupData[fields[i]] = this[fields[i]];
        }
      }
    } else {
      for (let i in this._backupData) {
        if (this[i] !== null) {
          this._backupData[i] = this[i];
        }
      }
    }
  };


  /**
   *
   */
  restoreBackup(): void {
    for (let i in this._backupData) {
      console.log(i);
      this[i] = this._backupData[i];
    }
  };


  /**
   *
   * @param flag
   * @returns {boolean}
   */
  changed(flag: boolean | null): boolean {
    if (flag !== null)
      this._statusData.isChanged = flag;
    return this._statusData.isChanged;
  };

  selected(flag: boolean | null): boolean {
    if (flag !== null)
      this._statusData.isSelected = flag;
    return this._statusData.isSelected;
  };

};
