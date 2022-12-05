import { IRule } from "./IRule";
import GitLog from "gitlog";

export class NoPemRule implements IRule {
    getName(): string {
        return "No pem";
    }

    pass(): void {
        const commits = GitLog({
            repo: __dirname,
            number: 9_999_999,
            execOptions: { maxBuffer: 1000 * 1024 },
        })

        console.log(commits);

        throw new Error("Method not implemented.");
    }
}