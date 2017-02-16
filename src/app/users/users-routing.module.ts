import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersService } from './users.service';

const routes:Routes = [
  {
    path: "",
    component: UsersComponent,
    data: {
      title: "Пользователи"
    },
    children: [
      {
        path: "users/new",
        component: NewUserComponent
      },
      {
        path: "users/:id",
        component: EditUserComponent,
        resolve: {
          user: UsersService
        }
      }
    ]
  }
  /*
  {
    path: "users",
    component: UsersComponent,
    data: {
      title: 'Пользователи+'
    }
  },
  */

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
