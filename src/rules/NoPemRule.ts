import { IRule } from "./IRule";

export class NoPemRule implements IRule {
    getName(): string {
        return "No pem";
    }

    pass(): void {
        throw new Error("Method not implemented.");
    }
}