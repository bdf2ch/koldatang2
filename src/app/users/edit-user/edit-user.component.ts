import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../users.service';
import { DivisionsService } from '../../divisions/divisions.service';
import { User } from '../../models/User.model';
import { TreeItem } from '../../ui/tree/tree-item';
import { ModalService } from '../../ui/modal/modal.service';
import { TreeService } from '../../ui/tree/tree.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User = new User();
  userNotFound: boolean = false;
  form: any;


  constructor(private $router: Router,
              private $route: ActivatedRoute,
              private $users: UsersService,
              private $divisions: DivisionsService,
              private $modals: ModalService,
              private $trees: TreeService) {
  };


  ngOnInit() {
    console.log(this.user);
    let id = +this.$route.snapshot.params['id'];
    this.$route.data
      .subscribe((data: { extras: {user: User, title: string}}) => {
        if (data.extras.user !== null) {
          this.user = data.extras.user;
          console.log("resolved user", this.user);
        } else {
          this.user = new User();
          this.userNotFound = true;
        }
      });

    if (this.$divisions.getAll().length === 0) {
      this.$divisions.fetchAll().subscribe(() => {
        console.log("populate tree");
        let tree = this.$trees.getById('edit-user-divisions-tree');
        if (tree.totalItemsCount() === 0) {
          let length = this.$divisions.getAll().length;
          for (let i = 0; i < length; i++) {
            tree.addItem({
              key: this.$divisions.getAll()[i].id.toString(),
              parentKey: this.$divisions.getAll()[i].parentId.toString(),
              title: this.$divisions.getAll()[i].title,
              isRoot: this.$divisions.getAll()[i].parentId === 0 ? true : false,
              isExpanded: this.$divisions.getAll()[i].id === 13 || this.$divisions.getAll()[i].id === 16 ? true : false
            });
          }
          console.log(tree);
        }
      });
    }

  };


  submit(): void {
    console.log("form submit");
    //this.user.changed(false);
    //this.$modals.close();
    this.$users.edit(this.user).subscribe((user: User) => {
      this.form.reset({
        name: this.user.name,
        fname: this.user.fname,
        surname: this.user.surname,
        email: this.user.email,
        position: this.user.position,
        tab_id: this.user.tabId,
        active_directory_account: this.user.activeDirectoryAccount
      });
    });
  };


  cancel(form: any): void {
    console.log(form);
    form.reset({
      name: this.user.name,
      fname: this.user.fname,
      surname: this.user.surname,
      email: this.user.email,
      position: this.user.position,
      tab_id: this.user.tabId,
      active_directory_account: this.user.activeDirectoryAccount
    });
    if (this.$trees.getById('edit-user-divisions-tree').getSelectedItem() !== null)
      this.$trees.getById('edit-user-divisions-tree').deselectItem();
    this.user.restoreBackup();
    this.user.changed(false);
    console.log(this.user);
  };


  openSelectDivisionModal(form: any): void {
    this.form = form;
    this.$modals.open('edit-user-division');
  };


  closeSelectDivisionModal(): void {
    console.log("close modal callback");
    this.form.form.controls.surname.markAsPristine();
    this.user.restoreBackup(['divisionId']);
    this.$trees.getById('edit-user-divisions-tree').deselectItem();
  };


  selectDivision(item: any): void {
    console.log("select division event", item);
    console.log("select division selected item", this.$trees.getById('edit-user-divisions-tree').getSelectedItem());
    this.form.form.controls.surname.markAsDirty();
    this.user.changed(true);
    if (item !== null)
      this.user.divisionId = parseInt(item.key);
    //this.$modals.close(true);
  };


  populateDivisionsTree() {
    console.log("populate tree");
    let tree = this.$trees.getById('edit-user-divisions-tree');
    if (tree.totalItemsCount() === 0) {
      let length = this.$divisions.getAll().length;
      for (let i = 0; i < length; i++) {
        tree.addItem({
          key: this.$divisions.getAll()[i].id.toString(),
          parentKey: this.$divisions.getAll()[i].parentId.toString(),
          title: this.$divisions.getAll()[i].title,
          isRoot: this.$divisions.getAll()[i].parentId === 0 ? true : false,
          isExpanded: this.$divisions.getAll()[i].id === 13 || this.$divisions.getAll()[i].id === 16 ? true : false
        });
      }
      console.log(tree);
    }
  };


  openConfirmChangesModal(): void {
    this.$modals.open('edit-user-confirm-changes');
  };


  closeConfirmChangesModal(): void {

  };


  confirmChanges(): void {
    this.submit();
  };


  cancelChanges(): void {
    console.log(this.form);
    this.cancel(this.form);
    this.$modals.close(true);
  };
}
