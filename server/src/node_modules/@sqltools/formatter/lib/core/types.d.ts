export declare enum TokenTypes {
    WHITESPACE = "whitespace",
    WORD = "word",
    STRING = "string",
    RESERVED = "reserved",
    RESERVED_TOP_LEVEL = "reserved-top-level",
    RESERVED_TOP_LEVEL_NO_INDENT = "reserved-top-level-no-indent",
    RESERVED_NEWLINE = "reserved-newline",
    OPERATOR = "operator",
    NO_SPACE_OPERATOR = "no-space-operator",
    OPEN_PAREN = "open-paren",
    CLOSE_PAREN = "close-paren",
    LINE_COMMENT = "line-comment",
    BLOCK_COMMENT = "block-comment",
    NUMBER = "number",
    PLACEHOLDER = "placeholder",
    SERVERVARIABLE = "servervariable"
}
export interface Config {
    indent?: string;
    params?: Object;
    reservedWordCase?: 'upper' | 'lower';
    language?: 'sql' | 'db2' | 'n1ql' | 'pl/sql';
    linesBetweenQueries?: number | 'preserve';
}
export interface TokenizerConfig {
    reservedWords: string[];
    reservedTopLevelWords: string[];
    reservedNewlineWords: string[];
    reservedTopLevelWordsNoIndent: string[];
    stringTypes: string[];
    openParens: string[];
    closeParens: string[];
    indexedPlaceholderTypes?: string[];
    namedPlaceholderTypes: string[];
    lineCommentTypes: string[];
    specialWordChars: string[];
}
export interface Token {
    type: TokenTypes;
    value: string;
    key?: string;
}
