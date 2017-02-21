import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ModalComponent, ModalContentComponent } from './modal/modal.component';
import { CoreModule } from "../core/core.module";
import { ModalService } from "./modal/modal.service";
import { TreeComponent } from './tree/tree.component';
import { TreeItemComponent } from './tree/tree-item.component';
import { TreeService } from "./tree/tree.service";


@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    SearchBoxComponent,
    ModalComponent,
    ModalContentComponent,
    TreeComponent,
    TreeItemComponent
  ],
  exports: [
    SearchBoxComponent,
    ModalComponent,
    ModalContentComponent,
    TreeComponent,
    TreeItemComponent
  ],
  providers: [
    ModalService,
    TreeService
  ]
})
export class UiModule {};
