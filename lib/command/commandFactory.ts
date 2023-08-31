import { Command } from './command.js';
import { UsageCommand } from './flag/usage/usageCommand.js';
import { VersionCommand } from './flag/version/versionCommand.js';

export class CommandFactory {
  static createArgument(command: string): Command {
    switch (command) {
      default:
        return new UsageCommand();
    }
  }

  static createFlag(flag: string): Command {
    switch (flag) {
      case '-h':
      case '--help':
        return new UsageCommand();
      case '-v':
      case '--version':
        return new VersionCommand();
      default:
        return new UsageCommand();
    }
  }
}
