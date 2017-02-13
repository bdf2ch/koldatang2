import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { NewUserComponent } from '../users/new-user/new-user.component';
import { EditUserComponent } from '../users/edit-user/edit-user.component';
import { DivisionsComponent } from '../divisions/divisions.component';
import { PhonebookComponent } from '../phonebook/phonebook.component';

const routes:Routes = [
  { path: "users", component: UsersComponent },
  { path: "users/new", component: NewUserComponent },
  { path: "users/:id", component: EditUserComponent },
  { path: "divisions", component: DivisionsComponent },
  { path: "phonebook", component: PhonebookComponent },
  { path: "", component: UsersComponent },
  { path: "**", redirectTo: "users" }
];

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRouterModule {};
