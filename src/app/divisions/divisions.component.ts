import { Component, OnInit } from '@angular/core';
import { DivisionsService } from './divisions.service';
import { TreeService } from '../ui/tree/tree.service';
import { ModalService } from '../ui/modal/modal.service';
import {Division, DivisionConfig} from "../models/Division.model";
import { TreeItem } from '../ui/tree/tree-item';
import { ApplicationService } from "../application.service";


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
              private $modals: ModalService,
              private $application: ApplicationService) {};


  ngOnInit() {
    //if (this.$divisions.getAll().length === 0) {
    //  this.$divisions.fetchAll().subscribe(
    //    (divisions) => {
    //      this.divisions = divisions;

      //})
    //}
    //his.$application.data.subscribe((data: { divisions: DivisionConfig }));
  };


  populateDivisionsTree() {
    let tree = this.$trees.getById('divisions');
    if (tree !== null && tree.totalItemsCount() === 0) {
      let length = this.$divisions.getAll().length;
      for (let i = 0; i < length; i++) {
        this.$trees.getById('divisions').addItem({
          key: this.$divisions.getAll()[i].id.toString(),
          parentKey: this.$divisions.getAll()[i].parentId.toString(),
          title: this.$divisions.getAll()[i].title,
          isRoot: this.$divisions.getAll()[i].parentId === 0 ? true : false
        });
      }
    }
  };



  selectDivision(item: TreeItem|null) {
    console.log(item);
    if (item !== null) {
      this.$divisions.select(parseInt(item.key));
      console.log("selected", this.$divisions.getSelected());
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
