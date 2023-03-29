const clargs = require("../bin/clargs.js");
const { describe, it } = require("node:test");
const assert = require("assert");

const mockSetup = {
  programName: "My Awesome Program",
  usage: "MyAwesomeProgram <command> <options>",
  commands: [
    {
      name: "command1",
      description: "command1's description",
      options: [
        {
          name: "opt1",
          alias: "o",
          description: "opt1's description"
        }
      ]
    }
  ],
  options: [
    {
      name: "random",
      alias: "r",
      description: "random's description"
    }
  ]
};

assert.ok(clargs, "it should import the lib");

describe("clargs.setup", () => {
  it("should throw because options.programName is required", () => {
    assert.throws(() => clargs.setup(), {
      message: "options.programName is required."
    });
  });

  it("should throw because options.usage is required", () => {
    assert.throws(() => clargs.setup({ programName: "My Awesome Program" }), {
      message: "options.usage is required."
    });
  });

  it("should parse process.argv", () => {
    process.argv = [null, null, "command", "--option"];
    clargs.setup({
      programName: "My Awesome Program",
      usage: "MyAwesomeProgram <command> <options>",
      options: { allowUnkown: true }
    });

    assert.ok(clargs.args, ["command", "--options"]);
  });

  it("should parse declared commands & options", () => {
    process.argv = [null, null, "command1", "--opt1"];
    clargs.setup(mockSetup);

    assert.ok(clargs.commandUsed("command1"));
    assert.ok(clargs.hasOption("opt1"));
  });

  it("should throw when command is not declared", () => {
    process.argv = [null, null, "unkown command", "--opt1"];

    assert.throws(() => clargs.setup(mockSetup), {
      message: "Command unkown command is not valid. Run \"My Awesome Program help\" to see valid commands."
    });
  });

  it("should throw when multiple commands are used", () => {
    process.argv = [null, null, "command1", "command2", "--opt1"];

    assert.throws(() => clargs.setup(mockSetup), {
      message: "Only one command is allowed."
    });
  });

  it("should throw when option is not declared", () => {
    process.argv = [null, null, "command1", "--unkown option"];

    assert.throws(() => clargs.setup(mockSetup), {
      message: "Option unkown option is not valid. Run \"My Awesome Program help\" to see valid options."
    });
  });

  it("should throw when option is declared in unused command", () => {
    process.argv = [null, null, "command2", "--opt1"];

    const mock = { ...mockSetup };
    mock.commands.push({ name: "command2", description: "command2's description" });

    assert.throws(() => clargs.setup(mockSetup), {
      message: "Option opt1 is not valid. Run \"My Awesome Program help\" to see valid options."
    });
  });
});
