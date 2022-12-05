import { NoJsonWalletRule } from "./rules/NoJsonWalletRule"
import { NoPemRule } from "./rules/NoPemRule"

console.log('Hello world!')

// TODO: check if .pem
// TODO: check if .log

const rules = [
    new NoPemRule(),
    new NoJsonWalletRule()
];

rules.forEach(rule => {
    console.log("Running rule " + rule.getName());
    rule.pass();
    console.log("Rule " + rule.getName() + " passed");
});