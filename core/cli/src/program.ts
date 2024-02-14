import path from "node:path";
import { Command } from "commander";
import { ISystem } from "@calliopadev/architecture";

/**
 * the default path to the config file
 */
const defaultConfigPath = './calliopa.config.js';

/**
 * Create the CLI program
 * 
 * {@link acceptAndRequireConfigFileOption }
 *
 * @param pathToPackageJson path to the package.json
 * @returns the `commander` program
 *
 */
export function createProgram(pathToPackageJson: string) {
    const program = new Command();

    const packageJson = require(pathToPackageJson);

    /**
     * create the program and take the name, description and version from the package.json
     * implements {@link import('./program.spec').metaDataFromJson}
     */
    program
        .name(packageJson.name)
        .description(packageJson.description)
        .version(packageJson.version);

    /**
     * add the config option
     * implements {@link import('./program.spec').acceptAndRequireEnvironmentOption}
     */
    program.option("-c, --config <path>", "path to the config file", defaultConfigPath);

    return program;
}

/**
 * Load the user-provided arguments
 *
 * @param args the arguments to parse
 * @returns the system definition if it exists or `undefined` if it does not
 */
export function loadSystemConfiguration(
    program: Command,
    args: string[],
): ISystem | undefined {
    program.parse(args);

    /**
     * get the user-specific options
     */
    const options = program.opts();

    /**
     * try to load the system definition
     */
    try {
        //console.log("Loading system definition from: ", path.join(process.cwd(), options.config));
        return require(path.resolve(options.config)).default;
    } catch (error) {
        console.warn(error);
        return undefined;
    }
}
