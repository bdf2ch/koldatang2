export class Status {
  isChanged: boolean = false;
  isSelected: boolean = false;

  constructor () {};

  changed(flag: boolean | null): boolean {
    if (flag !== null)
      this.isChanged = flag;
    return this.isChanged;
  };


  selected(flag: boolean | null): boolean {
    if (flag !== null)
      this.isSelected = flag;
    return this.isSelected;
  };

};
