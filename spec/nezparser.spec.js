/* eslint-disable no-undef */

// eslint-disable-next-line import/order
const sinon = require('sinon');
const referee = require('@sinonjs/referee');
const nezparser = require('../bin/nezparser');

const { assert } = referee;

const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

// jest.mock('nezbold');
// nezbold.bold.mockResolvedValue('bold');

describe('nezparser', () => {
  it('should setup', () => {
    nezparser.setup({
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
    expect(nezparser.usage).to.equal('commity <command> <options>');
    expect(nezparser.commands[0].name).to.equal('init');
    expect(nezparser.options[0].name).to.equal('--push');
  });

  it('should run help', () => {
    spyOn(nezparser, 'help').and.returnValue(true);
    process.argv = [0, 0, 'help'];
    sinon.spy(nezparser, 'help');
    nezparser.parse();
    assert(nezparser.help.called);
  });

  it('commandUsed should throw', () => {
    expect(() => nezparser.commandUsed('help')).to.throw('help is handle by nezparser');
  });

  it('should help', () => {
    spyOn(process, 'exit').and.returnValue(true);
    sinon.spy(console, 'log');
    nezparser.help();
    assert(console.log.called);
    expect(console.log).to.have.callCount(3);
  });

  it('commandUsed should return true', () => {
    process.argv = [0, 0, 'foo'];
    nezparser.parse();
    expect(nezparser.commandUsed('foo')).to.equal(true);
  });

  it('commandUsed should return false', () => {
    process.argv = [0, 0, 'foo'];
    nezparser.parse();
    expect(nezparser.commandUsed('bar')).to.equal(false);
  });

  it('hasOption should return true', () => {
    process.argv = [0, 0, '--bar'];
    nezparser.parse();
    expect(nezparser.hasOption('bar', 'b')).to.equal(true);
  });

  it('hasOption should return true', () => {
    process.argv = [0, 0, '-b'];
    nezparser.parse();
    expect(nezparser.hasOption('bar', 'b')).to.equal(true);
  });

  it('hasOption should return false', () => {
    process.argv = [0, 0, 'foo'];
    nezparser.parse();
    expect(nezparser.hasOption('bar', 'b')).to.equal(false);
  });
});
