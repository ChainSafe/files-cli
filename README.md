# Files-cli
## A cli tool to download and decrypt any file uploaded using [ChainSafe Files](files.chainsafe.io/)

ChainSafe Files is a cloud platform that lets you upload files to a decentralized cloud. The files you upload are encrypted and accessible on the IPFS decentralized network. This tool demonstrates the fact that given enough knowledge about your files, you can actually retrieve them without the help of ChainSafe Files platform. All you need is the content identifier of your file (cid) and the decryption key, available when you login (it's printed in the console of your browswer).

## How to use it

```
# Install the binary
npm install -g @chainsafe/files-cli
# Make sure it works
files-cli --version
```

## How to build it from the source

```bash
# clone this repository then
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