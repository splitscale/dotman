import { readFileSync } from 'fs';
import { Command } from '../../command.js';
import { FilepathVariables } from '../../../variables/filepathVariables.js';

export class VersionCommand implements Command {
  async execute(args: string[]): Promise<void> {
    const packageJson = this.readPackageJson();
    const version = JSON.parse(packageJson).version;
    const name = JSON.parse(packageJson).name;

    console.log(this.displayBanner());
    console.log(`${name} Version: ${version}`);
  }

  readPackageJson(): string {
    return readFileSync(FilepathVariables.getRootDir('package.json'), 'utf8');
  }

  private displayBanner(): string {
    return readFileSync(FilepathVariables.getRootDir('banner.txt'), 'utf8');
  }
}
