export class Status {


  constructor () {};

  changed(flag: boolean | null): boolean {
    if (flag !== null)
      this.isChanged = flag;
    return this.isChanged;
  };


};
