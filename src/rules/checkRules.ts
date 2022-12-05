import { IReport } from "./IReport";
import { IRule } from "./IRule";

export function checkRules(rootDir: string, rules: IRule[]) {

    console.log("Checking repo: " + rootDir);

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

}