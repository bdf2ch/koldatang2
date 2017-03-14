import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Contact } from "../../models/Contact.model";
import { Phone, PhoneConfig } from "../../models/Phone.model";
import { ModalService } from "../../ui/modal/modal.service";
import { ContactsService } from "../contacts.service";
import { TreeService } from "../../ui/tree/tree.service";
import { AtsService } from "../ats.service";
import { ATS } from "../../models/ATS.model";
import { ActivatedRoute } from "@angular/router";
import { DivisionsService } from "../../divisions/divisions.service";

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit, AfterViewInit {
  contact: Contact = new Contact();
  phones: Phone[] = [];
  newPhone: Phone = new Phone();
  selectedPhone: Phone|null = null;
  form: any = null;
  contactNotFound: boolean = false;

  constructor(private $route: ActivatedRoute,
              private $contacts: ContactsService,
              private $divisions: DivisionsService,
              private $ats: AtsService,
              private $modals: ModalService,
              private $trees: TreeService) {
    this.newPhone.setupBackup(['atsId', 'number']);
  };

  ngOnInit() {
    this.$route.data
      .subscribe((data: { contact: {contact: Contact, phones: any[]}}) => {
        if (data.contact.contact !== null) {
          console.log(data);
          this.contact = data.contact.contact;
          this.phones = data.contact.phones;
        } else {
          this.contact = new Contact();
          this.contactNotFound = true;
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

    if (this.$divisions.getAll().length === 0)
      this.$divisions.fetchAll().subscribe(() => {
        this.populateDivisionsTree();
      });
    else {
      let tree = this.$trees.getById('edit-contact-divisions-tree');
      if (tree.totalItemsCount() === 0)
        this.populateDivisionsTree();
    }
  };

  ngAfterViewInit() {
    this.populateDivisionsTree();
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


  populateDivisionsTree() {
    console.log("populate tree");
    let tree = this.$trees.getById('edit-contact-divisions-tree');
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


  /**
   * Открывает модальное окно выбора структурного подразделения контакта
   */
  openSelectDivisionModal(form: any): void {
    this.form = form;
    this.$modals.open('edit-contact-division');
  };


  /**
   * Закрывает модальное окно выбора структурного подразделения контакта
   */
  closeSelectDivisionModal(): void {
    let tree = this.$trees.getById('edit-contact-divisions-tree');
    tree.deselectItem();
  };


  selectDivision(item: any): void {
    console.log("select division event", item);
    console.log("select division selected item", this.$trees.getById('edit-contact-divisions-tree').getSelectedItem());
    this.form.form.controls.surname.markAsDirty();
    this.contact.changed(true);
    if (item !== null)
      this.contact.divisionId = parseInt(item.key);
    //this.$modals.close(true);
  };


  cancel(form: any): void {
    form.reset({
      name: this.contact.name,
      fname: this.contact.fname,
      surname: this.contact.surname,
      email: this.contact.email,
      mobile: this.contact.mobile,
      position: this.contact.position
    });
    this.contact.restoreBackup();
  };


  submit(form: any): void {
    this.$contacts.editContact(this.contact).subscribe(() => {
      form.reset({
        name: this.contact.name,
        fname: this.contact.fname,
        surname: this.contact.surname,
        email: this.contact.email,
        mobile: this.contact.mobile,
        position: this.contact.position
      });
    });
  };


  /**
   *
   * @param phone
   */
  selectPhone (phone: Phone) {
    if (this.selectedPhone !== phone)
      this.selectedPhone = phone;
    else
      this.selectedPhone = null;
  };


  /**
   * Открывает модальное окно добавления нового контактного телефона
   */
  openNewPhoneModal() {
    this.$modals.open('new-contact-phone');
  };


  /**
   * Закрывает модальное окно добавления нового контактного телефона
   * @param form
   */
  closeNewPhoneModal(form: any) {
    form.reset();
    this.newPhone.restoreBackup(['number']);
  };


  selectNewPhoneATS(item: any): void {
    if (item !== null)
      this.newPhone.atsId = parseInt(item.key);
    else
      this.newPhone.atsId = 0;
  };


  /**
   * Добавляет новый контактный телефон
   */
  addNewPhone () {
    this.newPhone.contactId = this.contact.id;
    this.$contacts.addContactPhone(this.newPhone).subscribe((phone: Phone) => {
      this.phones.push(phone);
      this.$trees.getById('new-phone-ats-tree').deselectItem();
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
        if (this.phones[i].id === this.selectedPhone.id) {
          this.phones.splice(i, 1);
          length = this.phones.length;
        }
      }
      this.selectedPhone = null;
      this.$modals.close();
    });
  };
};
