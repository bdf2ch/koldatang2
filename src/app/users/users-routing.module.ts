import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes:Routes = [
  { path: "users", component: UsersComponent },
  { path: "users/new", component: NewUserComponent },
  { path: "users/:id", component: EditUserComponent }
];

@NgModule ({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule {};
