// Must not use `* as yargs`, see https://github.com/yargs/yargs/issues/1131
import yargs from 'yargs'
import { cmds } from './cmds'
import { globalOptions } from './options'
import { registerCommandToYargs } from './util'

const { name, description } = require('../package.json')

const topBanner = description
const bottomBanner = 'For more information, check the CLI repo: https://github.com/ChainSafe/files-cli'

/**
 * Common factory for running the CLI and running integration tests
 * The CLI must actually be executed in a different script
 */
export function getCli (): yargs.Argv {
  const cli = yargs
    .env(name) // TODO: Change this!
    .parserConfiguration({
      // As of yargs v16.1.0 dot-notation breaks strictOptions()
      // Manually processing options is typesafe tho more verbose
      'dot-notation': false
    })
    .options(globalOptions)
    // blank scriptName so that help text doesn't display the cli name before each command
    .scriptName('')
    .demandCommand(1)
    // Control show help behaviour below on .fail()
    .showHelpOnFail(true)
    .usage(topBanner)
    .epilogue(bottomBanner)
    .alias('h', 'help')
    .alias('v', 'version')
    .alias('o', 'output')
    .alias('c', 'cid')
    .alias('k', 'key')
    .alias('g', 'gateway')
    .recommendCommands()

  // yargs.command and all ./cmds
  for (const cmd of cmds) {
    registerCommandToYargs(cli, cmd)
  }

  // throw an error if we see an unrecognized cmd
  cli.recommendCommands().strict()

  return cli
}
