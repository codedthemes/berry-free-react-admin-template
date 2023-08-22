import AbstractFormatter from './utils/abstract';
import { Token, TokenizerConfig } from '../core/types';
export default class PlSqlFormatter extends AbstractFormatter {
    getTokenizerConfig(): TokenizerConfig;
    tokenOverride: (token: Token, previousReservedToken: Token) => Token;
}
