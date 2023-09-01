import { readFileSync } from 'fs';
import { Executable } from '../executable.js';
import { FilepathVariables } from '../../variables/filepathVariables.js';

export class UsageFlag implements Executable {
  async execute(args: string[]): Promise<void> {
    console.log(this.displayUsage());
  }

  private displayUsage(): string {
    return readFileSync(FilepathVariables.getRootDir('usage.txt'), 'utf8');
  }
}
