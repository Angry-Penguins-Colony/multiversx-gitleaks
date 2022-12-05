import { IReport } from "./IReport";
import { IRule } from "./IRule";

export async function checkRules(rootDir: string, rules: IRule[]) {

    console.log("Checking repo: " + rootDir);

    const totalReports: IReport[] = [];

    for (const rule of rules) {
        const ruleReport = await rule.pass(rootDir);

        totalReports.push(...ruleReport);
    }

    if (totalReports.length == 0) {
        console.log("All rules passed");
    }
    else {
        console.log("Some rules failed");
        console.table(totalReports);
    }
}