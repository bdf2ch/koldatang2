import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { TreeService } from './tree.service';
import { TreeItem, TreeItemConfig } from './tree-item';
import {Observable} from "rxjs";


@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @Input() id:string;
  @Input() expandOnSelect: boolean;
  @Input() collapseOnDeselect: boolean;
  @Output() onInit: EventEmitter<TreeComponent> = new EventEmitter<TreeComponent>();
  @Output() onSelect: EventEmitter<TreeItem|null> = new EventEmitter<TreeItem|null>();
  private tree: TreeComponent;
  private root: TreeItem[] = [];
  private stack: TreeItem[] = [];
  private selected: TreeItem|null = null;
  private style: string = "";


  constructor(private $trees:TreeService,
              private $element: ElementRef) {
    //this.items = Observable.of(this.stack);
  };


  ngOnInit() {
    console.log(this.$element);
    if (this.id === null || this.id === undefined || this.id === "") {
      console.error("no id specified");
      return;
    }
    if (this.expandOnSelect === null || this.expandOnSelect === undefined || typeof this.expandOnSelect !== "boolean")
      this.expandOnSelect = false;
    this.tree = this;

    this.style = this.$element.nativeElement.classList.value;

    let tree = this.$trees.getById(this.id);
    if (tree === null)
      this.$trees.register(this);
    else {
      this.stack = tree.stack;
      this.root = tree.root;
      this.selected = tree.selected;
    }
    this.onInit.emit(this);
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
   * Возвращает выбранный элемент дерева
   * @returns {TreeItem|null}
   */
  getSelectedItem(): TreeItem|null {
    return this.selected;
  };


  /**
   * Разворачивание элемента дерева
   * @param key {string} - идентификатор элемента дерева
   * @returns {boolean}
   */
  expandItem(key: string): boolean {
    let length = this.stack.length;
    for (let i = 0; i < length; i++) {
      if (this.stack[i].key === key) {
        this.stack[i].isExpanded = true;
        return true;
      }
    }
    return false;
  };


  expandAll(): void {
    let length = this.root.length;
    for (let i = 0; i < length; i++)
      this.stack[i].isExpanded = true;
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


  collapseAll(): void {
    let length = this.stack.length;
    for (let i = 0; i < length; i++)
      this.stack[i].isExpanded = false;
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
   * Выбор элемента дерева
   * @param key {string} - идентификатор элемента
   */
  selectItem(key: string): void {
    let length = this.stack.length;
    for (let i = 0; i < length; i++) {
      if (this.stack[i].key === key) {
        if (this.stack[i].isSelected === true) {
          if (this.stack[i].isExpanded === true && this.collapseOnDeselect === true)
            this.stack[i].isExpanded = false;
          this.stack[i].isSelected = false;
          this.selected = null;
        } else {
          this.stack[i].isSelected = true;
          this.selected = this.stack[i];
          if (this.stack[i].children.length > 0 && this.expandOnSelect === true)
            this.stack[i].isExpanded = true;
        }
      } else
        this.stack[i].isSelected = false;
    }
    console.log("selected = ", this.selected);
    this.onSelect.emit(this.selected);
  };


  deselectItem(): void {
    if (this.selected !== null)
      this.selected.isSelected = false;
    this.selected = null;
  };


  /**
   * Возвращает количество элемелемнтов дерева
   * @returns {number}
   */
  totalItemsCount(): number {
    return this.stack.length;
  };


};
