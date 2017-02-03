import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { $users } from './kolenergo/$users.service';

const appRoutes: Routes = [
  { path: "users", component: AppComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ $users ],
  bootstrap: [AppComponent]
})
export class AppModule  { }
