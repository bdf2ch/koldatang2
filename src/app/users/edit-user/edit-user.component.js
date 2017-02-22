"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var User_model_1 = require('../../models/User.model');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/map');
var EditUserComponent = (function () {
    function EditUserComponent(router, route, users) {
        this.router = router;
        this.route = route;
        this.users = users;
        this.user = new User_model_1.User();
        this.userNotFound = false;
        this.submitted = false;
    }
    ;
    EditUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.route);
        var id = +this.route.snapshot.params['id'];
        this.route.data
            .subscribe(function (data) {
            if (data.extras.user !== null) {
                _this.user = data.extras.user;
                console.log("resolved user", _this.user);
            }
            else {
                _this.user = new User_model_1.User();
                _this.userNotFound = true;
            }
        });
    };
    ;
    EditUserComponent.prototype.onSubmit = function () {
        this.submitted = true;
        console.log("form submit");
    };
    ;
    EditUserComponent.prototype.onCancel = function () {
        this.user = new User_model_1.User();
        this.submitted = false;
        this.router.navigate(["/users", { test: "test" }]);
    };
    ;
    EditUserComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-user',
            templateUrl: './edit-user.component.html',
            styleUrls: ['./edit-user.component.css']
        })
    ], EditUserComponent);
    return EditUserComponent;
}());
exports.EditUserComponent = EditUserComponent;
