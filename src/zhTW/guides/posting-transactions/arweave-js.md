# 使用 arweave-js 發佈交易

可使用 `arweave-js` 套件將 Arweave 原生交易直接發佈到節點或閘道（gateway）。

::: info
Arweave 透過交易捆綁（transaction bundles）來擴展。這些捆綁使得每個區塊能包含幾乎無限制數量的交易。

為了可靠性，大多數交易是透過 bundler 發佈到 Arweave；使用 `arweave-js` 則會直接向 Arweave 發佈交易，而不經 bundler。  
:::

## 安裝 arweave-js 套件

要安裝 `arweave-js`，請執行
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

// load the JWK wallet key file from disk
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// initialize an arweave instance
const arweave = Arweave.init({});
```

## 發佈錢包到錢包的交易

一個基本的交易範例，示範如何將 AR 代幣從一個錢包地址轉移到另一個錢包。

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

此範例說明如何從磁碟載入檔案並建立交易以將資料儲存到網路上。您可以在 [https://ar-fees.arweave.net](https://ar-fees.arweave.net) 查詢網路目前收費。

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

- 若要概覽所有發佈交易的方法，請參閱 cookbook 的 [Posting Transactions](../../fundamentals/transactions/post-transactions.md) 章節。

- 欲瞭解 `arweave-js` 所有功能的更詳細說明，請參閱 [GitHub 上的文件](https://github.com/ArweaveTeam/arweave-js)。
