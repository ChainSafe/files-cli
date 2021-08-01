# Files-cli
## A cli tool to download and decrypt any file uploaded using [ChainSafe Files](files.chainsafe.io/)

[ChainSafe Files](files.chainsafe.io/) is a cloud platform that lets you upload files to IPFS and Filecoin. The files you upload are encrypted. This tool demonstrates the fact that given enough knowledge about your files, you can actually retrieve them without needing to log in to the ChainSafe Files platform. All you need is the content identifier of your file (cid) and the decryption key. When connected to Files user interface, the key is printed in the console of your browser.

## How to use it

Currently, the only available command is `get`.

Required arguments:
- `--cid`: The IPFS cid of the file to get
- `--output`: The full local path where the file will be saved once downloaded and decrypted
- `--key`: The decryption key from ChainSafe Files, available when looking at the browser console after login

Optionnal arguments:
- `--gateway`: The IPFS gateway to get the file from. Default: "https://ipfs.io/ipfs/"

### Running it using npx

```bash
# Make sure it works and prints the help
npx @chainsafe/files-cli --help

# Use the "get" command with the cid and key you want
npx @chainsafe/files-cli get --cid QmfVd...ZAk --output "./my-image.jpg" --key UUc...td8=
```

### Installing it globally
```bash
# Install the binary
npm install -g @chainsafe/files-cli

# Make sure it works and prints the help
files-cli --help
```

## How to build it from the sources

We're usin yarn but it would work with npm as well.

```bash
git clone https://github.com/ChainSafe/files-cli.git
cd files-cli 
yarn build

# run the command starting with node lib/index.js e.g
node lib/index.js --version
node lib/index.js --help
node lib/index.js get --cid QmfVd...ZAk --output "./my-image.jpg" --key UUc...td8=
```

## Development

```bash
# clone this repository then
cd files-cli 
yarn build:lib:watch
```