#!/usr/bin/env node

import yargs from 'yargs'
import { YargsError } from './util'
import { getCli } from './cli'

const cli = getCli()

cli
  .fail((msg, err) => {
    if (msg) {
      // Show command help message when no command is provided
      if (msg.includes('Not enough non-option arguments')) {
        yargs.showHelp()
        console.log('\n')
      }
    }

    const errorMessage = err ? (err instanceof YargsError ? err.message : err.stack) : msg || 'Unknown error'

    console.error(` ✖ ${errorMessage}\n`)
    process.exit(1)
  })

  // Execute CLI
  .parse()
