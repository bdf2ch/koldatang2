import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { UiModule } from '../ui/ui.module';
import { DivisionsModule } from '../divisions/divisions.module';
import { UsersModule } from '../users/users.module';
import { PhonebookRoutingModule } from './phonebook-routing.module';
import { PhonebookComponent } from './phonebook.component';
import { ContactsService } from './contacts.service';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SearchContactsPipe } from './search-contacts.pipe';
import { AtsComponent } from './ats/ats.component';
import { AtsService } from "./ats.service";
import { AtsTitlePipe } from './ats-title.pipe';
import { EditContactComponent } from './edit-contact/edit-contact.component';

@NgModule({
  imports: [
    CoreModule,
    UiModule,
    PhonebookRoutingModule,
    DivisionsModule,
    UsersModule
  ],
  declarations: [
    PhonebookComponent,
    ContactListComponent,
    SearchContactsPipe,
    SearchContactsPipe,
    AtsComponent,
    AtsTitlePipe,
    EditContactComponent
  ],
  exports: [
    CoreModule,
    AtsTitlePipe
  ],
  providers: [
    ContactsService,
    AtsService
  ],
})
export class PhonebookModule { }
