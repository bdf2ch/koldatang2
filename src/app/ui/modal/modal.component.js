"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var modal_service_1 = require('./modal.service');
var ModalContentComponent = (function () {
    function ModalContentComponent() {
    }
    ModalContentComponent = __decorate([
        core_1.Component({
            selector: 'modal-content',
            template: '<div></div>'
        })
    ], ModalContentComponent);
    return ModalContentComponent;
}());
exports.ModalContentComponent = ModalContentComponent;
;
var ModalComponent = (function () {
    function ModalComponent(modals) {
        this.modals = modals;
        this.onOpen = new core_1.EventEmitter();
        this.onClose = new core_1.EventEmitter();
        this.opened = false;
    }
    ;
    ModalComponent.prototype.ngOnInit = function () {
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
    ;
    ModalComponent.prototype.open = function () {
        this.opened = true;
        this.onOpen.emit();
    };
    ;
    ModalComponent.prototype.close = function () {
        this.opened = false;
        this.onClose.emit();
    };
    ;
    __decorate([
        core_1.Input()
    ], ModalComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input()
    ], ModalComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input()
    ], ModalComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input()
    ], ModalComponent.prototype, "footer", void 0);
    __decorate([
        core_1.Output()
    ], ModalComponent.prototype, "onOpen", void 0);
    __decorate([
        core_1.Output()
    ], ModalComponent.prototype, "onClose", void 0);
    ModalComponent = __decorate([
        core_1.Component({
            selector: 'modal',
            templateUrl: './modal.component.html',
            styleUrls: ['./modal.component.css'],
            animations: [
                core_1.trigger("fog", [
                    core_1.state('true', core_1.style({
                        background: 'rgba(0, 0, 0, 0.5)'
                    })),
                    core_1.transition('void => *', core_1.animate("200ms ease-in")),
                    core_1.transition('* => void', core_1.animate("200ms linear")),
                ]),
                core_1.trigger("modal", [
                    core_1.state('true', core_1.style({
                        transform: 'scale(1.0)'
                    })),
                    core_1.state('false', core_1.style({
                        transform: 'scale(0.1)'
                    })),
                    core_1.transition('* => void', [
                        core_1.animate(200, core_1.style({ transform: 'scale(0.1)' }))
                    ])
                ])
            ]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return modal_service_1.ModalService; })))
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
