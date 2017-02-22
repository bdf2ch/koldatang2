"use strict";
var Model = (function () {
    function Model() {
        this._backupData = {};
        this._statusData = {
            isChanged: false,
            isSelected: false
        };
    }
    /**
     *
     * @param fields
     */
    Model.prototype.setupBackup = function (fields) {
        if (fields !== null) {
            var length_1 = fields.length;
            for (var i = 0; i < length_1; i++) {
                if (this[fields[i]] !== null) {
                    this._backupData[fields[i]] = this[fields[i]];
                }
            }
        }
        else {
            for (var i in this._backupData) {
                if (this[i] !== null) {
                    this._backupData[i] = this[i];
                }
            }
        }
    };
    ;
    /**
     *
     */
    Model.prototype.restoreBackup = function () {
        for (var i in this._backupData) {
            console.log(i);
            this[i] = this._backupData[i];
        }
    };
    ;
    /**
     *
     * @param flag
     * @returns {boolean}
     */
    Model.prototype.changed = function (flag) {
        if (flag !== null)
            this._statusData.isChanged = flag;
        return this._statusData.isChanged;
    };
    ;
    Model.prototype.selected = function (flag) {
        if (flag !== null)
            this._statusData.isSelected = flag;
        return this._statusData.isSelected;
    };
    ;
    return Model;
}());
exports.Model = Model;
;
