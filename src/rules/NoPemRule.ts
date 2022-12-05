import { IRule } from "./IRule";
import gitlog from "gitlog";
import { IReport } from "./IReport";

export class NoPemRule implements IRule {

    async pass(rootDir: string): Promise<IReport[]> {
        const commits = gitlog({
            repo: rootDir,
            number: 9_999_999,
            execOptions: { maxBuffer: 1000 * 1024 },
            file: "*.pem"
        })

        const reports: IReport[] = [];

        for (const commit of commits) {
            for (const file of commit.files) {


                const indexOf = commit.files.indexOf(file)
                const status = commit.status[indexOf];

                // ignore deleted files
                if (status == "D") continue;

                reports.push({
                    file: file,
                    hash: commit.hash,
                    problem: "No .pem files allowed"
                });
            }
        }

        return reports;
    }
}