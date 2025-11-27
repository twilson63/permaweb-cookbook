# arweave-js를 사용한 트랜잭션 게시

Arweave 네이티브 트랜잭션은 `arweave-js` 패키지를 사용하여 노드나 게이트웨이에 직접 게시할 수 있습니다.

::: info
Arweave는 트랜잭션 번들을 사용하여 확장됩니다. 이러한 번들은 각 블록이 거의 무제한의 트랜잭션을 포함할 수 있게 합니다.

대부분의 트랜잭션은 신뢰성을 위해 번들러를 통해 Arweave에 게시됩니다 — `arweave-js`를 사용하면 번들러 없이 트랜잭션을 Arweave에 직접 게시합니다.  
:::

## arweave-js 패키지 설치

다음 명령으로 `arweave-js`를 설치하세요
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
NodeJS 환경에서 작업할 때 최소 NodeJS 18 이상이 필요합니다.
:::

## arweave-js 초기화

```js:no-line-numbers
import Arweave from 'arweave';
import fs from "fs";

// load the JWK wallet key file from disk
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// initialize an arweave instance
const arweave = Arweave.init({});
```

## 지갑-대-지갑 트랜잭션 게시

한 지갑 주소에서 다른 지갑 주소로 AR 토큰을 이동하는 기본 트랜잭션 예제입니다.

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

## 데이터 트랜잭션 게시

이 예제는 디스크에서 파일을 로드하고 해당 데이터를 네트워크에 저장하기 위한 트랜잭션을 생성하는 방법을 보여줍니다. 네트워크에서 부과하는 현재 수수료는 [https://ar-fees.arweave.net](https://ar-fees.arweave.net)에서 확인할 수 있습니다.

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

## 리소스

- 트랜잭션을 게시할 수 있는 모든 방법의 개요는 쿠킹북의 [트랜잭션 게시](../../fundamentals/transactions/post-transactions.md) 섹션을 참조하세요.

- `arweave-js`의 모든 기능에 대한 자세한 설명은 [GitHub](https://github.com/ArweaveTeam/arweave-js)에 있는 문서를 참조하세요.
