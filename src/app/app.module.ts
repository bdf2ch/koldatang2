import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouterModule } from './app-router/app-router.module';
import { UiModule } from './ui/ui.module';
import { UsersModule } from './users/users.module';
import { DivisionsModule } from './divisions/divisions.module';

import { AppComponent } from './app.component';
import { CoreModule } from "./core/core.module";
import { ApplicationService } from './application.service';
import { PhonebookComponent } from './phonebook/phonebook.component';
import { AtsComponent } from './phonebook/ats/ats.component';
import { AuthComponent } from './auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    PhonebookComponent,
    PhonebookComponent,
    AtsComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    UsersModule,
    DivisionsModule,
    AppRouterModule,
    UiModule
  ],
  exports: [
    UiModule,
    CoreModule
  ],
  providers: [
    ApplicationService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {};
