"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var last_1 = __importDefault(require("./last"));
var INDENT_TYPE_TOP_LEVEL = 'top-level';
var INDENT_TYPE_BLOCK_LEVEL = 'block-level';
var Indentation = (function () {
    function Indentation(indent) {
        this.indent = indent;
        this.indentTypes = [];
        this.indent = indent || '  ';
    }
    Indentation.prototype.getIndent = function () {
        return new Array(this.indentTypes.length).fill(this.indent).join('');
    };
    Indentation.prototype.increaseTopLevel = function () {
        this.indentTypes.push(INDENT_TYPE_TOP_LEVEL);
    };
    Indentation.prototype.increaseBlockLevel = function () {
        this.indentTypes.push(INDENT_TYPE_BLOCK_LEVEL);
    };
    Indentation.prototype.decreaseTopLevel = function () {
        if ((0, last_1["default"])(this.indentTypes) === INDENT_TYPE_TOP_LEVEL) {
            this.indentTypes.pop();
        }
    };
    Indentation.prototype.decreaseBlockLevel = function () {
        while (this.indentTypes.length > 0) {
            var type = this.indentTypes.pop();
            if (type !== INDENT_TYPE_TOP_LEVEL) {
                break;
            }
        }
    };
    Indentation.prototype.resetIndentation = function () {
        this.indentTypes = [];
    };
    return Indentation;
}());
exports["default"] = Indentation;
