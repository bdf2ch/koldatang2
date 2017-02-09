"use strict";
var Status = (function () {
    function Status() {
        this.isChanged = false;
        this.isSelected = false;
    }
    ;
    Status.prototype.changed = function (flag) {
        if (flag !== null)
            this.isChanged = flag;
        return this.isChanged;
    };
    ;
    Status.prototype.selected = function (flag) {
        if (flag !== null)
            this.isSelected = flag;
        return this.isSelected;
    };
    ;
    return Status;
}());
exports.Status = Status;
;
