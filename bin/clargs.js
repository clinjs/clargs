#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */

const nezbold = require("nezbold");

const clargs = {
  args: null,
  options: null,
  commands: null,

  setup(options) {
    if (!options?.programName) {
      throw new Error("options.programName is required.");
    }

    if (!options.usage) {
      throw new Error("options.usage is required.");
    }

    this.programName = options.programName;
    this.usage = options.usage;
    this.options = options.options;
    this.commands = options.commands;

    this.parse();
  },

  parse() {
    this.args = process.argv.slice(2);

    try {
      this.validateArgs();
    }
    catch (error) {
      throw error;
    }

    if (this.args.length === 1 && this.args[0] === "help") {
      this.help();
    }
  },

  commandUsed(command) {
    if (command === "help") {
      throw new Error("command \"help\" is handled by clargs");
    }

    return this.args?.length > 0 ? this.args.includes(command) : false;
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
    const options = this.args.filter((arg) => arg.startsWith("-")).map((arg) => arg.replaceAll("-", ""));
    const commands = this.args.filter((arg) => !arg.startsWith("-"));

    if (commands.length > 1) {
      throw new Error("Only one command is allowed.");
    }

    if (this.options?.allowUnkown) {
      return;
    }

    if (commands.length > 0 && !this.commands.map((cmd) => cmd.name)?.includes(commands[0])) {
      throw new Error(`Command ${commands[0]} is not valid. Run "${this.programName} help" to see valid commands.`);
    }

    for (const option of options) {
      if (!this.options?.flatMap((option) => [option.name, option.alias]).includes(option)) {
        const cmd = this.commands.find((cmd) => cmd.name === commands[0]);
        if (!cmd.options?.flatMap((option) => [option.name, option.alias]).includes(option)) {
          throw new Error(`Option ${option} is not valid. Run "${this.programName} help" to see valid options.`);
        }
      }
    }
  }
};

module.exports = clargs;
