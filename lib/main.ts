#!/usr/bin/env node

import { ArgumentExecutor } from './command/argumentExecutor.js';
import { FlagExecutor } from './command/flagExecutor.js';
import { SystemDirParser } from './path/systemDirParser.js';
import { logger } from './utils/logger.js';
import { FilepathVariables } from './variables/filepathVariables.js';

export default async function main() {
  // Set the output path to the current working directory path
  const rootDir = process.cwd();
  const args = process.argv.slice(2);
  const flags = new FlagExecutor();

  try {
    logger.setAppName('Dotman');

    FilepathVariables.setCurrentDir(SystemDirParser.format(rootDir));

    flags.execute(args);

    ArgumentExecutor.execute(args);
  } catch (error) {
    flags.execute(args);
    logger.error(error);
  }
}
