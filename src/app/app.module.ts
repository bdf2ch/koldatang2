import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouterModule } from './app-router/app-router.module';
import { KolenergoModule } from './kolenergo/kolenergo.module';
import { UiModule } from './ui/ui.module';

import { AppComponent } from './app.component';
import { $users } from './kolenergo/$users.service';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ByUserNamePipe } from './by-user-name.pipe';
import { CoreModule } from "./core/core.module";
import { DivisionsComponent } from './divisions/divisions.component';
import { PhonebookComponent } from './phonebook/phonebook.component';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NewUserComponent,
    EditUserComponent,
    ByUserNamePipe,
    DivisionsComponent,
    PhonebookComponent,
    PhonebookComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRouterModule,
    KolenergoModule,
    UiModule
  ],
  providers: [ $users ],
  bootstrap: [ AppComponent ]
})
export class AppModule  { }
