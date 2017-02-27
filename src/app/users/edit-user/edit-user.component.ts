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
    console.log(this.route);
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

    let divisionsTree = this.$trees.getById('divisions');
    if (divisionsTree !== null) {

    }

  };


  onSubmit(): void {
    this.submitted = true;
    console.log("form submit");
  };


  onCancel(): void {
    this.user = new User();
    this.submitted = false;
    this.router.navigate(["/users", { test: "test" }]);
  };


  openSelectDivisionModal () {
    this.$modals.open('edit-user-division');
  };


  selectDivision (item: TreeItem) {

  };
}
