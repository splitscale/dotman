import { CommandFactory } from './commandFactory.js';
import { Executable } from './executable.js';

export class FlagExecutor {
  async execute(args: string[]) {
    const [command, ...commandArgs] = args;

    let commandInstance: Executable = CommandFactory.createFlag(command);
    await commandInstance.execute(commandArgs);
  }
}
