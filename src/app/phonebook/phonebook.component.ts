import { Component, OnInit } from '@angular/core';
import {ModalService} from "../ui/modal/modal.service";

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css']
})
export class PhonebookComponent implements OnInit {

  constructor(private modals: ModalService) { }

  ngOnInit() {
  }

  onModalOpen() {
    console.log("modal opened");
  };

  openModal() {
    this.modals.open("test");
  };

  closeModal() {
    this.modals.close();
  };

  onModalClose() {
    console.log("modal closed");
  };
}
