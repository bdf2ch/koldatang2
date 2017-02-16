import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../../models/User.model';


@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: []
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User;
  search: string = "";
  errorMessage: any;


  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router) {
  };


  ngOnInit() {
    console.log("users length = ", this.usersService.getAll().length);
    if (this.usersService.getAll().length === 0) {
      console.log("length = ", this.usersService.getAll().length);
      this.usersService.fetch().subscribe();
    }
    this.users = this.usersService.getAll();
  };


  selectUser(user: User) : void {
    this.selectedUser = user;
    this.router.navigate(['./users/', user.id]);
    this.router.navigate([user.id], { relativeTo: this.route });
    console.log("selected user = ", this.selectedUser);
  };


  getUsers() {
    this.usersService.fetch()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any>error);
  };


  loadMore(): void {
    this.usersService.fetch().subscribe();
  };


  isAllUsersLoaded(): boolean {
    return this.usersService.getTotal() === this.usersService.getAll().length ? true : false;
  };

}
