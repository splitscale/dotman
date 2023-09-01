#!/usr/bin/env node

import { ArgumentExecutor } from './command/argumentExecutor.js';
import { FlagExecutor } from './command/flagExecutor.js';
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

    if (args[0] === 'test') {
      syncRepository(
        'https://github.com/splitscale/dotfiles.git',
        FilepathVariables.getRootDir('tmp')
      );
    } else if (args[0] === 'display') {
      selectDirContents();
    } else if (args[0].startsWith('-')) {
      await flagsExecutor.execute(args);
    } else {
      await argsExecutor.execute(args);
    }
  } catch (error) {
    logger.error(error);
  }
}
