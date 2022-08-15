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
      throw new Error('options.usage is required.');
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
    } catch (error) {
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

    // TODO: the `includes` may lead to unexpected behavior.
    // node xx.js myCommand --myOption whatIsThis
    // `commandUsed("whatIsThis")` is truthy. Need to check:  
    // -the use of command after given options ?
    // -the use of multiple command ?
    // -the use of option without command ?
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
    if (this.options?.allowUnkown) {
      return;
    }

    // it would be better to set `this.comamnds` & `this.options` to `[]` when parsing
    // it would allow to remove some others checks (loops for instance)
    const validArgs = [...this.commands?.flatMap(command => [command.name, command.options?.flatMap(option => [
      `--${option.name}`,
      `-${option.alias}`
    ])]) ?? []].concat(this.options?.flatMap(option => [
      `--${option.name}`,
      `-${option.alias}`
    ]) ?? []).flat();

    console.log('valid args', validArgs);
    for (const arg of this.args) {
      if (!validArgs.includes(arg)) {
        throw new Error(`${arg} is not valid. Run "${this.programName} help" to see valid commands and options`);
      }
    }
  }
};

module.exports = clargs;
