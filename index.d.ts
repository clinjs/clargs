export interface Option {
  name: string;
  alias: string;
  description: string;
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

export interface Inezparser {
  args: [];
  options: Options;
  commands: Commands;
  setup(options: SetupOptions): void;
  parse(): void;
  hasCommand(cb: any): boolean;
  help(): void;
  hasOption(option: string, alias: string): boolean
}

declare module "nezparser" {
  args: [];
  options: Options;
  commands: Commands;
  function setup(options: SetupOptions): void;
  function parse(): void;
  function hasCommand(command: string): boolean;
  function help(): void;
  function hasOption(option: string, alias: string): boolean
}
