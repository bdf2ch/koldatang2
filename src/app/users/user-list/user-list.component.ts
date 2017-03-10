import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../../models/User.model';
import { DivisionsService } from '../../divisions/divisions.service';
import { ModalService } from "../../ui/modal/modal.service";
import { TreeService } from "../../ui/tree/tree.service";


@Component({
  selector: 'app-users',
  templateUrl: 'user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  errorMessage: any;
  usersLocalSearch: User[] = [];
  filerDivisionId: number = 0;


  constructor(private $route: ActivatedRoute,
              private $router: Router,
              private $users: UsersService,
              private $divisions: DivisionsService,
              private $modals: ModalService,
              private $trees: TreeService) {
  };


  ngOnInit() {
    if (this.$divisions.getAll().length === 0) {
      this.$divisions.fetchAll().subscribe(() => {
        if (this.$users.isInSearchMode() === false && this.$users.getAll().length === 0)
          this.$users.fetch().subscribe();
      });
    }
    if (this.$users.isInSearchMode() === false && this.$users.getAll().length === 0)
      this.$users.fetch().subscribe();
  };


  selectUser(user: User) : void {
    console.log("selected user = ", user);
    this.$router.navigate([user.id], {relativeTo: this.$route });
  };


  loadMore(): void {
    this.$users.fetch().subscribe();
  };


  showLoadMoreButton(): boolean {
    return this.$users.isInSearchMode() === false && this.filerDivisionId === 0 && this.$users.getAll().length < this.$users.getTotal() && this.$users.isLoading() === false ? true : false;
  };


  searchForUsers (value: string) {
    if (value.length >= 3) {
      if (this.filerDivisionId === 0) {
        this.$users.search().subscribe();
      }
    } else if (value.length === 2 && this.$users.isInSearchMode() === true) {
      if (this.filerDivisionId === 0)
        this.$users.fetch().subscribe();
    }
  };


  clearSearch() {
    if (this.$users.searchQuery.length >= 3) {
      if (this.filerDivisionId !== 0)
        this.$users.fetchByDivisionId(this.filerDivisionId).subscribe();
      else
        this.$users.fetch().subscribe();
    }
    this.$users.searchQuery = "";
  };


  openDivisionsFilterModal () {
    this.$modals.open('users-list-division-filter');
  };


  populateDivisionsTree() {
    console.log("populate tree");
    let tree = this.$trees.getById('users-list-division-filter-tree');
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


  selectFilterDivision() {
    this.filerDivisionId = parseInt(this.$trees.getById('users-list-division-filter-tree').getSelectedItem().key);
    this.$users.fetchByDivisionId(this.filerDivisionId).subscribe(() => {
      this.$modals.close();
    });
  };


  cancelFilterDivision () {
    this.filerDivisionId = 0;
    this.$trees.getById('users-list-division-filter-tree').deselectItem();
    this.$users.fetch().subscribe();
  };

}
