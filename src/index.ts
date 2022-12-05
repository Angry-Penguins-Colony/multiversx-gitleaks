import { NoJsonWalletRule } from "./rules/NoJsonWalletRule"
import { NoPemRule } from "./rules/NoPemRule"
import { hideBin } from 'yargs/helpers'
import yargs from "yargs";

console.log('Hello world!')

// TODO: check if .pem
// TODO: check if .log


const argv = yargs(hideBin(process.argv))
    .command('<path>', 'Repo path')
    .demandCommand(1)
    .parseSync();

const rootDir = argv._[0] as string;

console.log("Check repo: " + rootDir);

const rules = [
    new NoPemRule(),
    new NoJsonWalletRule()
];

rules.forEach(rule => {
    console.log("Running rule " + rule.getName());
    rule.pass(rootDir);
    console.log("Rule " + rule.getName() + " passed");
});