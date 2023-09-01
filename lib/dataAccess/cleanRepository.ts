import * as fs from 'fs';
import { logger } from '../utils/logger.js';
import { FilepathVariables } from '../variables/filepathVariables.js';

export async function cleanRepository(dirName: string): Promise<void> {
  try {
    const tmpDir = FilepathVariables.getRootDir(dirName);

    // Delete the tmp directory
    logger.log('Cleaning files...');
    fs.rmSync(tmpDir, { recursive: true });
    logger.log('Files Cleaned');
  } catch (error) {
    logger.info('Already cleaned, no actions needed');
  }
}
