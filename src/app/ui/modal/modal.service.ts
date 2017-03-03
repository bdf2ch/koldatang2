import { Injectable } from '@angular/core';
import { ModalComponent } from './modal.component';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Injectable()
export class ModalService {
  private modals: ModalComponent[] = [];
  private opened: ModalComponent|null;

  constructor() {};

  register(modal: ModalComponent): ModalComponent {
    this.modals.push(modal);
    return modal;
  };


  open(id: string): boolean {
    let length = this.modals.length;
    let found = false;

    for (let i = 0; i < length; i++) {
      if (this.modals[i].id === id) {
        this.modals[i].open();
        found = true;
        this.opened = this.modals[i];
      } else
        this.modals[i].close(true);
    }
    return found;
  };


  close(withoutCallback?: boolean) {
    if (this.opened instanceof ModalComponent)
      this.opened.close(withoutCallback);
  };


  getAsyncResult(id: string): Observable<any>|null {
    let length = this.modals.length;
    for (let i = 0; i < length; i++) {
      if (this.modals[i].id === id)
        return this.modals[i].getResult();
    }
    return null;
  };


  setAsyncResult(id: string, result: any): boolean {
    let length = this.modals.length;
    for (let i = 0; i < length; i++) {
      if (this.modals[i].id === id) {
        this.modals[i].setResult(result);
        return true;
      }
    }
    return false;
  };
}
