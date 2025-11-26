# arlocal

`arlocal` 是一個用於快速建立與執行本地 Arweave 測試環境的工具。它允許你在類似 Arweave gateway 的伺服器上測試交易，讓開發者在將應用部署到 Arweave 網路之前，可先在模擬環境中測試。

使用時不需要 $AR 代幣，且交易為即時。

## CLI

在你的機器上必須安裝 node 與 npm 才能使用 arlocal CLI

要啟動本地 gateway，執行 `npx arlocal`

::: tip
你可以透過傳入埠號作為參數來指定 slim gateway 要監聽的埠，例如
`npx arlocal 8080`
:::

若要隱藏日誌，在啟動 gateway 時加上旗標 `--hidelogs`
`npx arlocal --hidelogs`

## Node

將套件安裝為開發相依性，執行
`yarn add arlocal -D` 或 `npm install arlocal --save-dev`

```js
import ArLocal from "arlocal";

(async () => {
  const arLocal = new ArLocal();

  // create local testing environment
  await arLocal.start();

  // your tests here

  // shut down testing environment
  await arLocal.stop();
})();
```

可以使用下列選項來建立 `ArLocal` 實例
| Option | Description |
| ---- | ----------- |
| port | 要使用的埠 |
| showLogs | 顯示日誌 |
| dbPath | 臨時資料庫目錄 |
| persist | 在伺服器重啟時保留資料

### Example

要讓此範例運作，程式需使用產生的測試錢包。為此，專案中必須同時安裝 `arweave` 與 `arlocal` 套件

`yarn add arweave arlocal -D` 或 `npm install --save-dev arweave arlocal`

以下是一個使用 arlocal 在 Arweave 上建立資料交易並張貼的基本 JavaScript 測試範例：

```js
import ArLocal from "arlocal";
import Arweave from "arweave";

test("test transaction", async () => {
  // create and start ArLocal instance
  const arLocal = new ArLocal();
  await arLocal.start();
  // create local Arweave gateway
  const arweave = Arweave.init({
    host: "localhost",
    port: 1984,
    protocol: "http",
  });
  // generate wallet
  const wallet = await arweave.wallets.generate();
  // airdrop amount of tokens (in winston) to wallet
  await arweave.api.get(`mint/${addr}/10000000000000000`);
  // create mine function
  const mine = () => arweave.api.get("mine");
  try {
    // create transaction
    let transaction = await arweave.createTransaction(
      {
        data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>',
      },
      wallet
    );
    // sign and post transaction
    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);
    // mine transaction
    await mine();
    // test the response
  } catch (err) {
    console.error("ERROR: ", err.message);
  }
  // tear down testing environment
  await arLocal.stop();
});
```

::: warning
L1 交易的測試結果可能會與 L2 交易有所不同
:::

## Resources

[arlocal docs](https://github.com/textury/arlocal)
