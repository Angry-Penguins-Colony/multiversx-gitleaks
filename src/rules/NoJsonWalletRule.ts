import { IRule } from "./IRule";

export class NoJsonWalletRule implements IRule {
    getName(): string {
        throw new Error("no json wallet");
    }
    pass(): void {
        throw new Error("Method not implemented.");
    }

}