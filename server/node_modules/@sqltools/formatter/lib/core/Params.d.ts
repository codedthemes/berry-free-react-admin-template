import { Token } from './types';
export default class Params {
    params: Object;
    private index;
    constructor(params: Object);
    get({ key, value }: Token): any;
}
