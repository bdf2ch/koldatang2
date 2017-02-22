"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var users_component_1 = require('./users.component');
var user_list_component_1 = require('./user-list/user-list.component');
var new_user_component_1 = require('./new-user/new-user.component');
var edit_user_component_1 = require('./edit-user/edit-user.component');
var resolve_guard_1 = require('./edit-user/resolve.guard');
var routes = [
    {
        path: "users",
        component: users_component_1.UsersComponent,
        data: {
            extras: {
                title: "Пользователи",
                controls: "<a routerLink=\"/users/new\">\n            <span class=\"fa fa-plus\" title=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\"></span>\n           </a>"
            }
        },
        children: [
            {
                path: "",
                component: user_list_component_1.UserListComponent,
                data: {
                    extras: {
                        title: ""
                    }
                }
            },
            {
                path: "new",
                component: new_user_component_1.NewUserComponent,
                data: {
                    extras: {
                        title: "Новый пользователь"
                    }
                }
            },
            {
                path: ":id",
                component: edit_user_component_1.EditUserComponent,
                resolve: {
                    extras: resolve_guard_1.EditUserResolveGuard
                }
            }
        ]
    }
];
var UsersRoutingModule = (function () {
    function UsersRoutingModule() {
    }
    UsersRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], UsersRoutingModule);
    return UsersRoutingModule;
}());
exports.UsersRoutingModule = UsersRoutingModule;
;
