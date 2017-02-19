"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var SearchBoxComponent = (function () {
    function SearchBoxComponent() {
    }
    SearchBoxComponent.prototype.ngOnInit = function () { };
    ;
    SearchBoxComponent.prototype.writeValue = function (value) { };
    ;
    SearchBoxComponent.prototype.registerOnChange = function (fn) { };
    ;
    SearchBoxComponent.prototype.registerOnTouched = function (fn) { };
    ;
    __decorate([
        core_1.Input()
    ], SearchBoxComponent.prototype, "placeholder", void 0);
    SearchBoxComponent = __decorate([
        core_1.Component({
            selector: 'search-box',
            templateUrl: './search-box.component.html',
            styleUrls: ['./search-box.component.css'],
            providers: [
                { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: SearchBoxComponent, multi: true }
            ]
        })
    ], SearchBoxComponent);
    return SearchBoxComponent;
}());
exports.SearchBoxComponent = SearchBoxComponent;
