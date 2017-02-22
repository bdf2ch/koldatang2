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
    function User(config) {
        _super.call(this);
        this.id = 0;
        this.tabId = "";
        this.departmentId = 0;
        this.divisionId = 0;
        this.surname = "";
        this.name = "";
        this.fname = "";
        this.position = "";
        this.email = "";
        this.password = "";
        this.activeDirectoryAccount = "";
        this.isAdministrator = false;
        this.fio = "";
        this.search = "";
        if (config) {
            this.id = config.id;
            if (config.tab_id)
                this.tabId = config.tab_id;
            if (config.department_id)
                this.departmentId = config.department_id;
            if (config.division_id)
                this.divisionId = config.division_id;
            this.surname = config.surname;
            this.search += this.surname + " ";
            this.name = config.name;
            this.search += this.name + " ";
            if (config.fname) {
                this.fname = config.fname;
                this.search += this.fname + " ";
            }
            if (config.position)
                this.position = config.position;
            if (config.email) {
                this.email = config.email;
                this.search += this.email;
            }
            if (config.password)
                this.password = config.password;
            if (config.active_directory_account)
                this.activeDirectoryAccount = config.active_directory_account;
            if (config.is_administrator)
                this.isAdministrator = config.is_administrator;
        }
        this.fio = this.surname + " " + this.name + " " + this.fname;
    }
    ;
    /**
     * Сбрасывает значенеи всех полей
     */
    User.prototype.clear = function () {
        this.tabId = "";
        this.departmentId = 0;
        this.divisionId = 0;
        this.surname = "";
        this.name = "";
        this.fname = "";
        this.position = "";
        this.email = "";
        this.password = "";
        this.activeDirectoryAccount = "";
        this.isAdministrator = false;
        this.fio = "";
    };
    ;
    return User;
}(Model_class_1.Model));
exports.User = User;
;
