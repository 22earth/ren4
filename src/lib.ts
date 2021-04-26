import path from 'path';
// v10.0.0
import { rename, opendir } from 'fs/promises';
import { RegexData, RenOptions, TargetDir } from './types';

export async function run(reStr: string, dir: string, options: RenOptions) {
  const reObj: RegexData = parseRegex(reStr);
  for await (const p of walk(dir, options.recursive)) {
    await renameFile(p, reObj);
  }
}
export async function renameFile(
  { name, path: dirPath }: TargetDir,
  regexpData: RegexData
) {
  const flag =
    (regexpData.global ? 'g' : '') + (regexpData.case_insensitive ? 'i' : '');
  let re = new RegExp(regexpData.pattern, flag);
  if (re.test(name)) {
    const newName = name.replace(re, regexpData.replacement);
    const oldFullName = path.join(dirPath, name);
    const newFullName = path.join(dirPath, newName);
    try {
      await rename(oldFullName, newFullName);
      logResult(oldFullName, newFullName);
    } catch (error) {
      logResult(oldFullName, newFullName, error);
    }
  }
}

// @TODO: return type
export async function* walk(
  dir: string,
  recursive: boolean
): AsyncGenerator<TargetDir, any, any> {
  for await (const d of await opendir(dir)) {
    if (!recursive) {
      yield {
        name: d.name,
        path: dir,
      };
    } else if (d.isDirectory()) {
      const entry = path.join(dir, d.name);
      yield* walk(entry, true);
    } else if (d.isFile())
      yield {
        name: d.name,
        path: dir,
      };
  }
}

export function logResult(oldName: string, newName: string, err?: Error | any) {
  if (!err) {
    console.log(`[OK] ${oldName}\t-> ${newName}`);
  } else {
    console.error(
      `[ERROR] Failed to rename ${oldName} -> ${newName}:\n ${err}`
    );
  }
}

export function parseRegex(expr: string): RegexData {
  if (expr[0] != 's') {
    throw new Error(`Unknown command: ${expr[0]}`);
  }
  const delimiter = expr[1];

  const segments = [];
  const segment = [];
  let i = 2;
  while (i < expr.length) {
    const c = expr[i];
    if (c == '\\') {
      // 转义处理
      segment.push(c + expr[i + 1]);
      i += 1;
    } else if (c == delimiter) {
      segments.push(segment.join(''));
      // empty array
      segment.length = 0;
    } else {
      segment.push(c);
    }
    i += 1;
  }
  if (!!segment.length) {
    segments.push(segment.join(''));
  }

  if (segments.length < 2) {
    throw new Error(`Not enough segments`);
  } else if (segments.length > 3) {
    throw new Error(`Too many segments`);
  }
  const ret: RegexData = {
    pattern: segments[0],
    replacement: segments[1],
    global: false,
    case_insensitive: false,
  };
  if (segments.length === 3) {
    for (const flag of segments[2]) {
      if (flag === 'i') {
        ret.case_insensitive = true;
      } else if (flag == 'g') {
        ret.global = true;
      } else {
        throw new Error(`Unknown flag: ${flag}`);
      }
    }
  }

  return ret;
}
