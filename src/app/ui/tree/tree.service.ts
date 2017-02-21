import { Injectable } from '@angular/core';
import { TreeComponent } from './tree.component';

@Injectable()
export class TreeService {
  private trees: TreeComponent[] = [];

  constructor() { }


  register(tree: TreeComponent): boolean {
    this.trees.push(tree);
    console.log("trees", this.trees);
    return true;
  };


  getById(id: string): TreeComponent|null {
    let length = this.trees.length;
    for (let i = 0; i < length; i++) {
      if (this.trees[i].id === id)
        return this.trees[i];
    }
    return null;
  };


}
