import { Component, OnInit } from '@angular/core';
import { ATS } from "../../models/ATS.model";
import { ModalService } from "../../ui/modal/modal.service";
import { AtsService } from "../ats.service";
import { TreeService } from "../../ui/tree/tree.service";
import { ATSCode } from "../../models/ATSCode.model";

@Component({
  selector: 'app-ats',
  templateUrl: './ats.component.html',
  styleUrls: ['./ats.component.css']
})
export class AtsComponent implements OnInit {
  newATS: ATS = new ATS();
  selectedATS: ATS|null = null;
  newATSCode: ATSCode = new ATSCode();
  selectedATSCode: ATSCode|null = null;
  codes: ATSCode[] = [];


  constructor(private $modals: ModalService,
              private $ats: AtsService,
              private $trees: TreeService) {
    this.newATS.setupBackup(['parentId', 'type', 'title']);
    this.newATSCode.setupBackup(['sourceATSId', 'targetATSId', 'code']);
  };


  ngOnInit() {
    if (this.$ats.getAllATS().length === 0)
      this.$ats.fetchAllATS().subscribe((ats: ATS[]) => {
        this.populateATSTree();
        this.populateTargetATSTree();
      });
    else {
      let tree = this.$trees.getById('ats-tree');
      if (tree.totalItemsCount() === 0)
        this.populateATSTree();
    }
  };


  /**
   * Заполняет деревао АТС
   */
  populateATSTree () {
    let tree = this.$trees.getById('ats-tree');
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
   * Заполняет деревао АТС модального окна добавления новгого кода выхода
   */
  populateTargetATSTree () {
    let tree = this.$trees.getById('new-ats-code-tree');
    if (tree.totalItemsCount() === 0) {
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
    }
  };


  selectATS(item: any) {
    if (item !== null) {
      this.selectedATS = this.$ats.getATSById(parseInt(item.key));
      this.newATS.parentId = this.selectedATS.id;
      this.newATSCode.sourceATSId = this.selectedATS.id;
      this.$ats.fetchATSCodesByATSId(this.selectedATS.id).subscribe((codes: ATSCode[]) => {
        this.codes = codes;
      });
    } else {
      this.selectedATS = null;
      this.newATS.parentId = 0;
      this.newATSCode.sourceATSId = 0;
      this.codes = [];
    }
  };


  selectATSCode (code: ATSCode) {
    this.selectedATSCode = code;
  };


  selectTargetATS(item: any) {
    if (item !== null)
      this.newATSCode.targetATSId = parseInt(item.key);
  };


  /**
   * Открывает модальное окно добавления новой АТС
   */
  openNewATSModal(): void {
    this.$modals.open('new-ats');
  };


  /**
   * Закрывает модальное окно добавления нового кода выхода АТС
   * @param form {any} - форма добавления нового кода выхода АТС
   */
  closeNewATSModal(form: any) {
    console.log(form);
    form.reset();
    this.newATS.restoreBackup();
  };


  /**
   * Добавляет новую АТС, очищает форму и закрывает модальное окно
   */
  addNewATS(): void {
    this.$ats.addATS(this.newATS).subscribe((ats: ATS) => {
      this.$trees.getById('ats-tree').addItem({
        key: ats.id.toString(),
        parentKey: ats.parentId.toString(),
        title: ats.title,
        isRoot: ats.parentId === 0 ? true: false
      });
      this.$modals.close();
      //form.reset({
      //  title: this.newATS.title
      //});
    });
  };


  /**
   * Открывает модальное окно редактирование выбранной АТС
   */
  openEditATSModal () {
    this.$modals.open('edit-ats');
  };


  closeEditATSModal() {};


  editATS(form: any) {
    console.log('edit ats');
    this.$ats.editATS(this.selectedATS).subscribe((ats: ATS) => {
      let atsTreeItem = this.$trees.getById('ats-tree').getItemByKey(ats.id.toString());
      let targetAtsTreeItem = this.$trees.getById('new-ats-code-tree').getItemByKey(ats.id.toString());
      atsTreeItem.title = ats.title;
      targetAtsTreeItem.title = ats.title;
      form.reset({
        title: this.selectedATS.title
      });
      this.$modals.close();
    });
  };


  openNewATSCodeModal() {
    this.$modals.open('new-ats-code');

  };

  closeNewATSCodeModal(form: any) {
    form.reset();
    this.newATSCode.restoreBackup(['targetATSId', 'code']);
    this.$trees.getById('new-ats-code-tree').deselectItem();
    this.$trees.getById('new-ats-code-tree').collapseAll();
  };


  addNewATSCode () {
    this.$ats.addATSCode(this.newATSCode).subscribe((code: ATSCode) => {
      this.codes.push(code);
      this.$modals.close();
    });
  };


  /**
   * Открывает модальное окно удаления кода выхода АТС
   */
  openDeleteATSCodeModal () {
    this.$modals.open('delete-ats-code');
  };


  /**
   * Удаляет код выхода АТС
   */
  deleteATSCode () {
      this.$ats.deleteATSCode(this.selectedATSCode).subscribe(() => {
        this.$modals.close();
        let length = this.codes.length;
        for (let i = 0; i < length; i++) {
          if (this.codes[i].id === this.selectedATSCode.id) {
            this.selectedATSCode = null;
            this.codes.splice(i, 1);
          }
        }
      });
  };
}
