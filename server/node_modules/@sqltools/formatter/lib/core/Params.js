"use strict";
exports.__esModule = true;
var Params = (function () {
    function Params(params) {
        this.params = params;
        this.index = 0;
        this.params = params;
    }
    Params.prototype.get = function (_a) {
        var key = _a.key, value = _a.value;
        if (!this.params) {
            return value;
        }
        if (key) {
            return this.params[key];
        }
        return this.params[this.index++];
    };
    return Params;
}());
exports["default"] = Params;
