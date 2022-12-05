import { IRule } from "./IRule";
import GitLog from "gitlog";

export class NoPemRule implements IRule {
    getName(): string {
        return "No pem";
    }

    pass(rootDir: string): void {
        const commits = GitLog({
            repo: rootDir,
            number: 9_999_999,
            execOptions: { maxBuffer: 1000 * 1024 },
            file: "*.pem"
        })

        console.log(commits);

        throw new Error("Method not implemented.");
    }
}