---
locale: ja
---
# arseeding.jsを使用したトランザクションの投稿
`arseeding-js` JavaScript SDKパッケージを使用して、Arweaveネットワーク上でトランザクションを公開できます。Arseedingは、トランザクションをネットワーク内のすべてのArweaveノードに自動的にブロードキャストし、トランザクションがすべてのArweaveノードの保留プールに迅速に受信されることを保証します。これにより、トランザクションのパッケージング速度が向上します。

## arseeding.jsのインストール
`arseeding.js`をインストールするには、次のコマンドを実行します：


<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install arseeding-js
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add arseeding-js
```

  </CodeGroupItem>
</CodeGroup>


## データをアップロードするためのトランザクション
Arseedingを使用する場合、[everpay](https://app.everpay.io/)でアカウントに事前に資金を入れておく必要があります。この残高は、$ARトークンまたは他の暗号通貨で資金を供給できます。もう1つの違いは、Arseedingサービスがあなたのデータをブロックチェーンに確実に載せることを保証する点です。

```js:no-line-numbers
const { genNodeAPI } = require('arseeding-js')

const run = async () => {
  const instance = genNodeAPI('YOUR PRIVATE KEY')
  const arseedUrl = 'https://arseed.web3infra.dev'
  const data = Buffer.from('........')
  const payCurrencyTag = 'ethereum-usdc-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' // everPay supported token tag (chainType-symbol-id)
  const options = {
    tags: [{ name: 'Content-Type', value: 'image/png' }]
  }
  const res = await instance.sendAndPay(arseedUrl, data, payCurrencyTag, options)
  console.log('res', res)
}
run()
```


## リソース
* トランザクションを公開するためのすべてのメソッドの概要については、操作マニュアルの[Publishing Transactions](../../concepts/post-transactions.md)セクションを参照してください。

* 完全なArseedingのドキュメントは、[Arseedingのウェブサイト](https://web3infra.dev/docs/arseeding/introduction/lightNode/)で確認できます。

* Arseeding Upload Manifestチュートリアルは[こちら](https://web3infra.dev/docs/arseeding/sdk/arseeding-js/manifest/)でフォローしてください。