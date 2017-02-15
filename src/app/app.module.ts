import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouterModule } from './app-router/app-router.module';
import { UiModule } from './ui/ui.module';
import { UsersModule } from './users/users.module';

import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { DivisionsComponent } from './divisions/divisions.component';
import { PhonebookComponent } from './phonebook/phonebook.component';
import {SearchBoxComponent} from "./ui/search-box/search-box.component";


@NgModule({
  declarations: [
    AppComponent,
    DivisionsComponent,
    PhonebookComponent,
    PhonebookComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    UsersModule,
    AppRouterModule,
    UiModule
  ],
  exports: [
    UiModule,
    CoreModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {};
