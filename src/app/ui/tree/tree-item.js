"use strict";
;
var TreeItem = (function () {
    function TreeItem(config) {
        this.key = "";
        this.parentKey = "";
        this.title = "";
        this.isRoot = false;
        this.isExpanded = false;
        this.isSelected = false;
        this.children = [];
        this.key = config.key;
        this.parentKey = config.parentKey;
        this.title = config.title;
        if (config.isRoot)
            this.isRoot = config.isRoot;
    }
    ;
    return TreeItem;
}());
exports.TreeItem = TreeItem;
;
