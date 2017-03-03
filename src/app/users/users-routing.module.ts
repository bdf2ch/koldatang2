import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolveGuard } from './edit-user/resolve.guard';
import { EditUserCanDeactivateGuard } from './edit-user/can-deactivate.guard';

const routes: Routes = [
  {
    path: "users",
    component: UsersComponent,
    data: {
      extras: {
        title: "Пользователи"
      }
    },
    children: [
      {
        path: "",
        component: UserListComponent,
        data: {
          extras: {
            title: ""
          }
        }
      },
      {
        path: "new",
        component: NewUserComponent,
        data: {
          extras: {
            title: "Новый пользователь"
          }
        }
      },
      {
        path: ":id",
        component: EditUserComponent,
        resolve: {
          extras: EditUserResolveGuard
        },
        canDeactivate: [ EditUserCanDeactivateGuard ]
      }
    ]
  }
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
