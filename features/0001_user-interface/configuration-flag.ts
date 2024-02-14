const path = require('path');
const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

const { exec } = require('child_process');

// set the node working directory to the root of the project
const basePath = path.resolve(__dirname, "..", "..");
process.chdir(basePath)

const simpleConfigPath = "examples/simple/dist/index.js";
const absolutePathToSimpleConfig = path.join(process.cwd(), simpleConfigPath);

/**
 * This is a test
 */
export const simpleConfigContainsValidConfiguration = () => {
    assert.notEqual(
        require(path.join(process.cwd(), simpleConfigPath)).default, undefined);
}

const absoluteConfigContainsValidConfiguration = () => {
    assert.notEqual(
        require(absolutePathToSimpleConfig).default, undefined);
}

///////////////////////////////////////////////// FIRST SCENARIO /////////////////////////////////////////////////
function givenASimpleConfigContainsValidConfiguration () {
    return Given(
        '`relative\\/path\\/to\\/examples\\/simple` contains a valid Calliopa configuration file.',
        simpleConfigContainsValidConfiguration
    );
}
givenASimpleConfigContainsValidConfiguration();

When(
    'we run the `calliopa` command with `relative\\/path\\/to\\/examples\\/simple` as value for --config.',
    async function () {
        
        const command = `node ./core/cli/dist/cli.js --config ${simpleConfigPath}`;

        return await new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                this.commandOutput = stdout;
                //console.log(`Command output: ${stdout}`);

                if (error || stderr) {
                    console.error(`Error executing command: ${error} - ${stderr}`);
                    return reject(error);
                }
                
                resolve('success');
            });
        })

    }
);


Then(
    'CalliopaDev uses `relative\\/path\\/to\\/examples\\/simple` as configuration.', 
    function () {
        // Write code here that turns the phrase above into concrete actions
        assert.match(this.commandOutput, /simple/);
    }
);

///////////////////////////////////////////////// SECOND SCENARIO /////////////////////////////////////////////////

Given('`\\/absolute\\/path\\/to\\/examples\\/simple` contains a valid Calliopa configuration file.',
    absoluteConfigContainsValidConfiguration
);

  
When('we run the `calliopa` command with `\\/absolute\\/path\\/to\\/examples\\/simple` as value for -c.',
    async function () {
        const command = `node ./core/cli/dist/cli.js -c ${absolutePathToSimpleConfig}`;

        return await new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                this.commandOutput = stdout;
                //console.log(`Command output: ${stdout}`);

                if (error || stderr) {
                    console.error(`Error executing command: ${error} - ${stderr}`);
                    return reject(error);
                }
                
                resolve('success');
            });
        })
    }
);

Then(
    'CalliopaDev uses `\\/absolute\\/path\\/to\\/examples\\/simple` as configuration.',
    function () {
        // Write code here that turns the phrase above into concrete actions
        assert.match(this.commandOutput, /simple/);
    }
);