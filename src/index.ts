import { NoJsonWalletRule } from "./rules/NoJsonWalletRule"
import { NoPemRule } from "./rules/NoPemRule"
import { hideBin } from 'yargs/helpers'
import yargs from "yargs";
import { checkRules } from "./rules/checkRules";

const argv = yargs(hideBin(process.argv))
    .command('<path>', 'Repo path')
    .demandCommand(1)
    .parseSync();

const rootDir = argv._[0] as string;

checkRules(rootDir, [
    new NoPemRule(),
    new NoJsonWalletRule()
]);

