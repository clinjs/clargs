#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */

const nezbold = require("nezbold");

const clargs = {
  args: null,
  options: null,
  commands: null,

  setup(options) {
    if (!this.options.programName) {
      throw new Error("options.programName is mandatory.");
    }

    this.programName = options.programName;
    this.usage = options.usage;
    this.options = options.options;
    this.commands = options.commands;
  },

  parse() {
    this.args = process.argv.slice(2);

    this.validateArgs();

    if (this.args.length === 1 && this.args[0] === "help") {
      this.help();
    }
  },

  commandUsed(command) {
    if (command === "help") {
      throw new Error("command \"help\" is handled by clargs");
    }

    return this.args?.length > 0 ? this.args[0] === command : false;
  },

  help() {
    const usage = this.usage ? `Usage: ${this.usage} \r\n` : "";
    console.log(usage);

    const options = this.options ? `Options: ${this.options.map((
      (option) => `\n  ${option.alias}, ${option.name}, ${option.description}\r`
    ))}` : "";
    console.log(options);

    let commandsToString = "";

    for (const command of this.commands) {
      const firstCommand = command === this.commands[0];
      commandsToString += `${firstCommand ? "\n" : "\n\n"}  ${nezbold.bold(command.name)} ${command.description} `;

      if (command.options) {
        let commandOptionsToString = "";

        for (const option of command.options) {
          const spaces = "".padStart(command.name.length, " ");
          commandOptionsToString += `\n${spaces}${option.alias}, ${option.name}, ${option.description}\r`;
        }

        commandsToString += commandOptionsToString ? `  ${commandOptionsToString}` : "";
      }
    }

    const commands = this.commands ? `\nCommands: \n${commandsToString}` : "";
    console.log(commands);

    return;
  },

  hasOption(name, alias) {
    for (const arg of this.args) {
      if (arg.replace("--", "") === name || arg.replace("-", "") === alias) {
        return true;
      }
    }

    return false;
  },

  validateArgs() {
    if (this.options.allowUnkown) {
      return;
    }

    const validArgs = [...this.commands].concat(this.options);

    for (const arg of this.args) {
      if (!validArgs.includes(arg)) {
        throw new Error(`${arg} is not valid. Run "${programName} help" to see valid commands and options`);
      }
    }
  }
};

module.exports = clargs;
