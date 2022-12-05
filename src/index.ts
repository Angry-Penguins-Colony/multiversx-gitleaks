import { NoJsonWalletRule } from "./rules/NoJsonWalletRule"
import { NoPemRule } from "./rules/NoPemRule"
import { hideBin } from 'yargs/helpers'
import yargs from "yargs";
import { IRule } from "./rules/IRule";
import { IReport } from "./rules/IReport";

const argv = yargs(hideBin(process.argv))
    .command('<path>', 'Repo path')
    .demandCommand(1)
    .parseSync();

const rootDir = argv._[0] as string;

console.log("Check repo: " + rootDir);

const rules: IRule[] = [
    new NoPemRule(),
    new NoJsonWalletRule()
];

const totalReports: IReport[] = [];

for (const rule of rules) {
    console.log("Running rule " + rule.getName());
    const ruleReport = rule.pass(rootDir);

    totalReports.push(...ruleReport);

    if (ruleReport.length == 0) {
        console.log("Rule " + rule.getName() + " passed");
    }
    else {
        console.log("Rule " + rule.getName() + " failed");
    }
}

if (totalReports.length == 0) {
    console.log("All rules passed");
}
else {
    console.log("Some rules failed");
    console.log(totalReports);
}

