#!/usr/bin/env node

/**
 * @typedef CommandOptions
 * @type {object}
 * @property {string} description - description of the option.
 * @property {string} name - name of the option
 */

const nezparser = {
  args: null,
  commands: [],
  programName: null,

  setProgramName(name) {
    this.programName = name;
  },

  setProgramDesc(desc) {
    this.desc = desc;
  },

  /**
   *
   * @param {string} command
   * @param {CommandOptions[]} options
   */
  setCommand(command, options) {
    if (command === '') {
      throw Error('You cannot use empty command');
    }
    this.commands.push({
      command,
      options,
    });
  },

  /**
   * @param {CommandOptions[]} options
   */
  setOptions(options) {
    this.commands.push({ command: '', options });
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
    if (!this.programName) {
      throw Error('You need to setup programName, please use `setProgramName`');
    }
    if (!this.setProgramDesc) {
      throw Error('You need to setup programDesc, please use `setProgramDesc`');
    }
    console.log(this.programName + ' usage:');
    console.log(this.programName + ' - ' + this.setProgramDesc);

    const programCommand = this.commands.find((c) => c.command === '') || {};
    if (programCommand.options) {
      console.log(this.programName + ' options:');
      for (const option of options) {
        console.log(option.name + ' - ' + option.description);
      }
    }
  },
};
