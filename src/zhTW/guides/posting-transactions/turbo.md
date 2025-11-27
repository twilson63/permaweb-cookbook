# 使用 ArDrive Turbo 發佈交易

發佈打包的交易可以透過第三方套件來完成，例如 `@ardrive/turbo-sdk`。

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

使用 `turbo` SDK 上傳資料有多種方式。你可以：

- 上傳簡單資料
- 上傳一個 `file`
- 上傳一個 `data-item`

ArDrive Turbo 的文件針對上述任一方法都提供快速入門。

建議將交易發佈與資料上傳到 Arweave 的方式是使用 DataItems。

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
    // 上傳一些簡單資料 - 紀錄上傳進度事件
    const { id, owner, dataCaches, fastFinalityIndexes } = await turbo.upload({
      data: "Hello, world!",
      events: {
        // 整體事件（包含簽署與上傳事件）
        onProgress: ({ totalBytes, processedBytes, step }) => {
          console.log("整體進度：", { totalBytes, processedBytes, step });
        },
        onError: ({ error, step }) => {
          console.log("整體錯誤：", { error, step });
        },
      },
    });

    // 上傳檔案 - 紀錄簽署與上傳進度事件
    const filePath = path.join(__dirname, "./my-image.png");
    const fileSize = fs.statSync(filePath).size;
    const { id, owner, dataCaches, fastFinalityIndexes } =
      await turbo.uploadFile({
        fileStreamFactory: () => fs.createReadStream(filePath),
        fileSizeFactory: () => fileSize,
        events: {
          // 整體事件（包含簽署與上傳事件）
          onProgress: ({ totalBytes, processedBytes, step }) => {
            console.log("整體進度：", { totalBytes, processedBytes, step });
          },
          onError: ({ error, step }) => {
            console.log("整體錯誤：", { error, step });
          },
          // 簽署事件
          onSigningProgress: ({ totalBytes, processedBytes }) => {
            console.log("簽署進度：", { totalBytes, processedBytes });
          },
          onSigningError: (error) => {
            console.log("簽署錯誤：", { error });
          },
          onSigningSuccess: () => {
            console.log("簽署成功！");
          },
          // 上傳事件
          onUploadProgress: ({ totalBytes, processedBytes }) => {
            console.log("上傳進度：", { totalBytes, processedBytes });
          },
          onUploadError: (error) => {
            console.log("上傳錯誤：", { error });
          },
          onUploadSuccess: () => {
            console.log("上傳成功！");
          },
        },
      });
    // 上傳完成！
    console.log("成功上傳 data item！", {
      id,
      owner,
      dataCaches,
      fastFinalityIndexes,
    });
  } catch (error) {
    // 上傳失敗
    console.error("上傳 data item 失敗！", error);
  }
}
```

## 資源

- [Turbo SDK GitHub 倉庫](https://github.com/ardriveapp/turbo-sdk)
- 在 [ArDrive Discord](https://discord.com/invite/ya4hf2H) 加入討論
