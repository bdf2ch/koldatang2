"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var User_model_1 = require('../models/User.model');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
exports.apiUrl = "/assets/serverside/api.php";
var UsersService = (function () {
    function UsersService(http) {
        this.http = http;
        this.users = [];
        this.start = 0;
        this.limit = 50;
        this.total = 0;
    }
    ;
    /**
     * Производит инициализацию массива пользователей
     * @param source
     * @returns {boolean}
     */
    UsersService.prototype.init = function (source) {
        var length = source.length;
        for (var i = 0; i < length; i++) {
            var user = new User_model_1.User(source[i]);
            user.setupBackup(["surname", "name", "fname", "position", "email", "isAdministrator", "fio"]);
            this.users.push(user);
            this.limit++;
        }
        return true;
    };
    ;
    /**
     * Запрашивает массив всех пользователей с сервера
     * @returns {User[]}
     */
    UsersService.prototype.fetchAll = function () {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        var params = { action: "getAllUsers" };
        var users = this.users;
        return this.http.post(exports.apiUrl, params, options)
            .map(function (res) {
            var body = res.json();
            var result = [];
            var length = body.length;
            for (var i = 0; i < length; i++) {
                var user = new User_model_1.User(body[i]);
                result.push(user);
                users.push(user);
            }
            return result;
        })
            .catch(this.handleError);
    };
    ;
    /**
     *
     * @returns {Observable<R>}
     */
    UsersService.prototype.fetch = function () {
        var _this = this;
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        var params = { action: "getUsersPortion", data: { start: this.start, limit: this.limit } };
        return this.http.post(exports.apiUrl, params, options)
            .map(function (res) {
            var body = res.json();
            _this.total = body.total;
            var length = body.users.length;
            for (var i = 0; i < length; i++) {
                var user = new User_model_1.User(body.users[i]);
                user.setupBackup(["surname", "name", "fname", "position", "email", "isAdministrator", "fio"]);
                _this.users.push(user);
                _this.start++;
            }
            console.log(_this.users);
            console.log("total = ", _this.total);
        })
            .catch(this.handleError);
    };
    ;
    /**
     *
     * @param id
     * @returns {Observable<User>}
     */
    UsersService.prototype.fetchById = function (id) {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        var params = { action: "getUserById", data: { id: id } };
        return this.http.post(exports.apiUrl, params, options)
            .map(function (res) {
            var body = res.json();
            console.log(body);
            if (body !== null) {
                var user = new User_model_1.User(body);
                user.setupBackup(["tabId", "divisionId", "surname", "name", "fname", "position", "email", "isAdministrator"]);
                return user;
            }
            else
                return null;
        })
            .catch(this.handleError);
    };
    ;
    /**
     *
     * @param search
     * @returns {Observable<User>}
     */
    UsersService.prototype.search = function (search) {
        var _this = this;
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        var params = { action: "searchUsers", data: { search: search } };
        return this.http.post(exports.apiUrl, params, options)
            .map(function (res) {
            if (res instanceof http_1.Response) {
                var body = res.json();
                var length_1 = body.length;
                _this.users.splice(0, _this.users.length);
                for (var i = 0; i < length_1; i++) {
                    var user = new User_model_1.User(body[i]);
                    user.setupBackup(["surname", "name", "fname", "position", "email", "activeDirectoryAccount", "password", "isAdministrator", "fio"]);
                    _this.users.push(user);
                    _this.start = 0;
                }
            }
            else
                return null;
        })
            .catch(this.handleError);
    };
    ;
    /**
     *
     * @returns {User[]}
     */
    UsersService.prototype.getAll = function () {
        return this.users;
    };
    ;
    /**
     * Поиск пользователя по идентификатору
     * @param id {number} - идентификатор пользователя
     * @returns {User|boolean}
     */
    UsersService.prototype.getById = function (id) {
        var length = this.users.length;
        for (var i = 0; i < length; i++) {
            if (this.users[i].id === id)
                return this.users[i];
        }
        return null;
    };
    ;
    /**
     *
     * @returns {number}
     */
    UsersService.prototype.getTotal = function () {
        return this.total;
    };
    ;
    /**
     *
     * @param user
     * @returns {Observable<R>}
     */
    UsersService.prototype.add = function (user, callback) {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        var params = {
            action: "addUser",
            data: {
                tabId: user.tabId,
                divisionId: 0,
                departmentId: 0,
                surname: user.surname,
                name: user.name,
                fname: user.fname,
                position: user.position,
                email: user.email,
                password: user.password,
                activeDirectoryAccount: user.activeDirectoryAccount,
                isAdministrator: user.isAdministrator
            }
        };
        return this.http.post(exports.apiUrl, params, options)
            .map(function (res) {
            var body = res.json();
            var user = new User_model_1.User(body);
            user.setupBackup(["tabId", "divisionId", "departmentId", "surname", "name", "fname", "position", "email", "activeDirectoryAccount", "isAdministrator"]);
            //this.users.push(user);
            if (callback !== undefined && typeof callback === "function")
                callback(user);
            return user;
        });
    };
    ;
    UsersService.prototype.handleError = function (error) {
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
    UsersService = __decorate([
        core_1.Injectable()
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
