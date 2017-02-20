import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { User } from '../../models/User.model';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: SearchBoxComponent, multi: true }
  ]
})
export class SearchBoxComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Output() onSearch: EventEmitter<Observable<User[]>> = new EventEmitter();
  private loading: boolean = false;


  constructor(private http: Http) {};


  ngOnInit() {};


  writeValue(value: any) {};


  registerOnChange(fn: any) {};


  registerOnTouched(fn: any) {};


}
