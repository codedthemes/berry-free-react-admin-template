export default class InlineBlock {
    private level;
    beginIfPossible(tokens: any, index: any): void;
    end(): void;
    isActive(): boolean;
    isInlineBlock(tokens: any, index: any): boolean;
    isForbiddenToken({ type, value }: {
        type: any;
        value: any;
    }): boolean;
}
