"use strict";
;
var UIModal = (function () {
    function UIModal(config) {
        this.id = "";
        this.title = "";
        this.id = config.id;
        this.title = config.title;
        this.instance = config.instance;
    }
    ;
    return UIModal;
}());
exports.UIModal = UIModal;
;
