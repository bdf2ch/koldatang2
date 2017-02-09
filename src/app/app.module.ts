import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { KolenergoModule } from './kolenergo/kolenergo.module';
import { UiModule } from './ui/ui.module';

import { AppComponent } from './app.component';
import { $users } from './kolenergo/$users.service';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ByUserNamePipe } from './by-user-name.pipe';


const appRoutes: Routes = [
  { path: "users", component: UsersComponent },
  { path: "users/new", component: NewUserComponent },
  { path: "users/:id", component: EditUserComponent },
  { path: "", component: UsersComponent },
  { path: "**", redirectTo: "users" }
];


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NewUserComponent,
    EditUserComponent,
    ByUserNamePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    KolenergoModule,
    UiModule
  ],
  providers: [ $users ],
  bootstrap: [ AppComponent ]
})
export class AppModule  { }
