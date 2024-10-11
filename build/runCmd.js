const path = require('path');
const { execSync } = require('child_process');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const paths = require('./paths');

const argv = yargs(hideBin(process.argv))
  .option('block-code', {
    alias: 'bc',
    describe: 'block code',
    demandOption: true,
  })
  .option('mode', {
    alias: 'm',
    describe: 'mode',
    demandOption: true,
  })
  .option('lib', {
    alias: 'lib',
    describe: 'lib',
    demandOption: true,
  })
  .help().argv;

function runSingleUserScript(blockCode, mode) {
  const mergeParams = {
    config: path.resolve(paths.appBuild, `${blockCode}/webpack.config.js`),
    mode,
  };

  if (blockCode === 'third.lib') {
    mergeParams.env = `lib=${argv.lib}`;
  }

  const paramsStr = Object.keys(mergeParams)
    .map((key) => {
      return `--${key}=${mergeParams[key]}`;
    })
    .join(' ');

  console.log(paramsStr);

  if (mode === 'development') {
    execSync(`webpack serve ${paramsStr}`);
  } else {
    execSync(`webpack ${paramsStr}`);
  }
}

runSingleUserScript(argv['block-code'], argv['mode']);
