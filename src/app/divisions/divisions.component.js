"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Division_model_1 = require("../models/Division.model");
var DivisionsComponent = (function () {
    function DivisionsComponent($divisions, $trees, $modals) {
        this.$divisions = $divisions;
        this.$trees = $trees;
        this.$modals = $modals;
        this.divisions = [];
        this.selectedDivision = new Division_model_1.Division();
    }
    ;
    DivisionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.divisions.length === 0) {
            this.$divisions.fetchAll().subscribe(function (divisions) {
                _this.divisions = divisions;
                var tree = _this.$trees.getById("test");
                console.log("tree = ", tree);
                var length = _this.divisions.length;
                for (var i = 0; i < length; i++) {
                    _this.$trees.getById("test").addItem({
                        key: _this.divisions[i].id.toString(),
                        parentKey: _this.divisions[i].parentId.toString(),
                        title: _this.divisions[i].title,
                        isRoot: _this.divisions[i].parentId === 0 ? true : false
                    });
                }
            });
        }
        ;
    };
    ;
    DivisionsComponent.prototype.select = function (item) {
        console.log(item);
        if (item !== null)
            this.$divisions.select(parseInt(item.key));
    };
    ;
    DivisionsComponent = __decorate([
        core_1.Component({
            selector: 'app-divisions',
            templateUrl: './divisions.component.html',
            styleUrls: ['./divisions.component.css']
        })
    ], DivisionsComponent);
    return DivisionsComponent;
}());
exports.DivisionsComponent = DivisionsComponent;
