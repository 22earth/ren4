export interface RenOptions {
  force?: boolean;
  recursive?: boolean;
}

export interface RegexData {
  pattern: string;
  replacement: string;
  global: boolean;
  case_insensitive: boolean;
}

export interface TargetDir {
  path: string;
  name: string;
}
