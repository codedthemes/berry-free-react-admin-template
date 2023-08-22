import { Config, Token } from './core/types';
export declare const format: (query: string, cfg?: Config) => string;
export declare const tokenize: (query: string, cfg?: Config) => Token[];
declare const _default: {
    format: (query: string, cfg?: Config) => string;
    tokenize: (query: string, cfg?: Config) => Token[];
};
export default _default;
