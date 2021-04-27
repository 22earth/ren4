# ren4

[![Build Status](https://img.shields.io/travis/22earth/ren4/main.svg?style=flat-square)](https://travis-ci.com/22earth/ren4.svg?branch=main)

[![license](https://img.shields.io/github/license/22earth/ren4.svg?style=flat-square)](https://github.com/22earth/ren4/blob/main/LICENSE)

An application for rename files or folders by using regular expressions.

reference: Rust version [ren3](https://github.com/Aloxaf/ren3)

## Install

**You’ll need to have Node 10.0.0 or later version**

```shell
> npm install -g ren4

> ren4 's/.\*(\d+\.txt)/bar-$1'  targe_dir
```

### npx

```shell
> npx ren4 's/.\*(\d+\.txt)/bar-$1'
```

### package.json

```shell
npm install ren4 --save-dev
```

This will allow using `ren4` in your `package.json` scripts.

```javascript
{
  "scripts": {
    "rename": "ren4 \"s/.*(\d+\.txt)/foo-$1\" dist"
  }
}
```

## Usage

```text
Usage: ren4 [options] <expression> [directory]

An application for rename files or folders by using regular expressions

Arguments:
  expression       sed regex expression
  directory        target directory

Options:
  -r, --recursive  recursively rename files
  -h, --help       display help for command
```

## Examples

```shell
> touch foo-1.txt foo2.txt

> ls
foo-1.txt  foo2.txt

> ren4 's/.*(\d+\.txt)/bar-$1'
[OK] dist/foo-1.txt     -> dist/bar-1.txt
[OK] dist/foo2.txt      -> dist/bar-2.txt

> ls
bar-1.txt  bar-2.txt
```
