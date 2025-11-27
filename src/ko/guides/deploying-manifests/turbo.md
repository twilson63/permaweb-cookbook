# Turbo를 사용한 매니페스트 배포

## Turbo 설치

> NodeJS 필요 - https://nodejs.org

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

## 폴더 업로드

기본적으로 Turbo SDK의 `uploadFolder` 메서드는 폴더에 대한 매니페스트를 생성하고 배포합니다. `index` 및 `fallback` 속성은 별도로 지정하지 않는 한 업로드된 폴더의 `index.html` 및 `404.html` 파일로 각각 설정됩니다.

`uploadFolder` 메서드는 매니페스트의 전체 JSON과 매니페스트 업로드 트랜잭션 ID를 반환합니다.

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

## 수동으로 매니페스트 생성 및 업로드

매니페스트는 수동으로 생성하여 업로드할 수도 있습니다. 매니페스트는 특정 스키마를 갖는 JSON 객체이며 `Content-Type` 태그를 `application/x.arweave-manifest+json`로 설정하여 업로드합니다.

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
