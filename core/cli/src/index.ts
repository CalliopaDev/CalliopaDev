// MUST use chalk 4.1.2 because 5 does not support require anymore
// see: https://stackoverflow.com/questions/70309135/chalk-error-err-require-esm-require-of-es-module
import path from "node:path";
import chalk from "chalk";

//import { ISystem } from "@calliopadev/architecture";

import { createProgram, loadSystemConfiguration } from "./program";

const systemDefinition = loadSystemConfiguration(
    createProgram(path.join(__dirname, "../package.json")),
    process.argv,
);

if (!systemDefinition) {
    console.error(
        "Could not load the system definition from the provided config file",
    );
    process.exit(1);
}

console.log("Configuration name: ", chalk.blue.bold(systemDefinition.name));
