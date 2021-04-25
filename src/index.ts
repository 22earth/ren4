import { Command } from 'commander';

const main = new Command('ren2');
main
  .description(
    'An application for rename files or folders by using regular expressions'
  )
  .usage('[global options] <expression> <dir>...')
  .option('-p, --peppers', 'Add peppers')
  .option('-f, --force', 'force apply changes');
main.parse();

const options = main.opts();

if (options.peppers) console.log('  - peppers');
