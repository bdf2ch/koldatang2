"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Model_class_1 = require("./Model.class");
;
var Division = (function (_super) {
    __extends(Division, _super);
    function Division(config) {
        _super.call(this);
        this.id = 0;
        this.parentId = 0;
        this.isDepartment = false;
        if (config) {
            this.id = config.id;
            this.parentId = config.parent_id;
            this.title = config.title;
            if (config.is_department)
                this.isDepartment = config.is_department;
        }
    }
    ;
    return Division;
}(Model_class_1.Model));
exports.Division = Division;
;
