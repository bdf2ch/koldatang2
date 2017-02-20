import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../../models/User.model';


@Component({
  selector: 'app-users',
  templateUrl: 'user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User;
  search: string = "";
  errorMessage: any;


  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router) {
  };


  ngOnInit() {
    if (this.route.snapshot.queryParams["search"] !== null) {
      this.search = this.route.snapshot.queryParams["search"];
    }

    console.log("users length = ", this.usersService.getAll().length);
    if (this.usersService.getAll().length === 0) {
      console.log("length = ", this.usersService.getAll().length);
      this.usersService.fetch().subscribe();
    }
    this.users = this.usersService.getAll();
  };


  selectUser(user: User) : void {
    console.log("selected user = ", this.selectedUser);
    this.selectedUser = user;
    if (this.search !== "")
      this.router.navigate([user.id, { search: this.search }], {relativeTo: this.route });
    else
      this.router.navigate([user.id], {relativeTo: this.route });
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


  searchForUsers (value) {
    console.log("value", value);
    if (value !== "" && value.length > 2) {
      this.usersService.search(this.search).subscribe();
    } else {
      this.usersService.fetch().subscribe();
    }
    this.users = this.usersService.getAll();
  };

}
