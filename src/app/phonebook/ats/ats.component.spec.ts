/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AtsComponent } from './ats.component';

describe('AtsComponent', () => {
  let component: AtsComponent;
  let fixture: ComponentFixture<AtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
