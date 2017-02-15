import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../../models/User.model';


@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: []
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedUser: User;
  search: string = "";
  errorMessage: any;


  constructor(
    private usersService: UsersService,
    private  router: Router
  ) {};


  ngOnInit() {
    this.getUsers();
  };


  selectUser(user: User) : void {
    this.selectedUser = user;
    this.router.navigate(['/users/', user.id]);
    console.log("selected user = ", this.selectedUser);
  };


  getUsers() {
    this.usersService.fetchAll()
      .subscribe(
        users => this.users = users,
        error =>  this.errorMessage = <any>error);
  };

}
