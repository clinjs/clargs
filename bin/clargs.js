#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */

const nezbold = require('nezbold');

const clargs = {
  args: null,
  options: null,
  commands: null,

  setup(options) {
    this.usage = options.usage;
    this.options = options.options;
    this.commands = options.commands;
  },

  parse() {
    this.args = process.argv.slice(2);

    if (this.args.length === 1 && this.args[0] === 'help') {
      this.help();
    }
  },

  commandUsed(command) {
    if (command === 'help') {
      throw new Error('command "help" is handled by clargs');
    }
    return this.args?.length > 0 ? this.args[0] === command : false;
  },

  help() {
    const usage = this.usage ? `Usage: ${this.usage} \r\n` : '';
    let optionsToString = '';
    for (const option of this.options) {
      optionsToString += `\n  ${option.alias}, ${option.name}, ${option.description}\r`;
    }
    const options = this.options ? `Options: ${optionsToString}` : '';
    let commandsToString = '';
    for (const command of this.commands) {
      const firstCommand = command === this.commands[0];
      commandsToString += `${firstCommand ? '\n' : '\n\n'}  ${nezbold.bold(command.name)} ${command.description} `;
      if (command.options) {
        let commandOptionsToString = '';
        for (const option of command.options) {
          let spaces = '';
          // eslint-disable-next-line no-return-assign
          Array.from(command.name).map(() => spaces += ' ');
          commandOptionsToString += `\n${spaces}${option.alias}, ${option.name}, ${option.description}\r`;
        }
        commandsToString += commandOptionsToString ? `  ${commandOptionsToString}` : '';
      }
    }
    const commands = this.commands ? `\nCommands: \n${commandsToString}` : '';
    console.log(usage);
    console.log(options);
    console.log(commands);
    process.exit();
  },

  hasOption(name, alias) {
    for (const arg of this.args) {
      if (arg.replace('--', '') === name || arg.replace('-', '') === alias) {
        return true;
      }
    }
    return false;
  },
};

module.exports = clargs;
