import AbstractFormatter from './utils/abstract';
import { TokenizerConfig } from '../core/types';
export default class Db2Formatter extends AbstractFormatter {
    getTokenizerConfig(): TokenizerConfig;
}
