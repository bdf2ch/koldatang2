import { Injectable } from '@angular/core';
import { ModalComponent } from './modal.component';

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
        this.modals[i].close();
    }
    return found;
  };


  close() {
    if (this.opened instanceof ModalComponent)
      this.opened.close();
  };
}
