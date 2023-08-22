"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyOracleNamingStrategy = void 0;
const RandomGenerator_1 = require("../util/RandomGenerator");
const DefaultNamingStrategy_1 = require("./DefaultNamingStrategy");
const error_1 = require("../error");
/**
 * Naming strategy for legacy Oracle database with 30 bytes identifier limit.
 *
 * Currently, only column name must be shorten in order to avoid ORA-00972.
 * Issues with other identifiers were fixed.
 */
class LegacyOracleNamingStrategy extends DefaultNamingStrategy_1.DefaultNamingStrategy {
    constructor(shortenStrategy = "hash") {
        super();
        this.IDENTIFIER_MAX_SIZE = 30;
        this.DEFAULT_COLUMN_PREFIX = "COL_";
        this.shortenStrategy = shortenStrategy;
    }
    columnName(propertyName, customName, embeddedPrefixes) {
        const longName = super.columnName(propertyName, customName, embeddedPrefixes);
        if (this.shortenStrategy === "truncate") {
            return this.truncateIdentifier(longName);
        }
        else if (this.shortenStrategy === "hash") {
            return this.hashIdentifier(longName, this.DEFAULT_COLUMN_PREFIX);
        }
        else {
            throw new error_1.TypeORMError(`Invalid shortenStrategy`);
        }
    }
    hashIdentifier(input, prefix) {
        if (prefix.length >= this.IDENTIFIER_MAX_SIZE) {
            throw new error_1.TypeORMError(`Prefix must be shorter than IDENTIFIER_MAX_SIZE`);
        }
        return (prefix +
            RandomGenerator_1.RandomGenerator.sha1(input).substring(0, this.IDENTIFIER_MAX_SIZE - prefix.length));
    }
    truncateIdentifier(input) {
        if (input.length > this.IDENTIFIER_MAX_SIZE) {
            return input.substring(0, this.IDENTIFIER_MAX_SIZE);
        }
        else {
            return input;
        }
    }
}
exports.LegacyOracleNamingStrategy = LegacyOracleNamingStrategy;

//# sourceMappingURL=LegacyOracleNamingStrategy.js.map
