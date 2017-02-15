"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var User_model_1 = require('../models/User.model.ts');
var $users = (function () {
    function $users() {
        this.users = [];
    }
    ;
    /**
     * Производит инициализацию массива пользователей
     * @param source
     * @returns {boolean}
     */
    $users.prototype.init = function (source) {
        var length = source.length;
        for (var i = 0; i < length; i++) {
            var user = new User_model_1.User(source[i]);
            user.setupBackup(["surname", "name", "fname", "position", "email", "isAdministrator", "fio"]);
            this.users.push(user);
        }
        return true;
    };
    ;
    /**
     * Возвращает массив всех пользователей
     * @returns {User[]}
     */
    $users.prototype.getAll = function () {
        return this.users;
    };
    ;
    /**
     * Поиск пользователя по идентификатору
     * @param id {number} - идентификатор пользователя
     * @returns {User|boolean}
     */
    $users.prototype.getById = function (id) {
        length = this.users.length;
        for (var i = 0; i < length; i++) {
            if (this.users[i].id === id)
                return this.users[i];
        }
        return false;
    };
    ;
    $users = __decorate([
        core_1.Injectable()
    ], $users);
    return $users;
}());
exports.$users = $users;
