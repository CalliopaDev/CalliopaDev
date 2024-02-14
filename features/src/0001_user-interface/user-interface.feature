Feature: User Interface

    The intended user is a developer. Therefore, a command line Interface (CLI) is
    appropriate.

    CLIs also aid automation, thus adding to the principle "everything as code".

    Calliopa accepts the following arguments.
    
    | flag              | effect                                            |
    | -c, --config      | specify the path to the `calliopa` configuration  |
    | -e, --environment | specify the environment to use                    |
    | <without>         | specify the command to run                        |


    Scenario: Access the CLI with configuration flag

        The `calliopa` command takes multiple flagged options.

        Scenario Outline: Configuration flag

            The path can be specified as an absolute or a relative path.

            Given <filepath> contains a valid Calliopa configuration file.
            When we run the `calliopa` command with <filepath> as value for <flag>.
            Then CalliopaDev uses <filepath> as configuration.
            
            Examples:
                | flag      | filepath                    |
                | --config  | `relative/path/to/examples/simple`  |
                | -c        | `/absolute/path/to/examples/simple`  |

    
    Scenario: Unspecified configuration flag

        Calliopa uses a default path if no --config path is specified

        When we run `calliopa` without the configuration flag
        Then CalliopaDev uses the relative default path to the configuration file  ./calliopa.config.js


    Scenario: Invalid configuration flag

        Calliopa requires a valid configuration file

        Given the specified config path does not contain a valid Calliopa configuration file. 
        When we run `calliopa` without an invalid configuration flag
        Then CalliopaDev exits with a hint that the configuration flag is invalid
    

    Scenario: Access the CLI with environment flag

        Scenario Outline: Environment flag
            Given <environment> contains a specified environment
            When we run the `calliopa` command with <environment> as value for <flag>.
            Then CalliopaDev uses the <environment> environment.
            
            Examples:
                | flag          | environment   |
                | --environment | hotDev        |
                | -e            | uat           |


    Scenario: Access the CLI with command

        Scenario Outline: Command
            When we run the `calliopa` with <command> as command.
            Then CalliopaDev runs this command.
            
            Examples:
                | command       |
                | start         |
                | build         |

