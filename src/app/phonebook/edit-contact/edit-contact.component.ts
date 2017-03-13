import { Component, OnInit } from '@angular/core';
import { Contact } from "../../models/Contact.model";
import { Phone, PhoneConfig } from "../../models/Phone.model";
import { ModalService } from "../../ui/modal/modal.service";
import { ContactsService } from "../contacts.service";
import { TreeService } from "../../ui/tree/tree.service";
import { AtsService } from "../ats.service";
import { ATS } from "../../models/ATS.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contact: Contact = new Contact();
  phones: Phone[] = [];
  newPhone: Phone = new Phone();
  selectedPhone: Phone|null = null;

  constructor(private $route: ActivatedRoute,
              private $contacts: ContactsService,
              private $ats: AtsService,
              private $modals: ModalService,
              private $trees: TreeService) {
    this.newPhone.setupBackup(['atsId', 'number']);
  };

  ngOnInit() {
    this.$route.data
      .subscribe((data: { contact: {contact: Contact, title: string}}) => {
        if (data.contact.contact !== null) {
          this.contact = data.contact.contact;
          console.log("resolved conatct", this.contact);
        } else {
          this.contact = new Contact();
          //this.userNotFound = true;
        }
      });


    if (this.$ats.getAllATS().length === 0)
      this.$ats.fetchAllATS().subscribe(() => {
        this.populateATSTree();
      });
    else {
      let tree = this.$trees.getById('new-phone-ats-tree');
      if (tree.totalItemsCount() === 0)
        this.populateATSTree();
    }
  };


  /**
   * Заполняет деревао АТС
   */
  populateATSTree () {
    let tree = this.$trees.getById('new-phone-ats-tree');
    let length = this.$ats.getAllATS().length;
    for (let i = 0; i < length; i++) {
      let ats = this.$ats.getAllATS()[i];
      tree.addItem({
        key: ats.id.toString(),
        parentKey: ats.parentId.toString(),
        title: ats.title,
        isRoot: ats.parentId === 0 ? true : false
      });
    }
  };


  /**
   *
   * @param phone
   */
  selectPhone (phone: Phone) {
    this.selectedPhone = phone;
  };


  /**
   * Открывает модальное окно добавления нового контактного телефона
   */
  openNewPhoneModal() {
    this.$modals.open('new-phone');
  };


  /**
   * Закрывает модальное окно добавления нового контактного телефона
   * @param form
   */
  closeNewPhoneModal(form: any) {
    form.reset();
    this.newPhone.restoreBackup(['number']);
  };


  /**
   * Добавляет новый контактный телефон
   */
  addNewPhone () {
    this.$contacts.addContactPhone(this.newPhone).subscribe((phone: Phone) => {
      this.phones.push(phone);
      this.$modals.close();
    });
  };


  /**
   * Открывает модальное окно добавления нового контактного телефона
   */
  openEditPhoneModal() {
    this.$modals.open('edit-contact-phone');
  };


  /**
   * Закрывает модальное окно добавления нового контактного телефона
   * @param form
   */
  closeEditPhoneModal(form: any) {
    form.reset();
    this.newPhone.restoreBackup(['number']);
  };


  editPhone(): void {
    console.log('edit phone');
    this.$contacts.editContactPhone(this.selectedPhone).subscribe(() => {
      this.$modals.close();
    });
  };


  /**
   * Открывает модальное окно удаления контактного телефона
   */
  openDeletePhoneModal(): void {
    this.$modals.open('delete-contact-phone');
  };


  /**
   * Закрывает модальное окно удаления контактного телефона
   */
  closeDeletePhoneModal(): void {
    this.$modals.close();
  };


  /**
   * Удаляет выбранный контактный телефон и закрывает модальное окно
   */
  deletePhone() {
    this.$contacts.deleteContactPhone(this.selectedPhone).subscribe(() => {
      let length = this.phones.length;
      for (let i = 0; i < length; i++) {
        if (this.phones[i].id === this.selectedPhone.id)
          this.phones.splice(i, 1);
      }
      this.$modals.close();
    });
  };
};
