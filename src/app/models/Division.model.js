"use strict";
;
var Division = (function () {
    function Division(config) {
        this.id = 0;
        this.parentId = 0;
        this.isDepartment = false;
        this.id = config.id;
        this.parentId = config.parent_id;
        this.title = config.title;
        if (config.is_department)
            this.isDepartment = config.is_department;
    }
    ;
    return Division;
}());
exports.Division = Division;
;
