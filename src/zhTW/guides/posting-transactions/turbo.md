# 使用 ArDrive Turbo 發佈交易

您可以使用第三方套件（例如 `@ardrive/turbo-sdk`）來發佈打包交易。

## 安裝 @ardrive/turbo-sdk

要安裝 `@ardrive/turbo-sdk`，請執行

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

## 初始化 Turbo 用戶端

使用 `turbo` SDK 上傳資料有多種方式，您可以：

- 上傳簡單資料
- 上傳一個 `file`
- 上傳一個 `data-item`

ArDrive Turbo 的文件對於上述任一方法都提供了快速入門。

建議使用 DataItems 來向 Arweave 發佈交易與上傳資料。

### 快速開始

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

## 資源

- [Turbo SDK GitHub 儲存庫](https://github.com/ardriveapp/turbo-sdk)
- 在 [ArDrive Discord](https://discord.com/invite/ya4hf2H) 參與討論
