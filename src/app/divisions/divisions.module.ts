import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';
import { UiModule } from '../ui/ui.module';
import { DivisionsComponent } from './divisions.component';
import { DivisionsService } from './divisions.service';


@NgModule({
  imports: [
    UiModule,
    CoreModule
  ],
  declarations: [
    DivisionsComponent
  ],
  providers: [
    DivisionsService
  ]
})
export class DivisionsModule {};
