import * as fs from 'fs';
import * as path from 'path';
import inquirer from 'inquirer';
import { FilepathVariables } from '../variables/filepathVariables.js';

export async function selectDirContents(): Promise<string[]> {
  // Get the path to the tmp directory
  const tmpDir = FilepathVariables.getRootDir('tmp');

  // Read the contents of the tmp directory
  const files = fs.readdirSync(tmpDir);

  // Map the file names to an array of choices for the enquirer prompt
  const choices = files.map((file) => ({
    name: file,
    value: path.join(tmpDir, file),
  }));

  // Prompt the user to select multiple files
  const response = await inquirer.prompt<{ selectedFiles: string[] }>({
    type: 'checkbox',
    name: 'selectedFiles',
    message: 'Select files to display',
    choices,
  });

  // Reduce the selected file paths to an object with the file names as keys and the file paths as values
  const selectedFiles = response.selectedFiles;

  // Log the selected files object to the console
  console.log(selectedFiles);

  return selectedFiles;
}
