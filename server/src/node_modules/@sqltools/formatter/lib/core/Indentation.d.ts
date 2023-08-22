export default class Indentation {
    indent?: string;
    indentTypes: any[];
    constructor(indent?: string);
    getIndent(): string;
    increaseTopLevel(): void;
    increaseBlockLevel(): void;
    decreaseTopLevel(): void;
    decreaseBlockLevel(): void;
    resetIndentation(): void;
}
