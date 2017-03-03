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
  search = "";
  errorMessage: any;


  constructor(private $users: UsersService,
              private $route: ActivatedRoute,
              private $router: Router) {
  };


  ngOnInit() {
    if (this.$users.isInSearchMode() === false && this.$users.getAll().length === 0) {
      this.$users.fetch().subscribe();
    }
  };


  selectUser(user: User) : void {
    console.log("selected user = ", user);
    this.$router.navigate([user.id], {relativeTo: this.$route });
  };


  getUsers() {
    this.$users.fetch().subscribe();
  };


  loadMore(): void {
    this.$users.fetch().subscribe();
  };


  showLoadMoreButton(): boolean {
    return this.$users.isInSearchMode() === false && this.$users.getAll().length < this.$users.getTotal() ? true : false;
  };


  searchForUsers (value) {
    if (value.length >= 3) {
      this.$users.search().subscribe();
    } else if (value.length === 2 && this.$users.isInSearchMode() === true) {
      this.$users.fetch().subscribe();
    }
  };

}
