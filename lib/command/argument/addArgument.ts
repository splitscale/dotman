import { Executable } from '../executable';
import fs from 'fs';
import { FilepathVariables } from '../../variables/filepathVariables.js';
import { logger } from '../../utils/logger.js';
import { DmConfig } from '../../types/dmconfig';

export class AddArgument implements Executable {
  async execute(args: string[]): Promise<void> {
    const filePath = FilepathVariables.getRootDir('dmconfig.json');
    const url = args[0];

    if (!url) throw new Error('Please specify an url "dotman add website.com"');

    const data: DmConfig = {
      gitUrl: url,
    };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    if (fs.existsSync(filePath)) {
      logger.log('Added');
    } else {
      logger.error('Error writing file');
    }
  }
}
