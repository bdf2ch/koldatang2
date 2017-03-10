import { Component, OnInit } from '@angular/core';
import { DivisionsService } from '../../divisions/divisions.service';
import { ContactsService } from '../contacts.service';
import { ModalService } from '../../ui/modal/modal.service';
import { TreeService } from '../../ui/tree/tree.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  filterDivisionId: number = 0;


  constructor(private $contacts: ContactsService,
              private $divisions: DivisionsService,
              private $trees: TreeService,
              private $modals: ModalService) {};

  ngOnInit() {
    if (this.$divisions.getAll().length === 0)
      this.$divisions.fetchAll().subscribe(() => {
        this.populateDivisionsTree();
      });
  };


  populateDivisionsTree() {
    console.log("populate tree");
    let tree = this.$trees.getById('contacts-list-division-tree');
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


  selectDivision(item: any): void {
    this.filterDivisionId = parseInt(item.key);
    this.$contacts.fetchByDivisionId(this.filterDivisionId).subscribe();
  };


  searchForContacts (value: string) {
    if (value.length >= 3) {
      if (this.filterDivisionId === 0) {
        this.$contacts.search().subscribe();
      }
    } else if (value.length === 2 && this.$contacts.isInSearchMode() === true) {
      if (this.filterDivisionId === 0)
        this.$contacts.clear();
    }
  };


  clearSearch() {
    if (this.$contacts.searchQuery.length >= 3) {
      if (this.filterDivisionId !== 0)
        //this.$contacts.fetchByDivisionId(this.filterDivisionId).subscribe();
        this.$contacts.fetchByDivisionId(this.filterDivisionId).subscribe();
      else
        this.$contacts.clear();
    }
    this.$contacts.searchQuery = "";
  };


  cancelFilterDivision () {
    this.filterDivisionId = 0;
    this.$trees.getById('contacts-list-division-tree').deselectItem();
    this.$contacts.searchQuery = '';
    this.$contacts.clear();
  };

}
