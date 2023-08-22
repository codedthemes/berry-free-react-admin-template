import { Config, Token, TokenizerConfig } from '../../core/types';
import Tokenizer from '../../core/Tokenizer';
export default abstract class AbstractFormatter {
    cfg: Config;
    constructor(cfg: Config);
    abstract getTokenizerConfig(): TokenizerConfig;
    format(query: string): string;
    tokenize(query: string): Token[];
    tokenizer(): Tokenizer;
    protected tokenOverride?: (token: Token, previousToken?: Token) => Token;
}
