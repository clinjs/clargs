#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */

const nezbold = require('nezbold');

const nezparser = {
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

  on(command, cb) {
    if (!this.args) {
      return;
    }

    if (this.args.includes(command)) {
      cb();
    }
  },

  help() {
    const usage = this.usage ? `Usage: ${this.usage} \r\n` : '';
    let str = '';
    for (const option of this.options) {
      str += `\n  ${option.alias}, ${option.name}, ${option.description}\r`;
    }
    const options = this.options ? `Options: ${str}` : '';
    str = '';
    for (const command of this.commands) {
      str += `${command === this.commands[0] ? '\n' : '\n\n'}  ${nezbold.nezbold.bold(command.name)} ${command.description} `;
      if (command.options) {
        let oSpaces = '';
        Array.from(command.name).map(() => oSpaces += ' ');
        let strr = '';
        for (const option of command.options) {
          let spaces = '';
          Array.from(command.name).map(() => spaces += ' ');
          strr += `\n${spaces}${option.alias}, ${option.name}, ${option.description}\r`;
        }
        str += strr ? `  ${strr}` : '';
      }
    }
    const commands = this.commands ? `\nCommands: \n${str}` : '';
    console.log(usage);
    console.log(options);
    console.log(commands);
  },
};
