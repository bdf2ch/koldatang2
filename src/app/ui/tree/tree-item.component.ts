import { Component, Input, OnInit } from '@angular/core';
import { TreeComponent } from './tree.component';
import { TreeItem } from './tree-item';


@Component({
  selector: 'tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ["./tree-item.component.css"]
})
export class TreeItemComponent implements OnInit {
  @Input() items: TreeItem[] = [];
  @Input() tree: TreeComponent;
  @Input() style: string;


  constructor () {};


  ngOnInit () {};

};
