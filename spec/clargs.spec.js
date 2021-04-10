/* eslint-disable no-undef */
const sinon = require('sinon');
const referee = require('@sinonjs/referee');
const sinonChai = require('sinon-chai');
const chai = require('chai');

const clargs = require('../bin/clargs');

const { assert } = referee;
const { expect } = chai;

chai.use(sinonChai);

describe('clargs', () => {
  it('should setup', () => {
    clargs.setup({
      usage: 'commity <command> <options>',
      options: [
        {
          name: '--push',
          alias: '-p',
          description: 'push changes to current remote branch after commiting',
        },
      ],
      commands: [
        {
          name: 'init',
          description: 'inititialize Commity',
          options: [
            {
              name: '--overwrite',
              alias: '-o',
              description: 'overwrite existing config (if exist)',
            },
          ],
        },
      ],
    });
    expect(clargs.usage).to.equal('commity <command> <options>');
    expect(clargs.commands[0].name).to.equal('init');
    expect(clargs.options[0].name).to.equal('--push');
  });

  it('should run help', () => {
    spyOn(clargs, 'help').and.returnValue(true);
    process.argv = [0, 0, 'help'];
    sinon.spy(clargs, 'help');
    clargs.parse();
    assert(clargs.help.called);
  });

  it('commandUsed should throw', () => {
    expect(() => clargs.commandUsed('help')).to.throw('command "help" is handled by clargs');
  });

  it('should help', () => {
    spyOn(process, 'exit').and.returnValue(true);
    sinon.spy(console, 'log');
    clargs.help();
    assert(console.log.called);
    expect(console.log).to.have.callCount(3);
  });

  it('commandUsed should return true', () => {
    process.argv = [0, 0, 'foo'];
    clargs.parse();
    expect(clargs.commandUsed('foo')).to.equal(true);
  });

  it('commandUsed should return false', () => {
    process.argv = [0, 0, 'foo'];
    clargs.parse();
    expect(clargs.commandUsed('bar')).to.equal(false);
  });

  it('hasOption should return true', () => {
    process.argv = [0, 0, '--bar'];
    clargs.parse();
    expect(clargs.hasOption('bar', 'b')).to.equal(true);
  });

  it('hasOption should return true', () => {
    process.argv = [0, 0, '-b'];
    clargs.parse();
    expect(clargs.hasOption('bar', 'b')).to.equal(true);
  });

  it('hasOption should return false', () => {
    process.argv = [0, 0, 'foo'];
    clargs.parse();
    expect(clargs.hasOption('bar', 'b')).to.equal(false);
  });
});
