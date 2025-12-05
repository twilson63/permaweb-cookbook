# 使用 ArDrive Turbo 发布交易

发布打包的交易可以通过第三方套件来完成，例如 `@ardrive/turbo-sdk`。

## 安装 @ardrive/turbo-sdk

要安装 `@ardrive/turbo-sdk`，请执行

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

## 初始化 Turbo 客户端

使用 `turbo` SDK 上传数据有多种方式。你可以：

- 上传简单数据
- 上传一个 `file`
- 上传一个 `data-item`

ArDrive Turbo 的文档针对上述任一方法都提供快速入门。

建议将交易发布与数据上传到 Arweave 的方式是使用 DataItems。

### 快速开始

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
    // 上传一些简单数据 - 记录上传进度事件
    const { id, owner, dataCaches, fastFinalityIndexes } = await turbo.upload({
      data: "Hello, world!",
      events: {
        // 整体事件（包含签署与上传事件）
        onProgress: ({ totalBytes, processedBytes, step }) => {
          console.log("整体进度：", { totalBytes, processedBytes, step });
        },
        onError: ({ error, step }) => {
          console.log("整体错误：", { error, step });
        },
      },
    });

    // 上传文件 - 记录签署与上传进度事件
    const filePath = path.join(__dirname, "./my-image.png");
    const fileSize = fs.statSync(filePath).size;
    const { id, owner, dataCaches, fastFinalityIndexes } =
      await turbo.uploadFile({
        fileStreamFactory: () => fs.createReadStream(filePath),
        fileSizeFactory: () => fileSize,
        events: {
          // 整体事件（包含签署与上传事件）
          onProgress: ({ totalBytes, processedBytes, step }) => {
            console.log("整体进度：", { totalBytes, processedBytes, step });
          },
          onError: ({ error, step }) => {
            console.log("整体错误：", { error, step });
          },
          // 签署事件
          onSigningProgress: ({ totalBytes, processedBytes }) => {
            console.log("签署进度：", { totalBytes, processedBytes });
          },
          onSigningError: (error) => {
            console.log("签署错误：", { error });
          },
          onSigningSuccess: () => {
            console.log("签署成功！");
          },
          // 上传事件
          onUploadProgress: ({ totalBytes, processedBytes }) => {
            console.log("上传进度：", { totalBytes, processedBytes });
          },
          onUploadError: (error) => {
            console.log("上传错误：", { error });
          },
          onUploadSuccess: () => {
            console.log("上传成功！");
          },
        },
      });
    // 上传完成！
    console.log("成功上传 data item！", {
      id,
      owner,
      dataCaches,
      fastFinalityIndexes,
    });
  } catch (error) {
    // 上传失败
    console.error("上传 data item 失败！", error);
  }
}
```

## 资源

- [Turbo SDK GitHub 仓库](https://github.com/ardriveapp/turbo-sdk)
- 在 [ArDrive Discord](https://discord.com/invite/ya4hf2H) 加入讨论
