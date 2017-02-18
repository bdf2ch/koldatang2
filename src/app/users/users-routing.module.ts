import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersService } from './users.service';
import { EditUserResolveGuard } from './edit-user/resolve.guard';

const routes:Routes = [
  {
    path: "users",
    component: UsersComponent,
    data: {
      extras: {
        title: "Пользователи",
        controls:
          `<a routerLink="/users/new">
            <span class="fa fa-plus" title="Добавить пользователя"></span>
           </a>`
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
