import { ICliCommand } from '../../util'
import { IGlobalArgs } from '../../options'
import { IGetArgs, getOptions } from './options'
import { getHandler } from './handler'

export const get: ICliCommand<Record<never, never>, IGetArgs & IGlobalArgs > = {
  command: 'get',

  describe: 'Get a file from IPFS and decrypt it',

  examples: [
    {
      command: 'get --cid QmfVdB5zEzEdwfKFmY3QXkpo5ahTqPLAde6XPa5UtC7ZAk --key abcdbef --output ./my-doc.pdf --gateway "https://ipfs.io/ipfs/"',
      description: ''
    }
  ],

  options: getOptions,

  handler: getHandler
}
