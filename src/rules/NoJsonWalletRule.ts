import { IReport } from "./IReport";
import { IRule } from "./IRule";
import gitlog from "gitlog";
import util from 'util';
const exec = util.promisify(require('child_process').exec);

export class NoJsonWalletRule implements IRule {
    async pass(rootDir: string): Promise<IReport[]> {
        const commits = gitlog({
            repo: rootDir,
            number: 9_999_999,
            execOptions: { maxBuffer: 1000 * 1024 },
            file: "*.json"
        })


        const reports: IReport[] = [];

        for (const commit of commits) {

            for (const file of commit.files) {


                const indexOf = commit.files.indexOf(file)
                const status = commit.status[indexOf];

                // ignore deleted files
                if (status == "D") continue;



                const command = `cd ${rootDir} && git show ${commit.hash}:${file}`;
                const content = (await exec(command)).stdout;

                try {

                    const json = JSON.parse(content.toString());

                    if (json.address && json.bech32 && json.crypto) {
                        reports.push({
                            file: file,
                            problem: "Json wallet found",
                            hash: commit.hash
                        });
                    }
                }
                catch {
                    // skip
                }
            }
        }

        return reports;
    }
}
