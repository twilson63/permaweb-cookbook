# Posting Transactions using Ardrive Turbo

Posting transactions using Turbo can be accomplished using the `@ardrive/turbo-sdk` JavaScript package.

## Installing the @ardrive/turbo-sdk

To install `@ardrive/turbo-sdk` run

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install @ardrive/turbo-sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add @ardrive/turbo-sdk
```

  </CodeGroupItem>
</CodeGroup>

## Initializing Turbo Client

There are multiple ways to upload data using the `turbo` sdk. You can:

- upload a `file`
- upload a `data-item`

When uploading a `data-item` with the `turbo` sdk, you will use `ar-bundles` to create the `data-item` and add `tags`. 

### Data-Item (recommended)

```js
import fs from 'node:fs'
import { TurboFactory } from '@ardrive/turbo-sdk/node';
import { ArweaveSigner, createData } from 'arbundles';


if (!process.env.PATH_TO_WALLET) {
  console.error("Please set PATH_TO_WALLET in your env.")
  process.exit()
}

const JWK = JSON.parse(fs.readFileSync(process.env.PATH_TO_WALLET).toString());

const turbo = TurboFactory.authenticated({ privateKey: JWK, });

const signer = new ArweaveSigner(JWK);
```

### File
```js
import { TurboFactory } from '@ardrive/turbo-sdk/node';
import fs from 'fs';

if (!process.env.PATH_TO_WALLET) {
  console.error("Please set PATH_TO_WALLET in your env.")
  process.exit()
}

const JWK = JSON.parse(fs.readFileSync(process.env.PATH_TO_WALLET).toString());

const turbo = TurboFactory.authenticated({ privateKey: JWK });

const filePath = new URL('path/to/file', import.meta.url).pathname;
const fileSize = fs.statSync(filePath).size;
const dataItemOpts = {
    //target: ,
    // anchor: ,
    tags: [{name: 'test', value: 'test'}] // add tags
  }
  const uploadResult = await turbo.uploadFile({
    fileStreamFactory: () => fs.createReadStream(filePath),
    fileSizeFactory: () => fileSize,
    signal: AbortSignal.timeout(10_000), // Optional: cancel the upload after 10 seconds
    dataItemOpts // Optional
  });
  console.log(JSON.stringify(uploadResult, null, 2));
```

## Posting a `Data-Item` (recommended)

```js
const signer = new ArweaveSigner(JWK);
const signedDataItem = createData(JSON.stringify({ "some": "data" }), signer, {
  tags: [{ name: 'test', value: 'test' }] // add tags
});
await signedDataItem.sign(signer);

const uploadResult = await turbo.uploadSignedDataItem({
  dataItemStreamFactory: () => signedDataItem.getRaw(),
  dataItemSizeFactory: () => signedDataItem.getRaw().length,
  signal: AbortSignal.timeout(10_000), // cancel the upload after 10 seconds

});

console.log("Result", uploadResult);
```

## Posting a `File`

```js
const filePath = new URL('path/to/file', import.meta.url).pathname;
const fileSize = fs.statSync(filePath).size;
const dataItemOpts = {
    //target: 'string',
    // anchor: 'string',
    tags: [{name: 'test', value: 'test'}] // add tags
  }
const uploadResult = await turbo.uploadFile({
	fileStreamFactory: () => fs.createReadStream(filePath),
	fileSizeFactory: () => fileSize,
	signal: AbortSignal.timeout(10_000), // cancel the upload after 10 seconds
  dataItemOpts
});
console.log(JSON.stringify(uploadResult, null, 2));
```

## Resources

- Dive into the [Code](https://github.com/ardriveapp/turbo-sdk)
- Join the discussion in the [ArDrive Discord](https://discord.com/invite/ya4hf2H)
