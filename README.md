# Clargs

Clargs is a simple light parser for building cli with node.js.

# Installation 
using npm `npm i @clinjs/clargs`

using yarn `yarn add @clinjs/clargs`

# Setup

use `clargs.setup()` to configure your cli.

|api|type|description|required
|-|-|-|-|
|usage|**String**|Explain how to use your cli.|Yes|
|options|[Option](#option)|Define options the user can use.|No|
|commands|[Command](#command)|Define the commands the user can use.|No|

```javascript
clargs.setup({
  usage: 'commity <command> <options>',
  options: [
    {
      name: '--push',
      alias: '-p',
      description: 'push changes to current remote branch after commiting',
    },
    {
      name: '--addAll',
      alias: '-a',
      description: 'add all staged changes before commiting',
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
```

# Parse

Once you have setup clargs, you have to use `clargs.parse()` **before** 
accessing [commands](#Commands) and [options](#Options).

# Commands

:pushpin: You have to use `clargs.parse()` [Parse](#Parse) **before** `clargs.hasCommand(command: string)`

|Api|Return type|Description|
|-|-|-|
|**Function** `commandUsed(command: string)`|**Boolean**|Allow you to know if a command is used.

```javascript
const clargs = require('@clinjs/clargs');

clargs.setup({
  // ...
});
clargs.parse();
if (clargs.commandUsed('init')) {
  console.log('Command "init" used');
};
```

## Help

Clargs includes `help` command that output cli usage, commands and options.

# Options

:pushpin: You have to use `clargs.parse()` [Parse](#Parse) **before** `clargs.hasOption(option: string, alias: string)`



|Api|Return type|Description|
|-|-|-|
|**Function** `hasOption(option: string, alias: string)`|**Boolean**|Allow you to know if an option is used.


```javascript
const clargs = require('@clinjs/clargs');

clargs.setup({
  // ...
});
clargs.parse();
if (clargs.hasOption('foo', 'f')) {
  console.log('--foo option passed');
}
```

# Interfaces

## Option
```ts
interface Option {
    name: string;
    alias: string;
    description: string;
}
```

## Command
```ts
interface Command {
    name: string;
    description: string;
    options: Option[];
}
```
