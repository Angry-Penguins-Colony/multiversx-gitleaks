import { IReport } from "./IReport";

export interface IRule {
    getName(): string;
    pass(rootDir: string): Promise<IReport[]>;
}