import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {
  @Input() id: string;

  constructor () {};
};
