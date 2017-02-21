export interface TreeItemConfig {
  key: string;
  parentKey: string;
  title: string;
  isRoot?: boolean;
};


export class TreeItem {
  key: string = "";
  parentKey: string = "";
  title: string = "";
  isRoot: boolean = false;
  isExpanded: boolean = false;
  children: TreeItem[] = [];

  constructor (config: TreeItemConfig) {
    this.key = config.key;
    this.parentKey = config.parentKey;
    this.title = config.title;
    if (config.isRoot)
      this.isRoot = config.isRoot;
  };
};
