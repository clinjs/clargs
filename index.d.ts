declare interface Option {
  name: string;
  alias: string;
  description: string;
}

declare interface Command {
  name: string;
  description: string;
  options: Option[];
}

declare type Options = Option[];
declare type Commands = Command[];

declare interface SetupOptions {
  usage: string;
  options: Options;
  commands: Commands;
}

declare interface OnCommandFailed {
  failed: boolean;
}

declare interface OnCommand {
  so: (cb: any) => OnCommandFailed;
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
