import { Component, OnInit } from '@angular/core';
import { DivisionsService } from './divisions.service';
import { TreeService } from '../ui/tree/tree.service';
import { ModalService } from '../ui/modal/modal.service';
import { Division } from "../models/Division.model";
import { TreeItem } from '../ui/tree/tree-item';


@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.css']
})
export class DivisionsComponent implements OnInit {
  divisions: Division[] = [];
  selectedDivision: Division = new Division();


  constructor(private $divisions: DivisionsService,
              private $trees: TreeService,
              private $modals: ModalService) {};


  ngOnInit() {
    if (this.divisions.length === 0) {
      this.$divisions.fetchAll().subscribe(
        (divisions) => {
          this.divisions = divisions;
          let tree = this.$trees.getById("test");
          console.log("tree = ", tree);
          let length = this.divisions.length;
          for (let i = 0; i < length; i++) {
            this.$trees.getById("test").addItem({
              key: this.divisions[i].id.toString(),
              parentKey: this.divisions[i].parentId.toString(),
              title: this.divisions[i].title,
              isRoot: this.divisions[i].parentId === 0 ? true : false
            });
          }
      })
    };
  };


  select(item: TreeItem|null) {
    console.log(item);
    if (item !== null)
      this.$divisions.select(parseInt(item.key));
  };

}
