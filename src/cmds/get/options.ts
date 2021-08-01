import { ICliCommandOptions } from '../../util'

export interface IGetArgs {
        cid: string;
        key: string;
        output: string;
        gateway: string;
    }

export const getOptions: ICliCommandOptions<IGetArgs> = {

  cid: {
    description: 'IPFS content identifier of the file to get',
    demandOption: 'a cid is required. Use the --cid flag'
  },
  output: {
    description: 'Full local path where the file will be saved',
    demandOption: 'an output file is required. Use the --output flag'
  },
  gateway: {
    description: 'IPFS gateway to get the file from',
    default: 'https://ipfs.io/ipfs/'
  },
  key: {
    description: 'Decryption key from ChainSafe Files',
    demandOption: 'a decryption key is required. Use the --key flag'
  }
}
