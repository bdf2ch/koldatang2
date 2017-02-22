"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var UserListComponent = (function () {
    function UserListComponent(usersService, route, router) {
        this.usersService = usersService;
        this.route = route;
        this.router = router;
        this.users = [];
        this.search = "";
    }
    ;
    UserListComponent.prototype.ngOnInit = function () {
        if (this.route.snapshot.queryParams["search"] !== null) {
            this.search = this.route.snapshot.queryParams["search"];
        }
        console.log("users length = ", this.usersService.getAll().length);
        if (this.usersService.getAll().length === 0) {
            console.log("length = ", this.usersService.getAll().length);
            this.usersService.fetch().subscribe();
        }
        this.users = this.usersService.getAll();
    };
    ;
    UserListComponent.prototype.selectUser = function (user) {
        console.log("selected user = ", this.selectedUser);
        this.selectedUser = user;
        if (this.search !== "")
            this.router.navigate([user.id, { search: this.search }], { relativeTo: this.route });
        else
            this.router.navigate([user.id], { relativeTo: this.route });
    };
    ;
    UserListComponent.prototype.getUsers = function () {
        var _this = this;
        this.usersService.fetch()
            .subscribe(function (users) { return _this.users = users; }, function (error) { return _this.errorMessage = error; });
    };
    ;
    UserListComponent.prototype.loadMore = function () {
        this.usersService.fetch().subscribe();
    };
    ;
    UserListComponent.prototype.isAllUsersLoaded = function () {
        return this.usersService.getTotal() === this.usersService.getAll().length ? true : false;
    };
    ;
    UserListComponent.prototype.searchForUsers = function (value) {
        console.log("value", value);
        if (value !== "" && value.length > 2) {
            this.usersService.search(this.search).subscribe();
        }
        else {
            this.usersService.fetch().subscribe();
        }
        this.users = this.usersService.getAll();
    };
    ;
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'app-users',
            templateUrl: 'user-list.component.html',
            styleUrls: ['./user-list.component.css']
        })
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
