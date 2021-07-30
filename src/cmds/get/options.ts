import { ICliCommandOptions } from '../../util'

export interface IGetArgs {
        cid: string;
        gateway: string;
        output: string;
        key: string;
    }

export const getOptions: ICliCommandOptions<IGetArgs> = {

  cid: {
    description: 'The cid of the file to get',
    normalize: true,
    type: 'string'
  },
  output: {
    description: 'The full local path where the file will be saved',
    normalize: true,
    type: 'string'
  },
  gateway: {
    description: 'The IPFS gateway to get the file from',
    normalize: true,
    default: 'https://ipfs.io/ipfs/',
    type: 'string'
  },
  key: {
    description: 'The decryption key from ChainSafe Files',
    normalize: true,
    type: 'string'
  }
}
