export function renameFile() {}

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
