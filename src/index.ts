import { Command } from 'commander';
import { run } from './lib';

const program = new Command('ren2');
program
  .arguments('<expression> [directory]')
  .description(
    'An application for rename files or folders by using regular expressions',
    {
      expression: 'sed regex expression',
      directory: 'target directory',
    }
  )
  .option('-f, --force', 'force apply changes')
  .option('-r, --recursive', 'recursively rename files')
  .action((reStr, dir = '.', options) => {
    run(reStr, dir, options);
    console.log('sssssssss', reStr, dir, options);
  });
program.parse();
