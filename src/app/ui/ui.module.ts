import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ModalComponent, ModalContentComponent } from './modal/modal.component';
import { CoreModule } from "../core/core.module";
import { ModalService } from "./modal/modal.service";

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    SearchBoxComponent,
    ModalComponent,
    ModalContentComponent
  ],
  exports: [
    SearchBoxComponent,
    ModalComponent,
    ModalContentComponent
  ],
  providers: [
    ModalService
  ]
})
export class UiModule {};
