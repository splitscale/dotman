import { CommandFactory } from './commandFactory.js';

export class ArgumentExecutor {
  static async execute(args: string[]) {
    const [command, ...commandArgs] = args;

    const commandInstance = CommandFactory.createArgument(command);

    await commandInstance.execute(commandArgs);
  }
}
