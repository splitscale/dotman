import { Executable } from '../executable';
import fs from 'fs';
import { FilepathVariables } from '../../variables/filepathVariables.js';
import { logger } from '../../utils/logger.js';

export class AddArgument implements Executable {
  async execute(args: string[]): Promise<void> {
    const filePath = FilepathVariables.getRootDir('dmconfig.json');
    const url = args[0];

    const data = {
      gitUrl: url,
    };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    if (fs.existsSync(filePath)) {
      logger.log('added: ' + filePath + ': ' + url);
    } else {
      logger.error('Error writing file');
    }
  }
}
