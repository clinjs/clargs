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

export interface OnCommandFailed {
  failed: boolean;
}

export interface OnCommand {
  so: (cb: any) => OnCommandFailed;
}

export interface Inezparser {
  args: [];
  options: Options;
  commands: Comamnds;
  setup(options: SetupOption): void;
  parse(): void;
  on(cb: any): OnCommand;
  help(): void;
  hasOption(option: string, alias: string): boolean
}

declare module "nezparser" {
  args: [];
  options: Options;
  commands: Comamnds;
  function setup(options: SetupOption): void;
  function parse(): void;
  function on(cb: any): OnCommand;
  function help(): void;
  function hasOption(option: string, alias: string): boolean
}
