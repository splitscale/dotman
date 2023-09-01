import * as fs from 'fs';
import * as path from 'path';
import { logger } from '../utils/logger.js';

export async function copySelectedFiles(
  selectedFiles: string[],
  destinationPath: string
): Promise<void> {
  for (const file of selectedFiles) {
    const fileName = path.basename(file);

    logger.log(`+ | ${fileName}`);

    const destinationFilePath = path.join(destinationPath, fileName);
    fs.copyFileSync(file, destinationFilePath);
  }

  logger.info('Copied ' + selectedFiles.length + ' files');

  return Promise.resolve();
}
