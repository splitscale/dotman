import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class FilepathVariables {
  static currentDir = './';

  static setCurrentDir(newPath: string): void {
    this.currentDir = newPath ?? './';
  }

  static getRootDir(filename: string): string {
    const root = resolve(__dirname, '..', '..');
    return path.join(root, filename);
  }
}
