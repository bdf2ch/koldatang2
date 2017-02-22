"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var tree_item_1 = require('./tree-item');
var TreeComponent = (function () {
    function TreeComponent($tree) {
        this.$tree = $tree;
        this.onSelect = new core_1.EventEmitter();
        this.root = [];
        this.stack = [];
        this.selected = null;
    }
    ;
    TreeComponent.prototype.ngOnInit = function () {
        if (this.id === null || this.id === undefined || this.id === "") {
            console.error("no id specified");
            return;
        }
        if (this.expandOnSelect === null || this.expandOnSelect === undefined || typeof this.expandOnSelect !== "boolean")
            this.expandOnSelect = false;
        this.tree = this;
        this.$tree.register(this);
    };
    ;
    /**
     * Поиск элемента дерева по идентификатору
     * @param key {string} - идентификатор элемента дерева
     * @returns {TreeItem|null}
     */
    TreeComponent.prototype.getItemByKey = function (key) {
        var length = this.stack.length;
        for (var i = 0; i < length; i++) {
            if (this.stack[i].key === key)
                return this.stack[i];
        }
        return null;
    };
    ;
    /**
     * Возвращает выбранный элемент дерева
     * @returns {TreeItem|null}
     */
    TreeComponent.prototype.getSelectedItem = function () {
        return this.selected;
    };
    ;
    /**
     * Разворачивание элемента дерева
     * @param key {string} - идентификатор элемента дерева
     * @returns {boolean}
     */
    TreeComponent.prototype.expandItem = function (key) {
        console.log("expand");
        var length = this.stack.length;
        for (var i = 0; i < length; i++) {
            if (this.stack[i].key === key) {
                console.log(key + " found");
                this.stack[i].isExpanded = true;
                return true;
            }
        }
        return false;
    };
    ;
    /**
     * Сворачивание элемента дерева
     * @param key {string} - идентификатор элемента дерева
     * @returns {boolean}
     */
    TreeComponent.prototype.collapseItem = function (key) {
        var length = this.stack.length;
        for (var i = 0; i < length; i++) {
            if (this.stack[i].key === key) {
                this.stack[i].isExpanded = false;
                return true;
            }
        }
        return false;
    };
    ;
    /**
     * Добавление элемента дерева
     * @param config {TreeItemConfig} - параметры добавляемого элемента дерева
     */
    TreeComponent.prototype.addItem = function (config) {
        var item = new tree_item_1.TreeItem(config);
        if (item.parentKey !== "") {
            var parent_1 = this.getItemByKey(item.parentKey);
            if (parent_1 !== null)
                parent_1.children.push(item);
        }
        if (item.isRoot === true)
            this.root.push(item);
        this.stack.push(item);
    };
    ;
    /**
     * Выбор элемента дерева
     * @param key {string} - идентификатор элемента
     */
    TreeComponent.prototype.selectItem = function (key) {
        var length = this.stack.length;
        for (var i = 0; i < length; i++) {
            if (this.stack[i].key === key) {
                if (this.stack[i].isSelected === true) {
                    this.stack[i].isSelected = false;
                    this.selected = null;
                }
                else {
                    this.stack[i].isSelected = true;
                    this.selected = this.stack[i];
                    if (this.stack[i].children.length > 0 && this.expandOnSelect === true)
                        this.stack[i].isExpanded = true;
                    this.onSelect.emit(this.stack[i]);
                }
            }
            else
                this.stack[i].isSelected = false;
        }
        this.onSelect.emit(this.selected);
    };
    ;
    __decorate([
        core_1.Input()
    ], TreeComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input()
    ], TreeComponent.prototype, "expandOnSelect", void 0);
    __decorate([
        core_1.Output()
    ], TreeComponent.prototype, "onSelect", void 0);
    TreeComponent = __decorate([
        core_1.Component({
            selector: 'tree',
            templateUrl: './tree.component.html',
            styleUrls: ['./tree.component.css']
        })
    ], TreeComponent);
    return TreeComponent;
}());
exports.TreeComponent = TreeComponent;
;
