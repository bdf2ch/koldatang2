"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Model_class_1 = require('./Model.class');
;
var User = (function (_super) {
    __extends(User, _super);
    //status: Status = new Status();
    //backup: Backup = new Backup(this);
    function User(config) {
        _super.call(this);
        this.id = 0;
        this.tabId = 0;
        this.departmentId = 0;
        this.divisionId = 0;
        this.isAdministrator = false;
        this.search = "";
        this.id = config.id;
        this.surname = config.surname;
        this.name = config.name;
        this.fname = config.fname;
        if (config.tab_id)
            this.tabId = config.tab_id;
        if (config.department_id)
            this.departmentId = config.department_id;
        if (config.division_id)
            this.divisionId = config.division_id;
        if (config.position)
            this.position = config.position;
        if (config.email)
            this.email = config.email;
        if (config.is_administrator)
            this.isAdministrator = config.is_administrator;
        this.fio = this.surname + " " + this.name + " " + this.fname;
        this.search = this.surname.toLowerCase() + " " + this.name.toLowerCase() + " " + this.fname.toLowerCase() + " " + this.email;
    }
    ;
    return User;
}(Model_class_1.Model));
exports.User = User;
;
