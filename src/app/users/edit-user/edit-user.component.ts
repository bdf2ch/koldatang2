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

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User = new User();
  userNotFound: boolean = false;
  submitted: boolean = false;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private users: UsersService,
              private $divisions: DivisionsService,
              private $modals: ModalService,
              private $trees: TreeService) {
  };


  ngOnInit() {
    console.log(this.user);
    let id = +this.route.snapshot.params['id'];
    this.route.data
      .subscribe((data: { extras: {user: User, title: string}}) => {
        if (data.extras.user !== null) {
          this.user = data.extras.user;
          console.log("resolved user", this.user);
        } else {
          this.user = new User();
          this.userNotFound = true;
        }
      });

    let editUserDivisionTree = this.$trees.getById('edit-user-division');
    if (editUserDivisionTree !== null) {
      console.log(editUserDivisionTree);
    }

  };


  onSubmit(): void {
    this.submitted = true;
    console.log("form submit");
  };


  cancel(): void {
    //this.user = new User();
    //this.submitted = false;
    //this.router.navigate(["/users", { test: "test" }]);
    this.user.restoreBackup();
  };


  openSelectDivisionModal () {
    this.$modals.open('edit-user-division');
  };


  closeSelectDivisionModal () {
    console.log(this.user._statusData);
  };


  selectDivision () {
    this.user.divisionId = this.$divisions.getById(parseInt(this.$trees.getById('edit-user-divisions-tree').getSelectedItem().key)).id;
    this.user.changed(true);
    console.log(this.user._statusData);
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
      //tree.selectItem("13");
      console.log(tree);
    }
  };
}
