# arlocal

`arlocal` 是一個用於快速建立和運行本地 Arweave 測試環境的工具。它允許您在類似 Arweave 閘道的伺服器上測試交易，讓開發者能在部署到 Arweave 網路之前於模擬環境中測試應用程式。

使用時不需要 $AR 代幣，且交易為即時完成。

## CLI

您必須在機器上安裝 node 與 npm 才能使用 arlocal CLI

要啟動本地閘道，執行 `npx arlocal`

::: tip
您可以透過傳遞埠號作為參數來指定精簡閘道要運行的埠
`npx arlocal 8080`
:::

若要隱藏日誌，啟動閘道時加入旗標 `--hidelogs`
`npx arlocal --hidelogs`

## Node

將此套件作為開發相依安裝，執行
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

可以使用選項建立 `ArLocal` 實例
| Option | Description |
| ---- | ----------- |
| port | 使用的埠 |
| showLogs | 是否顯示日誌 |
| dbPath | 臨時資料庫的目錄 |
| persist | 在伺服器重啟間保留資料 |

### 範例

此範例要運作，程式需使用產生的測試錢包。為此，專案必須同時安裝 `arweave` 與 `arlocal` 套件

`yarn add arweave arlocal -D` 或 `npm install --save-dev arweave arlocal`

下面是一個使用 arlocal 在 Arweave 上建立資料交易並發布的基本 JavaScript 測試範例：

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
來自 L1 交易的測試結果可能會與 L2 交易有所不同
:::

## 資源

[arlocal 文件](https://github.com/textury/arlocal)
