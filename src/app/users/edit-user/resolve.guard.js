"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var users_service_1 = require('../users.service');
var User_model_1 = require('../../models/User.model');
var EditUserResolveGuard = (function () {
    function EditUserResolveGuard(http, users) {
        this.http = http;
        this.users = users;
    }
    ;
    EditUserResolveGuard.prototype.resolve = function (route, state) {
        var id = +route.params["id"];
        var user = this.users.getById(id);
        if (user === null) {
            console.log("starting resolving");
            var headers = new http_1.Headers({ "Content-Type": "application/json" });
            var options = new http_1.RequestOptions({ headers: headers });
            var params = { action: "getUserById", data: { id: id } };
            return this.http.post(users_service_1.apiUrl, params, options)
                .map(function (res) {
                console.log("RESPONSE", res);
                var body = res.json();
                if (body !== null) {
                    var user_1 = new User_model_1.User(body);
                    user_1.setupBackup(["tabId", "divisionId", "surname", "name", "fname", "position", "email", "activeDirectoryAccount", "isAdministrator"]);
                    var result = {
                        user: user_1,
                        title: user_1.name + " " + user_1.fname + " " + user_1.surname
                    };
                    return result;
                }
                else {
                    var result = {
                        user: null
                    };
                    return result;
                }
            })
                .catch(this.handleError);
        }
        else {
            var result = {
                user: user,
                title: user.name + " " + user.fname + " " + user.surname
            };
            return result;
        }
    };
    ;
    EditUserResolveGuard.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    ;
    EditUserResolveGuard = __decorate([
        core_1.Injectable()
    ], EditUserResolveGuard);
    return EditUserResolveGuard;
}());
exports.EditUserResolveGuard = EditUserResolveGuard;
;
