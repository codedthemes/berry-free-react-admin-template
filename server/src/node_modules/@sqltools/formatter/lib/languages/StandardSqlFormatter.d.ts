import AbstractFormatter from './utils/abstract';
import { TokenizerConfig } from '../core/types';
export default class StandardSqlFormatter extends AbstractFormatter {
    getTokenizerConfig(): TokenizerConfig;
}
