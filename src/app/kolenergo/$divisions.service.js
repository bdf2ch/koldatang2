"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Division_model_1 = require('../models/Division.model');
var $divisions = (function () {
    function $divisions() {
        this.divisions = [];
    }
    ;
    /**
     * Производит инициализацию массива структурных подразделений
     * @param source
     * @returns {boolean}
     */
    $divisions.prototype.init = function (source) {
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
    $divisions.prototype.getAll = function () {
        return this.divisions;
    };
    ;
    $divisions = __decorate([
        core_1.Injectable()
    ], $divisions);
    return $divisions;
}());
exports.$divisions = $divisions;
