import { parseRegex, walk } from './lib';
import { RegexData } from './types';
import { opendir } from 'fs/promises';

jest.mock('fs/promises', () => ({
  opendir: jest
    .fn()
    .mockResolvedValueOnce([
      { name: 'foo1.txt', isDirectory: () => false, isFile: () => true },
      { name: 'foo-2.txt', isDirectory: () => false, isFile: () => true },
      { name: 'foo2', isDirectory: () => true, isFile: () => false },
    ])
    .mockResolvedValue([
      { name: 't.txt', isDirectory: () => false, isFile: () => true },
      { name: 't2.txt', isDirectory: () => false, isFile: () => true },
    ]),
}));
test('walk', async () => {
  for await (const p of walk('.', false)) {
  }
  expect(opendir).toBeCalledTimes(1);
  for await (const p of walk('.', true)) {
  }
  expect(opendir).toBeCalledTimes(2);
});

test('parse regex', () => {
  expect(parseRegex(String.raw`s/.*(\d+\.txt)/bar-$1`)).toEqual({
    pattern: String.raw`.*(\d+\.txt)`,
    replacement: 'bar-$1',
    case_insensitive: false,
    global: false,
  } as RegexData);
  expect(parseRegex(String.raw`s#abc#efg#g`)).toEqual({
    pattern: 'abc',
    replacement: 'efg',
    case_insensitive: false,
    global: true,
  } as RegexData);

  expect(() => parseRegex(String.raw`i/xxx/xxx`)).toThrowError(
    new Error(`Unknown command: i`)
  );
  expect(() => parseRegex(String.raw`s/xxx`)).toThrowError(
    new Error(`Not enough segments`)
  );
  expect(() => parseRegex(String.raw`s/xxx/abc/defg/aa`)).toThrowError(
    new Error(`Too many segments`)
  );
  expect(() => parseRegex(String.raw`s/xxx/abc/def`)).toThrowError(
    new Error(`Unknown flag: d`)
  );
});

// @TODO jest
// describe('rename files', () => {
//   beforeEach(() => {
//     // fs.writeFileSync('foo1.txt', 'foo1');
//     // fs.writeFileSync('foo-2.txt', 'foo-2');
//   });
//   test('rename files', async () => {});
// });
