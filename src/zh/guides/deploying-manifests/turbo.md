# 使用 Turbo 部署 Manifest

## 安装 Turbo

> 需要 NodeJS - https://nodejs.org

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

## 上传文件夹

默认情况下，Turbo SDK 中的 `uploadFolder` 方法会为该文件夹生成并部署 manifest。除非另有指定，`index` 与 `fallback` 属性将分别设置为上传文件夹内的 `index.html` 与 `404.html` 文件。

`uploadFolder` 方法会返回 manifest 的完整 JSON 以及该 manifest 上传的交易 ID。

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

## 手动创建并上传 Manifest

也可以手动创建并上传 manifest。manifest 是符合特定 schema 的 JSON 对象，上传时需带有 `Content-Type` 标签 `application/x.arweave-manifest+json`。

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
