"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var User_model_1 = require('../../models/User.model');
var NewUserComponent = (function () {
    function NewUserComponent(router, route, users) {
        this.router = router;
        this.route = route;
        this.users = users;
        this.user = new User_model_1.User();
        this.submitted = false;
    }
    ;
    NewUserComponent.prototype.ngOnInit = function () { };
    ;
    NewUserComponent.prototype.onSubmit = function () {
        this.submitted = true;
        console.log("form submit");
    };
    ;
    NewUserComponent.prototype.save = function () {
        var _this = this;
        this.users.add(this.user).subscribe(function (user) {
            _this.router.navigate([user.id], { relativeTo: _this.route });
        });
    };
    ;
    /**
     * Возврат к списку пользователей
     */
    NewUserComponent.prototype.cancel = function () {
        this.user.clear();
        this.router.navigate(["../"], { relativeTo: this.route });
    };
    ;
    NewUserComponent = __decorate([
        core_1.Component({
            selector: 'app-new-user',
            templateUrl: './new-user.component.html',
            styleUrls: ['./new-user.component.css']
        })
    ], NewUserComponent);
    return NewUserComponent;
}());
exports.NewUserComponent = NewUserComponent;
