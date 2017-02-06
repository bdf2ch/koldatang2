import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { $users } from '../kolenergo/$users.service';
import { User } from '../models/User.model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: []
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User;

  constructor(private usersService: $users, private  router: Router) { };

  ngOnInit() {
    this.users = this.usersService.getAll();
  };

  selectUser(user: User) : void {
    this.selectedUser = user;
    this.router.navigate(['/user/' + user.id, user.id]);
    console.log("selected user = ", this.selectedUser);
  };

}
