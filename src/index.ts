import { mathParser } from './math-parser';

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .scriptName('math-parser')
  .usage('<command> [args]')
  .command(
    'calc [input]',
    'calculate the input',
    (y) => {
      y.positional('input', {
        type: 'string',
        describe: 'the input that goes calculated',
      });
    },
    (args) => {
      console.log(mathParser(args.input as string));
    },
  )
  .example('calc', '"12 + 3 * 5"')
  .example('calc', '"2 * ( 5 - 1)"')
  .example('calc', '"2^2 + 8 / 2"')
  .example('calc', '"2^( 3 - 1)"')
  .help().argv;
