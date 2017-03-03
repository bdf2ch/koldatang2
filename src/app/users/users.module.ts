import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { UiModule } from '../ui/ui.module';
import { DivisionsModule } from '../divisions/divisions.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolveGuard } from './edit-user/resolve.guard';
import { EditUserCanDeactivateGuard } from './edit-user/can-deactivate.guard';
import { UsersService } from './users.service';
import { ByUserNamePipe } from './by-user-name.pipe';



@NgModule({
  imports: [
    DivisionsModule,
    UiModule,
    CoreModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    UserListComponent,
    NewUserComponent,
    EditUserComponent,
    ByUserNamePipe
  ],
  providers: [
    UsersService,
    EditUserResolveGuard,
    EditUserCanDeactivateGuard
  ]
})
export class UsersModule {};
