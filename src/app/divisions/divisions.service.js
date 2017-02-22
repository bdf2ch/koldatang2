"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Division_model_1 = require('../models/Division.model');
var Observable_1 = require('rxjs/Observable');
exports.apiUrl = "/assets/serverside/api.php";
var DivisionsService = (function () {
    function DivisionsService(http) {
        this.http = http;
        this.divisions = [];
        this.selected = null;
    }
    ;
    /**
     * Получает все структурные подразделения с сервера
     * @returns {Observable<Division[]>}
     */
    DivisionsService.prototype.fetchAll = function () {
        var _this = this;
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        var parameters = { action: "getAllDivisions" };
        return this.http.post(exports.apiUrl, parameters, options)
            .map(function (res) {
            var result = [];
            var body = res.json();
            var length = body.length;
            for (var i = 0; i < length; i++) {
                var division = new Division_model_1.Division(body[i]);
                division.setupBackup(["parentId", "title", "isDepartment"]);
                _this.divisions.push(division);
                result.push(division);
            }
            console.log(result);
            return result;
        })
            .catch(this.handleError);
    };
    ;
    /**
     * Производит инициализацию массива структурных подразделений
     * @param source
     * @returns {boolean}
     */
    DivisionsService.prototype.init = function (source) {
        var length = source.length;
        for (var i = 0; i < length; i++) {
            var division = new Division_model_1.Division(source[i]);
            this.divisions.push(division);
        }
        return true;
    };
    ;
    /**
     * Возвращает массив всех структурных подразделений
     * @returns {Division[]}
     */
    DivisionsService.prototype.getAll = function () {
        return this.divisions;
    };
    ;
    /**
     *
     * @param id
     * @returns {any}
     */
    DivisionsService.prototype.getById = function (id) {
        var length = this.divisions.length;
        for (var i = 0; i < length; i++) {
            if (this.divisions[i].id === id)
                return this.divisions[i];
        }
        return null;
    };
    ;
    DivisionsService.prototype.getSelected = function () {
        return this.selected;
    };
    ;
    /**
     * Добавляет структурное подразделение
     * @param division {Division} - добавляемое структурное подразделение
     * @returns {Observable<Division>}
     */
    DivisionsService.prototype.add = function (division) {
        var _this = this;
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        var parameters = {
            action: "addDivision",
            data: {
                parentId: division.parentId,
                title: division.title,
                isDepartment: division.isDepartment
            }
        };
        return this.http.post(exports.apiUrl, parameters, options)
            .map(function (res) {
            var body = res.json();
            var division = new Division_model_1.Division(body);
            _this.divisions.push(division);
            return division;
        })
            .catch(this.handleError);
    };
    ;
    /**
     * Редактирует структурное подразделение
     * @param division {Division} - структурное подразделение
     * @returns {Observable<boolean>}
     */
    DivisionsService.prototype.edit = function (division) {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        var parameters = {
            action: "editDivision",
            data: {
                id: division.id,
                parentId: division.parentId,
                title: division.title,
                isDepartment: division.isDepartment
            }
        };
        return this.http.post(exports.apiUrl, parameters, options)
            .map(function (res) {
            var body = res.json();
            return body;
        })
            .catch(this.handleError);
    };
    ;
    /**
     * Выбирает текущее структурное подразделение
     * @param id {number|null} - Идентификатор структурного подразделения/null
     * @returns {Division|null}
     */
    DivisionsService.prototype.select = function (id) {
        if (id !== null) {
            var length_1 = this.divisions.length;
            for (var i = 0; i < length_1; i++) {
                if (this.divisions[i].id === id)
                    this.selected = this.divisions[i];
            }
        }
        else
            this.selected = null;
        return this.selected;
    };
    ;
    DivisionsService.prototype.handleError = function (error) {
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
    DivisionsService = __decorate([
        core_1.Injectable()
    ], DivisionsService);
    return DivisionsService;
}());
exports.DivisionsService = DivisionsService;
