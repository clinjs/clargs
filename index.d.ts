export interface Option {
  name: string;
  alias: string;
  description: string;
  allowUnknown: boolean;
}

export interface Command {
  name: string;
  description: string;
  options: Option[];
}

export type Options = Option[];
export type Commands = Command[];

export interface SetupOptions {
  usage: string;
  options: Options;
  commands: Commands;
}

export interface Iclargs {
  args: [];
  options: Options;
  commands: Commands;
  setup(options: SetupOptions): void;
  parse(): void;
  commandUsed(cb: any): boolean;
  help(): void;
  hasOption(option: string, alias: string): boolean
}

declare module "@clinjs/clargs" {
  args: [];
  options: Options;
  commands: Commands;
  function setup(options: SetupOptions): void;
  function commandUsed(command: string): boolean;
  function help(): void;
  function hasOption(option: string, alias: string): boolean
}
