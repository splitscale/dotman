import { CommandFactory } from './commandFactory.js';

export class FlagExecutor {
  async execute(args: string[]) {
    const [command, ...commandArgs] = args;

    const commandInstance = CommandFactory.createFlag(command);

    await commandInstance.execute(commandArgs);
    process.exit(0);
  }
}
