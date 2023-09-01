import { exec } from 'child_process';
import { logger } from '../utils/logger.js';
import * as fs from 'fs';

export async function syncRepository(
  repoUrl: string,
  path: string
): Promise<boolean> {
  const isDirectoryEmpty = async (path: string) => {
    const files = await fs.promises.readdir(path);
    return files.length === 0;
  };

  const executeCommand = async (command: string) => {
    return new Promise<boolean>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          logger.error(error.message);
          resolve(false);
          return;
        }

        if (stdout.trim() !== '') logger.log(stdout);
        if (stderr.trim() !== '') logger.error(stderr);
        resolve(true);
      });
    });
  };

  try {
    await fs.promises.access(path);
    const isEmpty = await isDirectoryEmpty(path);
    if (isEmpty) {
      return executeCommand(`git clone ${repoUrl} ${path}`);
    } else {
      return executeCommand(`cd ${path} && git pull`);
    }
  } catch (error) {
    return executeCommand(`git clone ${repoUrl} ${path}`);
  }
}
