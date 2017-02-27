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
  newDivision: Division = new Division();


  constructor(private $divisions: DivisionsService,
              private $trees: TreeService,
              private $modals: ModalService) {};


  ngOnInit() {
    if (this.$divisions.getAll().length === 0) {
      this.$divisions.fetchAll().subscribe(
        (divisions) => {
          this.divisions = divisions;
          let length = this.divisions.length;
          for (let i = 0; i < length; i++) {
            this.$trees.getById('divisions').addItem({
              key: this.divisions[i].id.toString(),
              parentKey: this.divisions[i].parentId.toString(),
              title: this.divisions[i].title,
              isRoot: this.divisions[i].parentId === 0 ? true : false
            });
          }
      })
    }
  };


  selectDivision(item: TreeItem|null) {
    console.log(item);
    if (item !== null) {
      this.$divisions.select(parseInt(item.key));
      console.log(this.$divisions.getSelected());
      this.newDivision.parentId = this.$divisions.getSelected().id;
    } else {
      this.$divisions.select(null);
      this.newDivision.parentId = 0;
    }
  };


  onCloseAddDivisionModal(form: any) {
    form.reset();
    this.newDivision.restoreBackup();
  };


  addDivision() {
    this.$divisions.add(this.newDivision).subscribe((division) => {
      this.$trees.getById('divisions').addItem({
        key: division.id.toString(),
        parentKey: division.parentId.toString(),
        title: division.title,
        isRoot: division.parentId === 0 ? true : false
      });
      this.newDivision.restoreBackup();
      this.$modals.close();
    });
  };


  onCloseEditDivisionModal (form: any) {
    console.log(form);
    if (form.dirty)
      form.reset();
    this.$divisions.getSelected().restoreBackup();
    //form.setValue({ title: this.$divisions.getSelected().title });
    form.controls.title.setValue(this.$divisions.getSelected().title);
  };


  editDivision() {
    this.$divisions.edit(this.$divisions.getSelected()).subscribe((division) => {
      let selectedDivision = this.$trees.getById('divisions').getItemByKey(division.id.toString());
      selectedDivision.title = division.title;
      this.$modals.close();
    });
  };
}
