import { Component, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: SearchBoxComponent, multi: true }
  ]
})
export class SearchBoxComponent implements OnInit, ControlValueAccessor {
  @Input()
  placeholder: string;


  constructor() { }


  ngOnInit() {};


  writeValue(value: any) {};


  registerOnChange(fn: any) {};


  registerOnTouched(fn: any) {};

}
