import AbstractFormatter from './utils/abstract';
import { TokenizerConfig } from '../core/types';
export default class N1qlFormatter extends AbstractFormatter {
    getTokenizerConfig(): TokenizerConfig;
}
