const tap = require('tap');
const clargs = require('../bin/clargs.js');

const mockSetup = { 
  programName: "My Awesome Program", 
  usage: "MyAwesomeProgram <command> <options>",
  commands: [
    {
      name: "command1",
      description: "command1's description"
    }, {
      name: "command2",
      description: "command2's description",
      options: [
       { 
        name: "opt1",
        alias: "o",
        description: "opt1's description"
      }
      ]
    }
  ]
};

tap.ok(clargs, "it should import the lib");

tap.test("clargs.setup", t => {
  t.test("should throw because options.programName is required", tb => {
    try {
      clargs.setup();
    } catch (e) {
      tb.equal(e.message, "options.programName is required.")
    } finally {
      tb.end();
    }
  });

  t.test("should throw because options.usage is required", tb => {
    try {
      clargs.setup({ programName: "My Awesome Program"});
    } catch (e) {
      tb.equal(e.message, "options.usage is required.")
    } finally {
      tb.end();
    }
  });

  t.test('should parse process.argv', tb => {
    process.argv = [,, "command", "--option"]
    clargs.setup({ programName: "My Awesome Program", usage: "MyAwesomeProgram <command> <options>", options: { allowUnkown: true } });

    tb.ok(clargs.args, ["command", "--options"]);
    tb.end();
  });

  t.test("should parse declared commands & options", tb => {
    process.argv = [,, "command1", "command2", "--opt1"];
    clargs.setup(mockSetup);

    tb.ok(clargs.commandUsed("command1"));
    tb.ok(clargs.commandUsed("command2"));

    tb.end();
  });

  t.test("should throw when command is not declared", tb => {
    process.argv = [,, "unkown command", "--opt1"];

    try {
      clargs.setup(mockSetup);
    } catch (error) {
      tb.equal(error.message, `unkown command is not valid. Run "My Awesome Program help" to see valid commands and options`)
    } finally {
      tb.end();
    }
  })

  t.end();
});
