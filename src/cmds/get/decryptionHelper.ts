const crypto = require('crypto').webcrypto

const importKeyFromBytes = async (keyBytes: Uint8Array) =>
  crypto.subtle.importKey('raw', keyBytes, 'PBKDF2', false, [
    'deriveKey'
  ])

const deriveKey = async (
  sourceKey: CryptoKey,
  // eslint-disable-next-line no-undef
  keyUsage: KeyUsage[],
  // eslint-disable-next-line no-undef
  keyDerivationParams: Pbkdf2Params
) =>
  crypto.subtle.deriveKey(
    keyDerivationParams,
    sourceKey,
    { name: 'AES-GCM', length: 256 },
    false,
    keyUsage
  )

export const decryptFile = async (cipher: ArrayBuffer | Uint8Array, password: string): Promise<ArrayBuffer | undefined> => {
  try {
    const cipherBytes = new Uint8Array(cipher)
    const passwordBytes = new TextEncoder().encode(password)

    const salt = cipherBytes.slice(0, 16)
    const iv = cipherBytes.slice(16, 16 + 12)
    const data = cipherBytes.slice(16 + 12)
    const passwordKey = await importKeyFromBytes(passwordBytes)
    const aesKey = await deriveKey(passwordKey, ['decrypt'], {
      name: 'PBKDF2',
      salt: salt,
      iterations: 250000,
      hash: 'SHA-256'
    })

    const decryptedContent = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      aesKey,
      data
    )

    return decryptedContent
  } catch (error) {
    console.error('Error decrypting file')
    console.error(error)
  }
}
