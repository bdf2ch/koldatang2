import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeService } from './tree.service';
import { TreeItem, TreeItemConfig } from './tree-item';


@Component({
  selector: 'tree-item',
  template:
    `<div class="tree-item" *ngFor="let child of items" [ngClass]="{'with-children': child.children.length > 0, 'expanded': child.isExpanded === true}">
      <div class="item-details" [ngClass]="{'expanded': child.isExpanded === true, 'with-children': child.children.length > 0}">
      <div class="item-expander">
          <i class="fa fa-chevron-down" 
             *ngIf="child.children.length > 0 && child.isExpanded === false" 
             (click)="tree.expandItem(child.key)"></i>
          <i class="fa fa-chevron-up" 
             *ngIf="child.isExpanded === true" 
             (click)="tree.collapseItem(child.key)"></i>
        </div>
        <div class="item-title">{{ child.title }}</div>        
      </div>
      <tree-item [tree]="tree" [items]="child.children" *ngIf="child.isExpanded === true"></tree-item>
    </div>`,
  styleUrls: [
    "./tree-item.component.css"
  ]
})
export class TreeItemComponent implements OnInit {
  @Input() items: TreeItem[] = [];
  @Input() tree: TreeComponent;


  ngOnInit () {
  };

};


@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @Input() id:string;
  @Output() onSelect: EventEmitter<TreeItem|null> = new EventEmitter<TreeItem|null>();
  private tree: TreeComponent;
  private root: TreeItem[] = [];
  private stack: TreeItem[] = [];


  constructor(private $tree:TreeService) {};


  ngOnInit() {
    if (this.id === null || this.id === undefined || this.id === "") {
      console.error("no id specified");
      return;
    }
    this.tree = this;
    this.$tree.register(this);
  };


  /**
   * Поиск элемента дерева по идентификатору
   * @param key {string} - идентификатор элемента дерева
   * @returns {TreeItem|null}
   */
  getItemByKey(key: string): TreeItem|null {
    let length = this.stack.length;
    for (let i = 0; i < length; i++) {
      if (this.stack[i].key === key)
        return this.stack[i];
    }
    return null;
  };


  /**
   * Разворачивание элемента дерева
   * @param key {string} - идентификатор элемента дерева
   * @returns {boolean}
   */
  expandItem(key: string): boolean {
    console.log("expand");
    let length = this.stack.length;
    for (let i = 0; i < length; i++) {
      if (this.stack[i].key === key) {
        console.log(key + " found");
        this.stack[i].isExpanded = true;
        return true;
      }
    }
    return false;
  };


  /**
   * Сворачивание элемента дерева
   * @param key {string} - идентификатор элемента дерева
   * @returns {boolean}
   */
  collapseItem(key: string): boolean {
    let length = this.stack.length;
    for (let i = 0; i < length; i++) {
      if (this.stack[i].key === key) {
        this.stack[i].isExpanded = false;
        return true;
      }
    }
    return false;
  };


  /**
   * Добавление элемента дерева
   * @param config {TreeItemConfig} - параметры добавляемого элемента дерева
   */
  addItem(config: TreeItemConfig) {
    let item = new TreeItem(config);
    if (item.parentKey !== "") {
      let parent = this.getItemByKey(item.parentKey);
      if (parent !== null)
        parent.children.push(item);
    }
    if (item.isRoot === true)
      this.root.push(item);
    this.stack.push(item);
  };


  /**
   *
   * @param key
   */
  selectItem(key: string): void {
    let length = this.stack.length;
    let item = null;
    for (let i = 0; i < length; i++) {
      if (this.stack[i].key === key)
        this.onSelect.emit(this.stack[i]);
    }
  };

};
