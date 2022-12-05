import { IReport } from "./IReport";
import { IRule } from "./IRule";
import gitlog from "gitlog";
import fs from "fs";
import { exec } from "child_process";

export class NoJsonWalletRule implements IRule {
    getName(): string {
        return "no json wallet";
    }

    pass(rootDir: string): IReport[] {
        const commits = gitlog({
            repo: rootDir,
            number: 9_999_999,
            execOptions: { maxBuffer: 1000 * 1024 },
            file: "*.json"
        })

        console.log(commits);


        const reports: IReport[] = [];

        for (const commit of commits) {
            for (const file of commit.files) {


                throw new Error("Not implemented");

                const command = "git show " + commit.hash + ":" + file;
                const buffer = exec(command);

                // TODO: read file from its commit
                const content = fs.readFileSync(rootDir + "\\" + file);
                const json = JSON.parse(content.toString());

                if (json.address && json.bech32 && json.crypto) {
                    reports.push({
                        file: file,
                        problem: "Json wallet found",
                        hash: commit.hash
                    });
                }
            }
        }

        return reports;
    }
}
