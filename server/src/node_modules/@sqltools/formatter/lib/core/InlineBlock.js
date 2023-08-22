"use strict";
exports.__esModule = true;
var types_1 = require("./types");
var INLINE_MAX_LENGTH = 50;
var InlineBlock = (function () {
    function InlineBlock() {
        this.level = 0;
    }
    InlineBlock.prototype.beginIfPossible = function (tokens, index) {
        if (this.level === 0 && this.isInlineBlock(tokens, index)) {
            this.level = 1;
        }
        else if (this.level > 0) {
            this.level++;
        }
        else {
            this.level = 0;
        }
    };
    InlineBlock.prototype.end = function () {
        this.level--;
    };
    InlineBlock.prototype.isActive = function () {
        return this.level > 0;
    };
    InlineBlock.prototype.isInlineBlock = function (tokens, index) {
        var length = 0;
        var level = 0;
        for (var i = index; i < tokens.length; i++) {
            var token = tokens[i];
            length += token.value.length;
            if (length > INLINE_MAX_LENGTH) {
                return false;
            }
            if (token.type === types_1.TokenTypes.OPEN_PAREN) {
                level++;
            }
            else if (token.type === types_1.TokenTypes.CLOSE_PAREN) {
                level--;
                if (level === 0) {
                    return true;
                }
            }
            if (this.isForbiddenToken(token)) {
                return false;
            }
        }
        return false;
    };
    InlineBlock.prototype.isForbiddenToken = function (_a) {
        var type = _a.type, value = _a.value;
        return (type === types_1.TokenTypes.RESERVED_TOP_LEVEL ||
            type === types_1.TokenTypes.RESERVED_NEWLINE ||
            type === types_1.TokenTypes.LINE_COMMENT ||
            type === types_1.TokenTypes.BLOCK_COMMENT ||
            value === ';');
    };
    return InlineBlock;
}());
exports["default"] = InlineBlock;
