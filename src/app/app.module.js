"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var kolenergo_module_1 = require('./kolenergo/kolenergo.module');
var ui_module_1 = require('./ui/ui.module');
var app_component_1 = require('./app.component');
var _users_service_1 = require('./users/$users.service.ts');
var users_component_1 = require('./users/users/users.component.ts');
var new_user_component_1 = require('./users/new-user/new-user.component');
var edit_user_component_1 = require('./users/edit-user/edit-user.component');
var by_user_name_pipe_1 = require('./users/by-user-name.pipe.ts');
var appRoutes = [
    { path: "users", component: users_component_1.UsersComponent },
    { path: "users/new", component: new_user_component_1.NewUserComponent },
    { path: "users/:id", component: edit_user_component_1.EditUserComponent },
    { path: "", component: users_component_1.UsersComponent },
    { path: "**", redirectTo: "users" }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                users_component_1.UsersComponent,
                new_user_component_1.NewUserComponent,
                edit_user_component_1.EditUserComponent,
                by_user_name_pipe_1.ByUserNamePipe
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(appRoutes),
                kolenergo_module_1.KolenergoModule,
                ui_module_1.UiModule
            ],
            providers: [_users_service_1.$users],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
