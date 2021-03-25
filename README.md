# Nezparser

Nezparser is a simple light parser for building cli with node.js.

# Installation 
using npm `npm i nezparser`

using yarn `yarn add nezparser`

# Setup

use `nezparser.setup()` to configure your cli.

|api|type|description|required
|-|-|-|-|
|usage|**String**|Explain how to use your cli.|Yes|
|options|[options](#Options)|Define options the user can use.|No|
|commands|[commands](#Commands)|Define the commands the user can use.|No|

```javascript
nezparser.setup({
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

Once you have setup nezparser, you have to use `nezparser.parse()` **before** 
accessing [commands](#Commands) and [options](#Options).

# Commands

:pushpin: You have to use `nezparser.parse()` [Parse](#Parse) **before** `nezparser.hasCommand(command: string)`

|Api|Return type|Description|
|-|||
|**Function** `commandUsed(command: string)`|**Boolean**|Allow you to know if a command is used.

```javascript
const nezparser = require('nezparser');

nezparser.setup({
  // ...
});
nezparser.parse();
if (nezparser.commandUsed('init')) {
  console.log('Command "init" used');
};
```

## Help

Nezparser includes `help` command that output cli usage, commands and options.

# Options

:pushpin: You have to use `nezparser.parse()` [Parse](#Parse) **before** `nezparser.hasOption(option: string, alias: string)`



|Api|Return type|Description|
|-|||
|**Function** `hasOption(option: string, alias: string)`|**Boolean**|Allow you to know if an option is used.


```javascript
const nezparser = require('nezparser');

nezparser.setup({
  // ...
});
nezparser.parse();
if (nezparser.hasOption('--foo', '-f',)) {
  console.log('--foo option passed');
}
```

# Example

Go to [commity](https://github.com/PierreDemailly/commity/blob/main/README.md) to see how it works.
