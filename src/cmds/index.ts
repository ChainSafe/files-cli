import { ICliCommand } from '../util'
import { IGlobalArgs } from '../options'
import { get } from './get'

export const cmds: Required<ICliCommand<IGlobalArgs, Record<never, never>>>['subcommands'] = [
  get
]
