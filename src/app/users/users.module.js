"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var core_module_1 = require('../core/core.module');
var ui_module_1 = require('../ui/ui.module');
var users_routing_module_1 = require('./users-routing.module');
var users_component_1 = require('./users.component');
var user_list_component_1 = require('./user-list/user-list.component');
var new_user_component_1 = require('./new-user/new-user.component');
var edit_user_component_1 = require('./edit-user/edit-user.component');
var resolve_guard_1 = require('./edit-user/resolve.guard');
var users_service_1 = require('./users.service');
var by_user_name_pipe_1 = require('./by-user-name.pipe');
var UsersModule = (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        core_1.NgModule({
            imports: [
                ui_module_1.UiModule,
                core_module_1.CoreModule,
                users_routing_module_1.UsersRoutingModule
            ],
            declarations: [
                users_component_1.UsersComponent,
                user_list_component_1.UserListComponent,
                new_user_component_1.NewUserComponent,
                edit_user_component_1.EditUserComponent,
                by_user_name_pipe_1.ByUserNamePipe
            ],
            providers: [
                users_service_1.UsersService,
                resolve_guard_1.EditUserResolveGuard
            ]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
;
