import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { DivisionsComponent } from './divisions.component';
import { DivisionsService } from './divisions.service';


@NgModule({
  imports: [
    UiModule,
    FormsModule
  ],
  declarations: [
    DivisionsComponent
  ],
  providers: [
    DivisionsService
  ]
})
export class DivisionsModule {};
