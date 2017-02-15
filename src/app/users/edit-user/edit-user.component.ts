import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../../models/User.model';
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


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private users: UsersService
  ) {};


  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    let cachedUser = this.users.getById(id);

    if (cachedUser === null) {
      this.users.fetchById(id)
        .subscribe((user: User) => {
          if (user !== null) {
            this.user = user;
            console.log(this.user);
          } else {
            this.user = new User();
            this.userNotFound = true;
          }
        });
    } else {
      this.user = cachedUser;
    }

    /*
    this.route.params
      //.switchMap((params: Params) => id = params["id"])
      //.switchMap((params: Params) => this.users.fetchById(+params["id"]))
      //.subscribe((user: User) => this.user = user);
      .subscribe(function (params: Params) {
        id = params["id"];
        console.log("id = ", id);

        let usr = this.users.getById(id);
        if (usr !== null)
          this.user = usr;
        else {
          this.user = this.users.fetchById(id);
        }
      });
      */
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
}
