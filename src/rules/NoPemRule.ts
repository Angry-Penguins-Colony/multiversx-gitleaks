import { IRule } from "./IRule";
import gitlog from "gitlog";
import { IReport } from "./IReport";

export class NoPemRule implements IRule {
    getName(): string {
        return "No pem";
    }

    pass(rootDir: string): IReport[] {
        const commits = gitlog({
            repo: rootDir,
            number: 9_999_999,
            execOptions: { maxBuffer: 1000 * 1024 },
            file: "*.pem"
        })

        // remove duplicates
        return commits.map(c => c.files)
            .flat()
            .filter((v, i, a) => a.indexOf(v) === i)
            .map(r => {
                return {
                    file: r,
                    problem: "Pem file found"
                } as IReport;
            });
    }
}