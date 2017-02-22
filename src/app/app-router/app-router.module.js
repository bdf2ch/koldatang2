"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var core_module_1 = require('../core/core.module');
var router_1 = require('@angular/router');
//import { UsersComponent } from '../users/users/users.component';
//import { NewUserComponent } from '../users/new-user/new-user.component';
//import { EditUserComponent } from '../users/edit-user/edit-user.component';
var divisions_component_1 = require('../divisions/divisions.component');
var phonebook_component_1 = require('../phonebook/phonebook.component');
var routes = [
    //{ path: "users", component: UsersComponent },
    //{ path: "users/new", component: NewUserComponent },
    //{ path: "users/:id", component: EditUserComponent },
    { path: "divisions", component: divisions_component_1.DivisionsComponent, data: { extras: { title: "Структура организации" } } },
    { path: "phonebook", component: phonebook_component_1.PhonebookComponent, data: { extras: { title: "Телефонный справочник" } } },
    { path: "", redirectTo: "/users", pathMatch: "full" },
    { path: "**", redirectTo: "/users" },
];
var AppRouterModule = (function () {
    function AppRouterModule() {
    }
    AppRouterModule = __decorate([
        core_1.NgModule({
            imports: [
                core_module_1.CoreModule,
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: []
        })
    ], AppRouterModule);
    return AppRouterModule;
}());
exports.AppRouterModule = AppRouterModule;
;
