import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EditUserComponent } from './edit-user.component';
import { ModalService } from '../../ui/modal/modal.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EditUserCanDeactivateGuard implements CanDeactivate<EditUserComponent> {

  constructor (private $modals: ModalService) {};

  canDeactivate (component: EditUserComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("can deaqctivate guard started");
    if (component.user.changed() === true) {
      component.openConfirmChangesModal();
      this.$modals.getAsyncResult('edit-user-confirm-changes')
        .map((result:boolean) => {
          console.log("result = ", result);
          return result;
      });
    } else
      return true;
  };
};
