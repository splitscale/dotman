import { AddArgument } from './argument/addArgument.js';
import { Executable } from './executable.js';
import { UsageFlag } from './flag/usageFlag.js';
import { VersionFlag } from './flag/versionFlag.js';

export class CommandFactory {
  static createArgument(command: string): Executable {
    switch (command) {
      case 'add':
        return new AddArgument();
      default:
        throw new Error('Unknown command: ' + command);
    }
  }

  static createFlag(flag: string): Executable {
    switch (flag) {
      case '-h':
      case '-help':
        return new UsageFlag();
      case '-v':
      case '-version':
        return new VersionFlag();
      default:
        throw new Error('Unknown flag: ' + flag);
    }
  }
}
