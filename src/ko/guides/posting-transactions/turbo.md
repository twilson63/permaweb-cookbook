# ArDrive Turbo를 사용한 트랜잭션 게시

번들된 트랜잭션 게시(posting)는 `@ardrive/turbo-sdk`와 같은 서드파티 패키지를 사용하여 수행할 수 있습니다.

## @ardrive/turbo-sdk 설치하기

`@ardrive/turbo-sdk`를 설치하려면 다음을 실행하세요

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

## Turbo 클라이언트 초기화

`turbo` SDK를 사용하여 데이터를 업로드하는 방법은 여러 가지가 있습니다. 예를 들어:

- 단순 데이터를 업로드
- `file` 업로드
- `data-item` 업로드

ArDrive Turbo의 문서는 이러한 방법들 각각에 대한 빠른 시작 가이드를 제공합니다.

Arweave에 트랜잭션을 게시하고 데이터를 업로드하는 권장 방법은 DataItems를 사용하는 것입니다.

### 빠른 시작

```js
import { ArweaveSigner, TurboFactory } from "@ardrive/turbo-sdk";
import Arweave from "arweave";
import fs from "fs";
import open from "open";
import path from "path";

async function uploadWithTurbo() {
  const jwk = JSON.parse(fs.readFileSync("./my-jwk.json", "utf-8"));
  const signer = new ArweaveSigner(jwk);
  const turbo = TurboFactory.authenticated({ signer });

  try {
    // upload some simple data - log upload progress events
    const { id, owner, dataCaches, fastFinalityIndexes } = await turbo.upload({
      data: "Hello, world!",
      events: {
        // overall events (includes signing and upload events)
        onProgress: ({ totalBytes, processedBytes, step }) => {
          console.log("Overall progress:", {
            totalBytes,
            processedBytes,
            step,
          });
        },
        onError: ({ error, step }) => {
          console.log("Overall error:", { error, step });
        },
      },
    });

    // upload a file - log signing and upload progress events
    const filePath = path.join(__dirname, "./my-image.png");
    const fileSize = fs.statSync(filePath).size;
    const { id, owner, dataCaches, fastFinalityIndexes } =
      await turbo.uploadFile({
        fileStreamFactory: () => fs.createReadStream(filePath),
        fileSizeFactory: () => fileSize,
        events: {
          // overall events (includes signing and upload events)
          onProgress: ({ totalBytes, processedBytes, step }) => {
            console.log("Overall progress:", {
              totalBytes,
              processedBytes,
              step,
            });
          },
          onError: ({ error, step }) => {
            console.log("Overall error:", { error, step });
          },
          // signing events
          onSigningProgress: ({ totalBytes, processedBytes }) => {
            console.log("Signing progress:", { totalBytes, processedBytes });
          },
          onSigningError: (error) => {
            console.log("Signing error:", { error });
          },
          onSigningSuccess: () => {
            console.log("Signing success!");
          },
          // upload events
          onUploadProgress: ({ totalBytes, processedBytes }) => {
            console.log("Upload progress:", { totalBytes, processedBytes });
          },
          onUploadError: (error) => {
            console.log("Upload error:", { error });
          },
          onUploadSuccess: () => {
            console.log("Upload success!");
          },
        },
      });
    // upload complete!
    console.log("Successfully upload data item!", {
      id,
      owner,
      dataCaches,
      fastFinalityIndexes,
    });
  } catch (error) {
    // upload failed
    console.error("Failed to upload data item!", error);
  }
}
```

## 리소스

- [Turbo SDK GitHub 저장소](https://github.com/ardriveapp/turbo-sdk)
- [ArDrive Discord](https://discord.com/invite/ya4hf2H)에서 토론에 참여하세요
