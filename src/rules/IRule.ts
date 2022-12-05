import { IReport } from "./IReport";

export interface IRule {
    pass(rootDir: string): Promise<IReport[]>;
}