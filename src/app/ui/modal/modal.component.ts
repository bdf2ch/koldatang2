import { Component, Inject, OnInit, Input, Output, EventEmitter, forwardRef, trigger, state, transition, style, animate } from '@angular/core';
import { ModalService } from './modal.service';


@Component({
  selector: 'modal-content',
  template: '<div></div>'
})
export class ModalContentComponent {};


@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger("fog", [

      state('true', style({
        background: 'rgba(0, 0, 0, 0.5)'
      })),

      transition('void => *', animate("200ms linear")),
      transition('* => void', animate("200ms linear")),
      //transition('void => *', [
      //  animate(100, style({ background: 'rgba(0, 0, 0, 0.5)' }))
      //]),
      //transition('* <=> void', animate("200ms linear"))
    ]),
    trigger("modal", [

      state('true', style({
        transform: 'scale(1.0)'
      })),

      state('false', style({
        transform: 'scale(0.1)'
      })),

      transition('void => *', animate("100ms linear")),
      transition('true => void', animate("100ms linear")),
      /*
      transition('void => *', [
        animate(100, style({ transform: 'scale(1.0)' }))
      ]),
      */
      /*
      transition('false => true', [
        animate(100, style({ transform: 'scale(1.0)' }))
      ]),
      transition('true => false', [
        animate(100, style({ transform: 'scale(0.1)' }))
      ]),
      */
      /*
      transition('* => void', [
        animate(100, style({ transform: 'scale(0.1)' }))
      ])
      */
      /*
      transition('* => void', [
        animate(100, style({ transform: 'scale(0.1)' }))
      ]),
      transition('void => *', [
        animate(100, style({ transform: 'scale(1)' }))
      ])
      */
    ])
  ]
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Input() width: number;
  @Input() private footer: boolean;
  @Output() private onOpen: EventEmitter<void> = new EventEmitter<void>();
  @Output() private onClose: EventEmitter<void> = new EventEmitter<void>();
  private opened: boolean = false;


  constructor(@Inject(forwardRef(() => ModalService)) private modals: ModalService) {};


  ngOnInit() {
    if (this.id === null || this.id === undefined || this.id === "") {
      console.error("no id specified");
      return;
    }
    if (this.title === null || this.title === undefined || this.title === "") {
      console.error("no title specified");
      return;
    }
    this.modals.register(this);
  };


  open() {
    this.opened = true;
    this.onOpen.emit();
  };


  close () {
    this.opened = false;
    this.onClose.emit();
  };

}
