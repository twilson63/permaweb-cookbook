# ArDrive Turbo を使用したトランザクションの投稿

バンドルされたトランザクションの投稿は、`@ardrive/turbo-sdk` のようなサードパーティ製パッケージを使用して行うことができます。

## @ardrive/turbo-sdk のインストール

`@ardrive/turbo-sdk` をインストールするには次を実行します

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

## Turbo クライアントの初期化

`turbo` SDK を使用してデータをアップロードする方法はいくつかあります。次のことができます:

- 単純なデータをアップロードする
- `file` をアップロードする
- `data-item` をアップロードする

ArDrive Turbo のドキュメントは、これらいずれの方法についてもクイックスタートを提供しています。

トランザクションを投稿し Arweave にデータをアップロードする推奨方法は DataItems を使用することです。

### クイックスタート

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

## リソース

- [Turbo SDK GitHub リポジトリ](https://github.com/ardriveapp/turbo-sdk)
- [ArDrive Discord](https://discord.com/invite/ya4hf2H) のディスカッションに参加する
