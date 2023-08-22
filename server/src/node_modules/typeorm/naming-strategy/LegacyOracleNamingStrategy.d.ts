import { NamingStrategyInterface } from "./NamingStrategyInterface";
import { DefaultNamingStrategy } from "./DefaultNamingStrategy";
/**
 * Shorten strategy
 */
export type ShortenStrategy = "truncate" | "hash";
/**
 * Naming strategy for legacy Oracle database with 30 bytes identifier limit.
 *
 * Currently, only column name must be shorten in order to avoid ORA-00972.
 * Issues with other identifiers were fixed.
 */
export declare class LegacyOracleNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    readonly IDENTIFIER_MAX_SIZE = 30;
    readonly DEFAULT_COLUMN_PREFIX = "COL_";
    protected shortenStrategy: ShortenStrategy;
    constructor(shortenStrategy?: ShortenStrategy);
    columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string;
    protected hashIdentifier(input: string, prefix: string): string;
    protected truncateIdentifier(input: string): string;
}
