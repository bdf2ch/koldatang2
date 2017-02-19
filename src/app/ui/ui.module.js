"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var search_box_component_1 = require('./search-box/search-box.component');
var modal_component_1 = require('./modal/modal.component');
var core_module_1 = require("../core/core.module");
var modal_service_1 = require("./modal/modal.service");
var UiModule = (function () {
    function UiModule() {
    }
    UiModule = __decorate([
        core_1.NgModule({
            imports: [
                core_module_1.CoreModule
            ],
            declarations: [
                search_box_component_1.SearchBoxComponent,
                modal_component_1.ModalComponent
            ],
            exports: [
                search_box_component_1.SearchBoxComponent,
                modal_component_1.ModalComponent
            ],
            providers: [
                modal_service_1.ModalService
            ]
        })
    ], UiModule);
    return UiModule;
}());
exports.UiModule = UiModule;
;
