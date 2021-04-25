import path from 'path';
// v10.0.0
import { rename, opendir } from 'fs/promises';
import { RenOptions } from './types';

export async function run(reStr: string, dir: string, options: RenOptions) {
  if (!options.recursive) {
  }
}
// child_process?
export async function renameFile(oldName: string, newName: string) {
  await rename(oldName, newName);
}

// @TODO: return type
export async function* walk(dir: string): AsyncGenerator<string, any, any> {
  for await (const d of await opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

export function logResult(
  oldName: string,
  newName: string,
  result: boolean,
  err: Error | any
) {
  if (result) {
    console.log(`[OK] ${oldName}\t-> ${newName}`);
  } else {
    console.error(`[ERROR] Failed to rename ${oldName} -> ${newName}: ${err}`);
  }
}
