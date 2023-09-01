#!/usr/bin/env node

import { ArgumentExecutor } from './command/argumentExecutor.js';
import { FlagExecutor } from './command/flagExecutor.js';
import { cleanRepository } from './dataAccess/cleanRepository.js';
import { copySelectedFiles } from './dataAccess/copySelectedFIles.js';
import { readDmConfig } from './dataAccess/readDmConfig.js';
import { selectDirContents } from './dataAccess/selectDirContents.js';
import { syncRepository } from './dataAccess/syncRepository.js';
import { SystemDirParser } from './path/systemDirParser.js';
import { logger } from './utils/logger.js';
import { FilepathVariables } from './variables/filepathVariables.js';

export default async function main() {
  // Set the output path to the current working directory path
  const rootDir = process.cwd();
  const args = process.argv.slice(2);
  const flagsExecutor = new FlagExecutor();
  const argsExecutor = new ArgumentExecutor();

  logger.setAppName('dotman');

  try {
    FilepathVariables.setCurrentDir(SystemDirParser.format(rootDir));
    const currentDir = FilepathVariables.currentDir;
    const firstArg = args[0];

    if (!firstArg) {
      const tmpDir = FilepathVariables.getRootDir('tmp');
      const url = (await readDmConfig()).gitUrl;

      await syncRepository(url, tmpDir);
      const files = await selectDirContents();
      await copySelectedFiles(files, currentDir);
    } else if (firstArg.startsWith('-')) {
      await flagsExecutor.execute(args);
    } else {
      await argsExecutor.execute(args);
    }
  } catch (error) {
    logger.error(error);
  } finally {
    await cleanRepository('tmp');
  }
}
