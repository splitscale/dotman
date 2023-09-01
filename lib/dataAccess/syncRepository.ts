import { exec } from 'child_process';
import { logger } from '../utils/logger.js';
import * as fs from 'fs';

export async function syncRepository(
  repoUrl: string,
  path: string
): Promise<void> {
  const executeCommand = async (command: string) => {
    return new Promise<void>((resolve, reject) => {
      exec(command, (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  };

  try {
    await fs.promises.mkdir(path, { recursive: true });
    const files = await fs.promises.readdir(path);
    if (files.length === 0) {
      await executeCommand(`git clone ${repoUrl} ${path}`);
      logger.info('Repository cloned successfully');
    } else {
      await executeCommand(`cd ${path} && git pull`);
      logger.info('Repository pulled successfully');
    }
  } catch (error) {
    throw error;
  }
}
