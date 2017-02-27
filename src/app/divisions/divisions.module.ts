import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { DivisionsComponent } from './divisions.component';
import { DivisionsService } from './divisions.service';
import { DivisionTitlePipe } from './division-title.pipe';


@NgModule({
  imports: [
    UiModule,
    CoreModule
  ],
  declarations: [
    DivisionsComponent,
    DivisionTitlePipe
  ],
  exports: [
    DivisionTitlePipe
  ],
  providers: [
    DivisionsService
  ]
})
export class DivisionsModule {};
