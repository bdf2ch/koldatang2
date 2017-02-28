import { Component, Input, OnInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { TreeComponent } from './tree.component';
import { TreeItem } from './tree-item';


@Component({
  selector: 'tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ["./tree-item.component.css"]
})
export class TreeItemComponent implements OnInit, OnChanges {
  @Input() items: TreeItem[] = [];
  @Input() tree: TreeComponent;
  @Input() style: string;


  constructor (private $element: ElementRef) {};


  ngOnInit () {
    //this.style = this.$element.nativeElement.classList.value;
    console.log(this.$element);
  };

  ngOnChanges (changes: SimpleChanges) {
    console.log(changes);
  };

};
