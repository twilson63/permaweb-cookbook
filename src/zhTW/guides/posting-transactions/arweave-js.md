# 使用 arweave-js 發佈交易

Arweave 原生交易可以使用 `arweave-js` 套件直接發佈到節點或閘道（gateway）。

::: info
Arweave 透過使用交易捆綁（transaction bundles）來進行擴展。這些捆綁使得每個區塊能包含幾乎無限數量的交易。

大多數交易為了可靠性會透過捆綁器（bundlers）發佈 —— 使用 `arweave-js` 則是直接將交易發佈到 Arweave，而不透過捆綁器。  
:::

## 安裝 arweave-js 套件

要安裝 `arweave-js` 請執行
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add arweave
```

  </CodeGroupItem>
</CodeGroup>

::: info
在使用 NodeJS 時，最低需要 NodeJS 18 或更高版本。
:::

## 初始化 arweave-js

```js:no-line-numbers
import Arweave from 'arweave';
import fs from "fs";

// 從磁碟載入 JWK 錢包金鑰檔案
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// 初始化 arweave 實例
const arweave = Arweave.init({});
```

## 發佈錢包對錢包的交易

一個基本的交易範例，將 AR 代幣從一個錢包地址移轉到另一個地址。

```js:no-line-numbers
//  create a wallet-to-wallet transaction sending 10.5AR to the target address
let transaction = await arweave.createTransaction({
  target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
  quantity: arweave.ar.arToWinston('10.5')
}, key);

// you must sign the transaction with your key before posting
await arweave.transactions.sign(transaction, key);

// post the transaction
const response = await arweave.transactions.post(transaction);
```

## 發佈資料交易

此範例示範如何從磁碟載入檔案並建立交易以將其資料存放到網路上。您可以在 [https://ar-fees.arweave.net](https://ar-fees.arweave.net) 查詢網路目前收取的價格。

```js:no-line-numbers
// load the data from disk
const imageData = fs.readFileSync(`iamges/myImage.png`);

// create a data transaction
let transaction = await arweave.createTransaction({
  data: imageData
}, key);

// add a custom tag that tells the gateway how to serve this data to a browser
transaction.addTag('Content-Type', 'image/png');

// you must sign the transaction with your key before posting
await arweave.transactions.sign(transaction, key);

// create an uploader that will seed your data to the network
let uploader = await arweave.transactions.getUploader(transaction);

// run the uploader until it completes the upload.
while (!uploader.isComplete) {
  await uploader.uploadChunk();
}
```

## 資源

- 欲瞭解所有可用的發佈交易方式，請參 [Posting Transactions](../../fundamentals/transactions/post-transactions.md) 區段。

- 欲瞭解 `arweave-js` 的詳細功能說明，請參閱 [GitHub 上的文件](https://github.com/ArweaveTeam/arweave-js)。
