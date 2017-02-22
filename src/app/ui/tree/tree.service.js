"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var TreeService = (function () {
    function TreeService() {
        this.trees = [];
    }
    TreeService.prototype.register = function (tree) {
        this.trees.push(tree);
        console.log("trees", this.trees);
        return true;
    };
    ;
    TreeService.prototype.getById = function (id) {
        var length = this.trees.length;
        for (var i = 0; i < length; i++) {
            if (this.trees[i].id === id)
                return this.trees[i];
        }
        return null;
    };
    ;
    TreeService = __decorate([
        core_1.Injectable()
    ], TreeService);
    return TreeService;
}());
exports.TreeService = TreeService;
