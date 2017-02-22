"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var router_1 = require("@angular/router");
var core_1 = require('@angular/core');
require("rxjs/add/operator/map");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/mergeMap");
var AppComponent = (function () {
    function AppComponent($router, $route, $modals, $trees, $divisions) {
        this.$router = $router;
        this.$route = $route;
        this.$modals = $modals;
        this.$trees = $trees;
        this.$divisions = $divisions;
        this.breadcrumb = [];
    }
    ;
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.$router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .map(function (event) {
            var temp = [];
            var currentRoute = _this.$route.root;
            while (currentRoute.children[0] !== undefined) {
                currentRoute = currentRoute.children[0];
                if (currentRoute.snapshot.data["extras"]["title"] !== undefined && currentRoute.snapshot.data["extras"]["title"] !== "") {
                    _this.controls = currentRoute.snapshot.url[0].toString();
                    console.log("controls", _this.controls);
                    temp.push(currentRoute);
                }
            }
            return temp;
        })
            .subscribe(function (temp) {
            _this.breadcrumb = temp;
            var content = document.getElementById("app-content-content");
            content.scrollTop = 0;
            console.log("breadcrumb", _this.breadcrumb);
        });
    };
    ;
    AppComponent.prototype.openEditDivisionModal = function () {
        this.$modals.open("edit-division");
    };
    ;
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: []
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
