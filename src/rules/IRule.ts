export interface IRule {
    getName(): string;
    pass(): void;
}