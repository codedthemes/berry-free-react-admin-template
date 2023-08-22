"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Tokenizer_1 = __importDefault(require("../../core/Tokenizer"));
var Formatter_1 = __importDefault(require("../../core/Formatter"));
var AbstractFormatter = (function () {
    function AbstractFormatter(cfg) {
        this.cfg = cfg;
    }
    AbstractFormatter.prototype.format = function (query) {
        return new Formatter_1["default"](this.cfg, this.tokenizer(), this.tokenOverride).format(query);
    };
    AbstractFormatter.prototype.tokenize = function (query) {
        return this.tokenizer().tokenize(query);
    };
    AbstractFormatter.prototype.tokenizer = function () {
        return new Tokenizer_1["default"](this.getTokenizerConfig());
    };
    return AbstractFormatter;
}());
exports["default"] = AbstractFormatter;
