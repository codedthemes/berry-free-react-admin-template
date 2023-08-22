"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var types_1 = require("./types");
var Indentation_1 = __importDefault(require("./Indentation"));
var InlineBlock_1 = __importDefault(require("./InlineBlock"));
var Params_1 = __importDefault(require("./Params"));
var spaceChars = [' ', '\t'];
var trimSpacesEnd = function (str) {
    var end = str.length - 1;
    while (end >= 0 && spaceChars.includes(str[end])) {
        end--;
    }
    return str.substring(0, end + 1);
};
var Formatter = (function () {
    function Formatter(cfg, tokenizer, tokenOverride) {
        this.cfg = cfg;
        this.tokenizer = tokenizer;
        this.tokenOverride = tokenOverride;
        this.tokens = [];
        this.previousReservedWord = { type: null, value: null };
        this.previousNonWhiteSpace = { type: null, value: null };
        this.index = 0;
        this.indentation = new Indentation_1["default"](this.cfg.indent);
        this.inlineBlock = new InlineBlock_1["default"]();
        this.params = new Params_1["default"](this.cfg.params);
    }
    Formatter.prototype.format = function (query) {
        this.tokens = this.tokenizer.tokenize(query);
        var formattedQuery = this.getFormattedQueryFromTokens();
        return formattedQuery.trim();
    };
    Formatter.prototype.getFormattedQueryFromTokens = function () {
        var _this = this;
        var formattedQuery = '';
        this.tokens.forEach(function (token, index) {
            _this.index = index;
            if (_this.tokenOverride)
                token = _this.tokenOverride(token, _this.previousReservedWord) || token;
            if (token.type === types_1.TokenTypes.WHITESPACE) {
                formattedQuery = _this.formatWhitespace(token, formattedQuery);
            }
            else if (token.type === types_1.TokenTypes.LINE_COMMENT) {
                formattedQuery = _this.formatLineComment(token, formattedQuery);
            }
            else if (token.type === types_1.TokenTypes.BLOCK_COMMENT) {
                formattedQuery = _this.formatBlockComment(token, formattedQuery);
            }
            else if (token.type === types_1.TokenTypes.RESERVED_TOP_LEVEL
                || token.type === types_1.TokenTypes.RESERVED_TOP_LEVEL_NO_INDENT
                || token.type === types_1.TokenTypes.RESERVED_NEWLINE
                || token.type === types_1.TokenTypes.RESERVED) {
                formattedQuery = _this.formatReserved(token, formattedQuery);
            }
            else if (token.type === types_1.TokenTypes.OPEN_PAREN) {
                formattedQuery = _this.formatOpeningParentheses(token, formattedQuery);
            }
            else if (token.type === types_1.TokenTypes.CLOSE_PAREN) {
                formattedQuery = _this.formatClosingParentheses(token, formattedQuery);
            }
            else if (token.type === types_1.TokenTypes.NO_SPACE_OPERATOR) {
                formattedQuery = _this.formatWithoutSpaces(token, formattedQuery);
            }
            else if (token.type === types_1.TokenTypes.PLACEHOLDER || token.type === types_1.TokenTypes.SERVERVARIABLE) {
                formattedQuery = _this.formatPlaceholder(token, formattedQuery);
            }
            else if (token.value === ',') {
                formattedQuery = _this.formatComma(token, formattedQuery);
            }
            else if (token.value === ':') {
                formattedQuery = _this.formatWithSpaceAfter(token, formattedQuery);
            }
            else if (token.value === '.') {
                formattedQuery = _this.formatWithoutSpaces(token, formattedQuery);
            }
            else if (token.value === ';') {
                formattedQuery = _this.formatQuerySeparator(token, formattedQuery);
            }
            else {
                formattedQuery = _this.formatWithSpaces(token, formattedQuery);
            }
            if (token.type !== types_1.TokenTypes.WHITESPACE) {
                _this.previousNonWhiteSpace = token;
            }
        });
        return formattedQuery;
    };
    Formatter.prototype.formatWhitespace = function (token, query) {
        if (this.cfg.linesBetweenQueries === 'preserve'
            && /((\r\n|\n)(\r\n|\n)+)/u.test(token.value)
            && this.previousToken().value === ';') {
            return query.replace(/(\n|\r\n)$/u, '') + token.value;
        }
        return query;
    };
    Formatter.prototype.formatReserved = function (token, query) {
        if (token.type === types_1.TokenTypes.RESERVED_NEWLINE
            && this.previousReservedWord
            && this.previousReservedWord.value
            && token.value.toUpperCase() === 'AND' &&
            this.previousReservedWord.value.toUpperCase() === 'BETWEEN') {
            token.type = types_1.TokenTypes.RESERVED;
        }
        if (token.type === types_1.TokenTypes.RESERVED_TOP_LEVEL) {
            query = this.formatTopLevelReservedWord(token, query);
        }
        else if (token.type === types_1.TokenTypes.RESERVED_TOP_LEVEL_NO_INDENT) {
            query = this.formatTopLevelReservedWordNoIndent(token, query);
        }
        else if (token.type === types_1.TokenTypes.RESERVED_NEWLINE) {
            query = this.formatNewlineReservedWord(token, query);
        }
        else {
            query = this.formatWithSpaces(token, query);
        }
        this.previousReservedWord = token;
        return query;
    };
    Formatter.prototype.formatLineComment = function (token, query) {
        return this.addNewline(query + token.value);
    };
    Formatter.prototype.formatBlockComment = function (token, query) {
        return this.addNewline(this.addNewline(query) + this.indentComment(token.value));
    };
    Formatter.prototype.indentComment = function (comment) {
        return comment.replace(/\n[ \t]*/gu, '\n' + this.indentation.getIndent() + ' ');
    };
    Formatter.prototype.formatTopLevelReservedWordNoIndent = function (token, query) {
        this.indentation.decreaseTopLevel();
        query = this.addNewline(query) + this.equalizeWhitespace(this.formatReservedWord(token.value));
        return this.addNewline(query);
    };
    Formatter.prototype.formatTopLevelReservedWord = function (token, query) {
        var shouldChangeTopLevel = (this.previousNonWhiteSpace.value !== ',' && !['GRANT'].includes("".concat(this.previousNonWhiteSpace.value).toUpperCase()));
        if (shouldChangeTopLevel) {
            this.indentation.decreaseTopLevel();
            query = this.addNewline(query);
        }
        query = query + this.equalizeWhitespace(this.formatReservedWord(token.value)) + ' ';
        if (shouldChangeTopLevel)
            this.indentation.increaseTopLevel();
        return query;
    };
    Formatter.prototype.formatNewlineReservedWord = function (token, query) {
        return (this.addNewline(query) + this.equalizeWhitespace(this.formatReservedWord(token.value)) + ' ');
    };
    Formatter.prototype.equalizeWhitespace = function (value) {
        return value.replace(/\s+/gu, ' ');
    };
    Formatter.prototype.formatOpeningParentheses = function (token, query) {
        token.value = this.formatCase(token.value);
        var previousTokenType = this.previousToken().type;
        if (previousTokenType !== types_1.TokenTypes.WHITESPACE
            && previousTokenType !== types_1.TokenTypes.OPEN_PAREN
            && previousTokenType !== types_1.TokenTypes.LINE_COMMENT) {
            query = trimSpacesEnd(query);
        }
        query += token.value;
        this.inlineBlock.beginIfPossible(this.tokens, this.index);
        if (!this.inlineBlock.isActive()) {
            this.indentation.increaseBlockLevel();
            query = this.addNewline(query);
        }
        return query;
    };
    Formatter.prototype.formatClosingParentheses = function (token, query) {
        token.value = this.formatCase(token.value);
        if (this.inlineBlock.isActive()) {
            this.inlineBlock.end();
            return this.formatWithSpaceAfter(token, query);
        }
        else {
            this.indentation.decreaseBlockLevel();
            return this.formatWithSpaces(token, this.addNewline(query));
        }
    };
    Formatter.prototype.formatPlaceholder = function (token, query) {
        return query + this.params.get(token) + ' ';
    };
    Formatter.prototype.formatComma = function (token, query) {
        query = trimSpacesEnd(query) + token.value + ' ';
        if (this.inlineBlock.isActive()) {
            return query;
        }
        else if (/^LIMIT$/iu.test(this.previousReservedWord.value)) {
            return query;
        }
        else {
            return this.addNewline(query);
        }
    };
    Formatter.prototype.formatWithSpaceAfter = function (token, query) {
        return trimSpacesEnd(query) + token.value + ' ';
    };
    Formatter.prototype.formatWithoutSpaces = function (token, query) {
        return trimSpacesEnd(query) + token.value;
    };
    Formatter.prototype.formatWithSpaces = function (token, query) {
        var value = token.type === types_1.TokenTypes.RESERVED ? this.formatReservedWord(token.value) : token.value;
        return query + value + ' ';
    };
    Formatter.prototype.formatReservedWord = function (value) {
        return this.formatCase(value);
    };
    Formatter.prototype.formatQuerySeparator = function (token, query) {
        this.indentation.resetIndentation();
        var lines = '\n';
        if (this.cfg.linesBetweenQueries !== 'preserve') {
            lines = '\n'.repeat(this.cfg.linesBetweenQueries || 1);
        }
        return trimSpacesEnd(query) + token.value + lines;
    };
    Formatter.prototype.addNewline = function (query) {
        query = trimSpacesEnd(query);
        if (!query.endsWith('\n'))
            query += '\n';
        return query + this.indentation.getIndent();
    };
    Formatter.prototype.previousToken = function () {
        return this.tokens[this.index - 1] || { type: null, value: null };
    };
    Formatter.prototype.formatCase = function (value) {
        if (this.cfg.reservedWordCase === 'upper')
            return value.toUpperCase();
        if (this.cfg.reservedWordCase === 'lower')
            return value.toLowerCase();
        return value;
    };
    return Formatter;
}());
exports["default"] = Formatter;
