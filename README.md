# nezparser

nezparser is a light parser for building cli with node.js.

# Installation 

`npm i nezparser`

# Usage

Here is how i'm using it in [commity](https://github.com/PierreDemailly/commity/blob/main/bin/cli.js)
```javascript
const nezparser = require('nezparser');

let initialized = true;

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
        {
          name: '--addAll',
          alias: '-a',
          description: 'add all staged changes before commiting',
        },
      ],
    },
    {
      name: 'setup',
      description: 'inititialize Commity',
      options: [
        {
          name: '--config',
          alias: '-c',
          description: 'config changes to current remote branch after commiting',
        },
      ],
    },
  ],
});
nezparser.parse();

nezparser.on('init').so(() => {
  initialized = false;
  init();
});

if (initialized && nezparser.hasOption('addAll', 'a'))) {
  // ...
}
```
