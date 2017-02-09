"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var _users_service_1 = require('./$users.service');
var _divisions_service_1 = require('./$divisions.service');
var KolenergoModule = (function () {
    function KolenergoModule() {
    }
    KolenergoModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [],
            providers: [
                _users_service_1.$users, _divisions_service_1.$divisions
            ]
        })
    ], KolenergoModule);
    return KolenergoModule;
}());
exports.KolenergoModule = KolenergoModule;
;
