"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var escapeRegExp_1 = __importDefault(require("../core/escapeRegExp"));
var types_1 = require("./types");
var Tokenizer = (function () {
    function Tokenizer(cfg) {
        this.WHITESPACE_REGEX = /^(\s+)/u;
        this.NUMBER_REGEX = /^((-\s*)?[0-9]+(\.[0-9]+)?|0x[0-9a-fA-F]+|0b[01]+|([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}))\b/u;
        this.AMBIGUOS_OPERATOR_REGEX = /^(\?\||\?&)/u;
        this.OPERATOR_REGEX = /^(!=|<>|>>|<<|==|<=|>=|!<|!>|\|\|\/|\|\/|\|\||~~\*|~~|!~~\*|!~~|~\*|!~\*|!~|:=|=>|&&|@>|<@|#-|@@|@|.)/u;
        this.NO_SPACE_OPERATOR_REGEX = /^(::|->>|->|#>>|#>)/u;
        this.BLOCK_COMMENT_REGEX = /^(\/\*[^]*?(?:\*\/|$))/u;
        this.LINE_COMMENT_REGEX = this.createLineCommentRegex(cfg.lineCommentTypes);
        this.RESERVED_TOP_LEVEL_REGEX = this.createReservedWordRegex(cfg.reservedTopLevelWords);
        this.RESERVED_TOP_LEVEL_NO_INDENT_REGEX = this.createReservedWordRegex(cfg.reservedTopLevelWordsNoIndent);
        this.RESERVED_NEWLINE_REGEX = this.createReservedWordRegex(cfg.reservedNewlineWords);
        this.RESERVED_PLAIN_REGEX = this.createReservedWordRegex(cfg.reservedWords);
        this.WORD_REGEX = this.createWordRegex(cfg.specialWordChars);
        this.STRING_REGEX = this.createStringRegex(cfg.stringTypes);
        this.OPEN_PAREN_REGEX = this.createParenRegex(cfg.openParens);
        this.CLOSE_PAREN_REGEX = this.createParenRegex(cfg.closeParens);
        this.INDEXED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(cfg.indexedPlaceholderTypes, '[0-9]*');
        this.IDENT_NAMED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(cfg.namedPlaceholderTypes, '[a-zA-Z0-9._$]+');
        this.STRING_NAMED_PLACEHOLDER_REGEX = this.createPlaceholderRegex(cfg.namedPlaceholderTypes, this.createStringPattern(cfg.stringTypes));
    }
    Tokenizer.prototype.createLineCommentRegex = function (lineCommentTypes) {
        var unMatchJSONOperators = '((?<!#)>|(?:[^>]))';
        return new RegExp("^((?:".concat(lineCommentTypes.map(function (c) { return (0, escapeRegExp_1["default"])(c); }).join('|'), ")").concat(unMatchJSONOperators, ".*?(?:\r\n|\r|\n|$))"), 'u');
    };
    Tokenizer.prototype.createReservedWordRegex = function (reservedWords) {
        var reservedWordsPattern = reservedWords.join('|').replace(/ /gu, '\\s+');
        return new RegExp("^(".concat(reservedWordsPattern, ")\\b"), 'iu');
    };
    Tokenizer.prototype.createWordRegex = function (specialChars) {
        return new RegExp("^([\\p{Alphabetic}\\p{Mark}\\p{Decimal_Number}\\p{Connector_Punctuation}\\p{Join_Control}".concat(specialChars.join(''), "]+)"), 'u');
    };
    Tokenizer.prototype.createStringRegex = function (stringTypes) {
        return new RegExp('^(' + this.createStringPattern(stringTypes) + ')', 'u');
    };
    Tokenizer.prototype.createStringPattern = function (stringTypes) {
        var patterns = {
            '``': '((`[^`]*($|`))+)',
            '[]': '((\\[[^\\]]*($|\\]))(\\][^\\]]*($|\\]))*)',
            '""': '(("[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
            "''": "(('[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
            "N''": "((N'[^N'\\\\]*(?:\\\\.[^N'\\\\]*)*('|$))+)",
            "E''": "(((E|e)'[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)"
        };
        return stringTypes.map(function (t) { return patterns[t]; }).join('|');
    };
    Tokenizer.prototype.createParenRegex = function (parens) {
        var _this = this;
        return new RegExp('^(' + parens.map(function (p) { return _this.escapeParen(p); }).join('|') + ')', 'iu');
    };
    Tokenizer.prototype.escapeParen = function (paren) {
        if (paren.length === 1) {
            return (0, escapeRegExp_1["default"])(paren);
        }
        else {
            return '\\b' + paren + '\\b';
        }
    };
    Tokenizer.prototype.createPlaceholderRegex = function (types, pattern) {
        if (!types || types.length === 0) {
            return null;
        }
        var typesRegex = types.map(escapeRegExp_1["default"]).join('|');
        return new RegExp("^((?:".concat(typesRegex, ")(?:").concat(pattern, "))"), 'u');
    };
    Tokenizer.prototype.tokenize = function (input) {
        if (!input)
            return [];
        var tokens = [];
        var token;
        while (input.length) {
            token = this.getNextToken(input, token);
            input = input.substring(token.value.length);
            tokens.push(token);
        }
        return tokens;
    };
    Tokenizer.prototype.getNextToken = function (input, previousToken) {
        return (this.getWhitespaceToken(input) ||
            this.getCommentToken(input) ||
            this.getStringToken(input) ||
            this.getOpenParenToken(input) ||
            this.getCloseParenToken(input) ||
            this.getAmbiguosOperatorToken(input) ||
            this.getNoSpaceOperatorToken(input) ||
            this.getServerVariableToken(input) ||
            this.getPlaceholderToken(input) ||
            this.getNumberToken(input) ||
            this.getReservedWordToken(input, previousToken) ||
            this.getWordToken(input) ||
            this.getOperatorToken(input));
    };
    Tokenizer.prototype.getWhitespaceToken = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.WHITESPACE,
            regex: this.WHITESPACE_REGEX
        });
    };
    Tokenizer.prototype.getCommentToken = function (input) {
        return this.getLineCommentToken(input) || this.getBlockCommentToken(input);
    };
    Tokenizer.prototype.getLineCommentToken = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.LINE_COMMENT,
            regex: this.LINE_COMMENT_REGEX
        });
    };
    Tokenizer.prototype.getBlockCommentToken = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.BLOCK_COMMENT,
            regex: this.BLOCK_COMMENT_REGEX
        });
    };
    Tokenizer.prototype.getStringToken = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.STRING,
            regex: this.STRING_REGEX
        });
    };
    Tokenizer.prototype.getOpenParenToken = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.OPEN_PAREN,
            regex: this.OPEN_PAREN_REGEX
        });
    };
    Tokenizer.prototype.getCloseParenToken = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.CLOSE_PAREN,
            regex: this.CLOSE_PAREN_REGEX
        });
    };
    Tokenizer.prototype.getPlaceholderToken = function (input) {
        return (this.getIdentNamedPlaceholderToken(input) ||
            this.getStringNamedPlaceholderToken(input) ||
            this.getIndexedPlaceholderToken(input));
    };
    Tokenizer.prototype.getServerVariableToken = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.SERVERVARIABLE,
            regex: /(^@@\w+)/iu
        });
    };
    Tokenizer.prototype.getIdentNamedPlaceholderToken = function (input) {
        return this.getPlaceholderTokenWithKey({
            input: input,
            regex: this.IDENT_NAMED_PLACEHOLDER_REGEX,
            parseKey: function (v) { return v.slice(1); }
        });
    };
    Tokenizer.prototype.getStringNamedPlaceholderToken = function (input) {
        var _this = this;
        return this.getPlaceholderTokenWithKey({
            input: input,
            regex: this.STRING_NAMED_PLACEHOLDER_REGEX,
            parseKey: function (v) { return _this.getEscapedPlaceholderKey({ key: v.slice(2, -1), quoteChar: v.slice(-1) }); }
        });
    };
    Tokenizer.prototype.getIndexedPlaceholderToken = function (input) {
        return this.getPlaceholderTokenWithKey({
            input: input,
            regex: this.INDEXED_PLACEHOLDER_REGEX,
            parseKey: function (v) { return v.slice(1); }
        });
    };
    Tokenizer.prototype.getPlaceholderTokenWithKey = function (_a) {
        var input = _a.input, regex = _a.regex, parseKey = _a.parseKey;
        var token = this.getTokenOnFirstMatch({ input: input, regex: regex, type: types_1.TokenTypes.PLACEHOLDER });
        if (token) {
            token.key = parseKey(token.value);
        }
        return token;
    };
    Tokenizer.prototype.getEscapedPlaceholderKey = function (_a) {
        var key = _a.key, quoteChar = _a.quoteChar;
        return key.replace(new RegExp((0, escapeRegExp_1["default"])('\\' + quoteChar), 'gu'), quoteChar);
    };
    Tokenizer.prototype.getNumberToken = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.NUMBER,
            regex: this.NUMBER_REGEX
        });
    };
    Tokenizer.prototype.getOperatorToken = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.OPERATOR,
            regex: this.OPERATOR_REGEX
        });
    };
    Tokenizer.prototype.getAmbiguosOperatorToken = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.OPERATOR,
            regex: this.AMBIGUOS_OPERATOR_REGEX
        });
    };
    Tokenizer.prototype.getNoSpaceOperatorToken = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.NO_SPACE_OPERATOR,
            regex: this.NO_SPACE_OPERATOR_REGEX
        });
    };
    Tokenizer.prototype.getReservedWordToken = function (input, previousToken) {
        if (previousToken && previousToken.value && previousToken.value === '.') {
            return;
        }
        return (this.getToplevelReservedToken(input) ||
            this.getNewlineReservedToken(input) ||
            this.getTopLevelReservedTokenNoIndent(input) ||
            this.getPlainReservedToken(input));
    };
    Tokenizer.prototype.getToplevelReservedToken = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.RESERVED_TOP_LEVEL,
            regex: this.RESERVED_TOP_LEVEL_REGEX
        });
    };
    Tokenizer.prototype.getNewlineReservedToken = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.RESERVED_NEWLINE,
            regex: this.RESERVED_NEWLINE_REGEX
        });
    };
    Tokenizer.prototype.getPlainReservedToken = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.RESERVED,
            regex: this.RESERVED_PLAIN_REGEX
        });
    };
    Tokenizer.prototype.getTopLevelReservedTokenNoIndent = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.RESERVED_TOP_LEVEL_NO_INDENT,
            regex: this.RESERVED_TOP_LEVEL_NO_INDENT_REGEX
        });
    };
    Tokenizer.prototype.getWordToken = function (input) {
        return this.getTokenOnFirstMatch({
            input: input,
            type: types_1.TokenTypes.WORD,
            regex: this.WORD_REGEX
        });
    };
    Tokenizer.prototype.getTokenOnFirstMatch = function (_a) {
        var input = _a.input, type = _a.type, regex = _a.regex;
        var matches = input.match(regex);
        if (matches) {
            return { type: type, value: matches[1] };
        }
    };
    return Tokenizer;
}());
exports["default"] = Tokenizer;
