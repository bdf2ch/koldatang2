"use strict";
var Backup = (function () {
    function Backup(link) {
        this.instance = undefined;
        this.backup = {};
        this.instance = link;
        this.backup = {};
    }
    ;
    /**
     *
     * @param fields
     */
    Backup.prototype.setup = function (fields) {
        var length = fields.length;
        for (var i = 0; i < length; i++) {
            //if ([fields[i]] !== undefined) {
            this.backup[i] = fields[i];
        }
    };
    ;
    Backup.prototype.restore = function () {
        for (var i in this.backup) {
            if (this[i] !== undefined)
                this[i] = this.backup[i];
        }
    };
    ;
    return Backup;
}());
exports.Backup = Backup;
;
