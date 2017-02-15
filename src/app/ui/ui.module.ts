import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './search-box/search-box.component';

@NgModule({
  declarations: [
    SearchBoxComponent
  ],
  exports: [
    SearchBoxComponent
  ]
})
export class UiModule {};
