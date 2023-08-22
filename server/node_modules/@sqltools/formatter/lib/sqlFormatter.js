"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.tokenize = exports.format = void 0;
var Db2Formatter_1 = __importDefault(require("./languages/Db2Formatter"));
var N1qlFormatter_1 = __importDefault(require("./languages/N1qlFormatter"));
var PlSqlFormatter_1 = __importDefault(require("./languages/PlSqlFormatter"));
var StandardSqlFormatter_1 = __importDefault(require("./languages/StandardSqlFormatter"));
var format = function (query, cfg) {
    if (cfg === void 0) { cfg = {}; }
    switch (cfg.language) {
        case 'db2':
            return new Db2Formatter_1["default"](cfg).format(query);
        case 'n1ql':
            return new N1qlFormatter_1["default"](cfg).format(query);
        case 'pl/sql':
            return new PlSqlFormatter_1["default"](cfg).format(query);
        case 'sql':
        default:
            return new StandardSqlFormatter_1["default"](cfg).format(query);
    }
};
exports.format = format;
var tokenize = function (query, cfg) {
    if (cfg === void 0) { cfg = {}; }
    return new StandardSqlFormatter_1["default"](cfg).tokenize(query);
};
exports.tokenize = tokenize;
exports["default"] = {
    format: exports.format,
    tokenize: exports.tokenize
};
