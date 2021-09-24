import https from 'https'
import fs from 'fs'
import { decryptFile } from './decryptionHelper'
import { IGetArgs } from './options'

export async function getHandler ({ cid, output, gateway, key }: IGetArgs): Promise<void> {
  if (!cid) throw new Error('--cid is required')
  if (!output) throw new Error('--output is required')
  if (!key) throw new Error('--key is required')

  const slashIfNeeded = gateway[gateway.length - 1] === '/' ? '' : '/'
  const url = `${gateway}${slashIfNeeded}${cid}`

  downloadFile(url, output, key)
    .catch(err => console.error(err))
}

/**
 *
 * @param url - the url where we have our file
 * @param fileFullPath - the full file path where we want to store our image
 * @return {Promise<>}
 */
const downloadFile = async (url: string, fileFullPath: string, key: string): Promise<void> => {
  console.info(`> Requesting the file from: ${url}`)
  return new Promise((resolve, reject) => {
    https.get(url, (resp) => {
      if (resp.statusCode !== 200) {
        console.error(`Oops, we couldn't request the file, the gateway answered with an error code: ${resp.statusCode}`)
        return
      }

      console.info('> Downloading...')

      const chunks: Buffer[] = []
      // chunk received from the server
      resp.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      // last chunk received, we are done
      resp.on('end', async () => {
        console.info('> Decrypting...')
        const data = Buffer.concat(chunks)
        const decrypted = await decryptFile(data, key)

        if (!decrypted) {
          // decryption failed
          return
        }

        fs.appendFileSync(fileFullPath, new Uint8Array(decrypted))
        console.log(`File successfully saved to ${fileFullPath}`)
      })
    }).on('error', (err) => {
      reject(new Error(err.message))
    })
  })
}
