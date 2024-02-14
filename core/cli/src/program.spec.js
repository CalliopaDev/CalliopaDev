import { describe } from "node:test";
import { expect, jest, test } from "@jest/globals";
import { ISystem } from "@calliopadev/architecture";
import { createProgram, loadSystemConfiguration } from "./program";

// must be imported to be referenced in the test docstring
import { simpleConfigContainsValidConfiguration } from "@calliopadev/features/0001_user-interface/configuration-flag";


const version = "0.1.0";
const name = "test";
const description = "program description";
const mockedConfiguration = {
    name: "mocked configuration file",
};

const mockedBaseConfiguration = {
    name: "mocked base configuration file",
};

/**
 *
 */
jest.mock(
    "package.json",
    () => ({
        version,
        name,
        description,
    }),
    { virtual: true },
);

/**
 * mock the custom config.js file
 */
jest.mock(
    "/home/frank/projekte/CalliopaDev/core/cli/config.js",
    () => ({
        default: mockedConfiguration,
    }),
    { virtual: true },
);

/**
 * mock the base calliopa.config.js file
 */
jest.mock(
    "/home/frank/projekte/CalliopaDev/core/cli/calliopa.config.js",
    () => ({
        default: mockedBaseConfiguration,
    }),
    { virtual: true },
);

/**
 * Specification: the program takes its metadata from the `package.json`.
 *
 * This includes the name, the description and the version.
 *
 * @returns {void}
 */
function metaDataFromJson() {
    return describe("the program", () => {
        test("takes its metadata from the `package.json`", () => {
            const program = createProgram("package.json");

            expect(program.name()).toBe(name);
            expect(program.description()).toBe(description);
            expect(program.version()).toBe(version);
        });
    });
}

metaDataFromJson();

/**
 * Specification: program accepts `configuration-flag`
 * {@link simpleConfigContainsValidConfiguration}
 */
function acceptAndRequireConfigFileOption() {
    return describe("the program", () => {
        test("accepts the '-c' flag", () => {
            const program = createProgram("package.json");

            expect(
                program.options.find((option) => option?.short === "-c"),
            ).toBeDefined();
        });

        test("accepts the '--config' flag", () => {
            const program = createProgram("package.json");

            expect(
                program.options.find((option) => option?.long === "--config"),
            ).toBeDefined();
        });

        test("uses 'calliopa.config.js' if no '--config' or '-c' flag is provided", () => {
            const program = createProgram("package.json");

            expect(
                program.options.find((option) => option?.long === "--config")
                    ?.mandatory,
            ).toBe(true);
        });
    });
}
acceptAndRequireConfigFileOption();


/**
 * Specification: program uses the provided configuration file
 */
function usesTheProvidedConfigurationFile() {
    return describe("the program", () => {
        test("uses the provided configuration file given a relative path", () => {
            const systemDefinition = loadSystemConfiguration(
                createProgram("package.json"),
                ["node", "cli.js", "--config", "config.js"],
            );

            expect(systemDefinition.name).toBe(mockedConfiguration.name);
        });

        test("uses the provided configuration file given an absolute path", () => {
            const systemDefinition = loadSystemConfiguration(
                createProgram("package.json"),
                ["node", "cli.js", "--config", "/home/frank/projekte/CalliopaDev/core/cli/config.js"],
            );

            expect(systemDefinition.name).toBe(mockedConfiguration.name);
        });

        test("uses the default configuration if no config path is specified", () => {
            const systemDefinition = loadSystemConfiguration(
                createProgram("package.json"),
                ["node", "cli.js"],
            );

            expect(systemDefinition.name).toBe(mockedBaseConfiguration.name);
        });

        test("fails if the provided configuration does not exist", () => {
            const systemDefinition = loadSystemConfiguration(
                createProgram("package.json"),
                ["node", "cli.js", "--config", "not-exists.js"],
            );

            expect(systemDefinition).toBeUndefined();
        });
    });
}
usesTheProvidedConfigurationFile();

/**
 * add the config option
 * implements {@link When(
   specifies environment-flag#when('we run the `calliopa` command with hotDev as value for --environment.',}
 */
function acceptAndRequireEnvironmentOption() {
    return describe("the program", () => {
        test("accepts the '-e' flag", () => {
            const program = createProgram("package.json");

            expect(
                program.options.find((option) => option?.short === "-e"),
            ).toBeDefined();
        });

        test("accepts the '--environment' flag", () => {
            const program = createProgram("package.json");

            expect(
                program.options.find(
                    (option) => option?.long === "--environment",
                ),
            ).toBeDefined();
        });

        test("requires the '--environment' or '-e' flag", () => {
            const program = createProgram("package.json");

            expect(
                program.options.find(
                    (option) => option?.long === "--environment",
                )?.mandatory,
            ).toBe(true);
        });
    });
}
acceptAndRequireEnvironmentOption();
