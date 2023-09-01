import fs from 'fs';
import { FilepathVariables } from '../variables/filepathVariables.js';
import { DmConfig } from '../types/dmconfig';

export async function readDmConfig(): Promise<{ gitUrl: string }> {
  try {
    // Get the path to the dmconfig.json file
    const filePath = FilepathVariables.getRootDir('dmconfig.json');

    // Read the contents of the dmconfig.json file
    const data = fs.readFileSync(filePath, 'utf-8');

    // Parse the data as JSON
    const config = JSON.parse(data);

    return config as DmConfig;
  } catch (error) {
    throw new Error(
      'No dmconfig.json was found. Please run "dotman add" to create one.'
    );
  }
}
