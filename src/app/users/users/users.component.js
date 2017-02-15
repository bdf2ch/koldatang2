"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var UsersComponent = (function () {
    function UsersComponent(usersService, router) {
        this.usersService = usersService;
        this.router = router;
        this.users = [];
        this.search = "";
    }
    ;
    UsersComponent.prototype.ngOnInit = function () {
        this.users = this.usersService.getAll();
    };
    ;
    UsersComponent.prototype.selectUser = function (user) {
        this.selectedUser = user;
        this.router.navigate(['/user/' + user.id, user.id]);
        console.log("selected user = ", this.selectedUser);
    };
    ;
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'app-users',
            templateUrl: 'users.component.html',
            styleUrls: []
        })
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
