import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EditUserComponent } from './edit-user.component';
import { ModalService } from '../../ui/modal/modal.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EditUserCanDeactivateGuard implements CanDeactivate<EditUserComponent> {

  constructor (private $modals: ModalService) {};

  canDeactivate (component: EditUserComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    console.log("can deactivate guard started");
    if (component.user.changed() === true) {
      component.openConfirmChangesModal();
    } else
      return true;
  };
};
