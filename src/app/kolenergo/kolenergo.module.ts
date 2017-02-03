import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { $users } from './$users.service';
import { $divisions } from './$divisions.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ $users, $divisions ]
})
export class KolenergoModule { };
