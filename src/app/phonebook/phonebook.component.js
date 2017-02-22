"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var PhonebookComponent = (function () {
    function PhonebookComponent(modals) {
        this.modals = modals;
    }
    PhonebookComponent.prototype.ngOnInit = function () {
    };
    PhonebookComponent.prototype.onModalOpen = function () {
        console.log("modal opened");
    };
    ;
    PhonebookComponent.prototype.openModal = function () {
        this.modals.open("test");
    };
    ;
    PhonebookComponent.prototype.closeModal = function () {
        this.modals.close();
    };
    ;
    PhonebookComponent.prototype.onModalClose = function () {
        console.log("modal closed");
    };
    ;
    PhonebookComponent = __decorate([
        core_1.Component({
            selector: 'app-phonebook',
            templateUrl: './phonebook.component.html',
            styleUrls: ['./phonebook.component.css']
        })
    ], PhonebookComponent);
    return PhonebookComponent;
}());
exports.PhonebookComponent = PhonebookComponent;
