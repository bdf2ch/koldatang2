import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhonebookComponent } from './phonebook.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AtsComponent } from './ats/ats.component';
import { EditContactComponent } from "./edit-contact/edit-contact.component";


const routes: Routes = [
  {
    path: "phonebook",
    component: PhonebookComponent,
    data: {
      extras: {
        title: "Телефонный справочник"
      }
    },
    children: [
      {
        path: "",
        component: ContactListComponent,
        data: {
          extras: {
            title: ""
          }
        }
      },
      {
        path: "contacts/:id",
        component: EditContactComponent,
        data: {
          extras: {
            title: ""
          }
        }
      }
      /*
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
      */
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
export class PhonebookRoutingModule {};
