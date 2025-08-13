---
locale: ja
---
# Turboを使ったマニフェストのデプロイ

## Turboのインストール

> Requires NodeJS - https://nodejs.org

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install @ardrive/turbo-sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add @ardrive/turbo-sdk
```

  </CodeGroupItem>
</CodeGroup>

## フォルダのアップロード

デフォルトでは、Turbo SDKの`uploadFolder`メソッドは、フォルダ用のマニフェストを生成してデプロイします。`index`および`fallback`属性は、それぞれアップロードされたフォルダ内の`index.html`および`404.html`ファイルに設定されますが、他のファイルが指定された場合はそれに従います。

`uploadFolder`メソッドは、マニフェストの完全なJSONと、マニフェストアップロードのトランザクションIDの両方を返します。

```javascript
import { TurboFactory } from "@ardrive/turbo-sdk";
import fs from "fs";

const jwk = fs.readFileSync("./KeyFile.json");
const turbo = TurboFactory.authenticated({ privateKey: JSON.parse(jwk) });

const { manifest, fileResponses, manifestResponse } = await turbo.uploadFolder({
  folderPath,
  dataItemOpts: {
    // optional
    tags: [
      {
        // User defined content type will overwrite file content type
        name: "Content-Type",
        value: "text/plain",
      },
      {
        name: "My-Custom-Tag",
        value: "my-custom-value",
      },
    ],
    // no timeout or AbortSignal provided
  },
  manifestOptions: {
    // optional
    indexFile: "custom-index.html",
    fallbackFile: "custom-fallback.html",
    disableManifests: false,
  },
});
```
## マニフェストを手動で作成およびアップロード

マニフェストは手動で作成してアップロードすることもできます。マニフェストは特定のスキーマを持つJSONオブジェクトで、`Content-Type`タグ`application/x.arweave-manifest+json`を使用してアップロードされます。

```js
import { TurboFactory } from "@ardrive/turbo-sdk";
import { Readable } from 'stream';


const jwk = fs.readFileSync('./KeyFile.json');
const turbo = TurboFactory.authenticated({ privateKey: JSON.parse(jwk) });

// define the manifest
const manifest = {
  "manifest": "arweave/paths",
  "version": "0.2.0",
  "index": {
    "path": "index.html"
  },
  "fallback": {
    "id": "-u47dfkUE2k9vETNXTqCdFRVLS5NfpZfODZ5ZKItiRY"
  }
   "paths": {
      "404.html": {
        "id": "-u47dfkUE2k9vETNXTqCdFRVLS5NfpZfODZ5ZKItiRY"
      },
      "index.html": {
        "id": "dYD2PqQyFpKj40bhyTkBCEtYnxf-GfQpRMFClbCiHF4"
      },
      "last.html": {
        "id": "YjpkqFPUamchyDYpJsGUmge8sKczqTKkX2hWbIL9qBw"
      },
      "stuff.html": {
        "id": "pqnejz6_iHB-KYdTB4zC_ALEX5Ox-Rpt4X_Yr3JZywk"
      },
      "test.html": {
        "id": "hfc763dACTF9VvxDAX4YkF9QNzh5eO1NZpSCAetsrXE"
      }
    }
};

// upload the manifest
const manifestString = JSON.stringify(manifest);

const uploadResult = await turbo.uploadFile({
	fileStreamFactory: () => Readable.from(Buffer.from(manifestString)),
	fileSizeFactory: () => Buffer.byteLength(manifestString),
	signal: AbortSignal.timeout(10_000), //10 second timeout
	dataItemOpts: {
		tags: [
				{
					name: 'Content-Type',
					value: 'application/x.arweave-manifest+json',
				}
			],
		},
});

console.log(uploadResult.id) // log the manifest transaction id to the console
```