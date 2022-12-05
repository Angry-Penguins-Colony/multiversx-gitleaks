export interface IRule {
    getName(): string;
    pass(rootDir: string): void;
}