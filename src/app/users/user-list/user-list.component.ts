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
  selectedUser: User;
  search = "";
  errorMessage: any;


  constructor(private $users: UsersService,
              private $route: ActivatedRoute,
              private $router: Router) {
  };


  ngOnInit() {
    if (this.$route.snapshot.queryParams["search"] !== null) {
      this.search = this.$route.snapshot.queryParams["search"];
    }

    console.log("users length = ", this.$users.getAll().length);
    if (this.$users.getAll().length === 0) {
      console.log("length = ", this.$users.getAll().length);
      this.$users.fetch().subscribe();
    }
  };


  selectUser(user: User) : void {
    console.log("selected user = ", this.selectedUser);
    this.selectedUser = user;
    if (this.search !== "")
      this.$router.navigate([user.id, { search: this.search }], {relativeTo: this.$route });
    else
      this.$router.navigate([user.id], {relativeTo: this.$route });
  };


  getUsers() {
    this.$users.fetch().subscribe();
  };


  loadMore(): void {
    this.$users.fetch().subscribe();
  };


  showLoadMoreButton(): boolean {
    return this.$users.getTotal() > this.$users.getAll().length ? true : false;
  };


  searchForUsers (value) {
    console.log("value", value);
    if (value !== "" && value.length > 2) {
      this.$users.search(this.search).subscribe();
    } else {
      this.$users.fetch().subscribe();
    }
    //this.users = this.usersService.getAll();
  };

}
