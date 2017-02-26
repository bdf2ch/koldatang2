import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { RouterModule, Routes } from '@angular/router';
//import { UsersComponent } from '../users/users/users.component';
//import { NewUserComponent } from '../users/new-user/new-user.component';
//import { EditUserComponent } from '../users/edit-user/edit-user.component';
import { DivisionsComponent } from '../divisions/divisions.component';
import { PhonebookComponent } from '../phonebook/phonebook.component';
import { AuthComponent } from '../auth/auth.component';

const routes:Routes = [
  { path: "divisions", component: DivisionsComponent, data: { extras: { title: "Структура организации" } } },
  { path: "phonebook", component: PhonebookComponent, data: { extras: { title: "Телефонный справочник" } } },
  { path: "auth", component: AuthComponent },
  { path: "", redirectTo: "/users", pathMatch: "full" },
  { path: "**", redirectTo: "/users" },
  /*
  {
    path: "users",
    loadChildren: "app/users/users.module#UsersModule"
  }
  */
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
