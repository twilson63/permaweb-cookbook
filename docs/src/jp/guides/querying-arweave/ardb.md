---
locale: jp
---
＃ArDB
GraphQLを使って、arweaveからトランザクションやブロックデータを照会することができるライブラリです。お気に入りのコードエディタで補完を使用してクエリを構築するだけで、GraphQLのパラメータ名を覚える必要はありません。

## インストール
```console:no-line-numbers
yarn add ardb
```

## 例
```js:no-line-numbers
import Arweave from 'arweave';
import ArDB from 'ardb';

// arweaveのインスタンスを初期化
const arweave = Arweave.init({});

// arweaveはArweave Clientインスタンスです
const ardb = new ArDB(arweave);

// IDを指定して単一のトランザクションを取得
const tx = await ardb.search('transaction')
	.id('A235HBk5p4nEWfjBEGsAo56kYsmq7mCCyc5UZq5sgjY')
	.findOne();

// トランザクションの配列を取得し、最初の結果のみ含める
const txs = await ardb.search('transactions')
	.appName('SmartWeaveAction')
	.findOne();

// これは次と同じです:
const txs = await ardb.search('transactions')
	.tag('App-Name', 'SmartWeaveAction')
	.limit(1)
	.find();

// 特定の所有者/ウォレットアドレスから複数のトランザクションを検索
const txs = await ardb.search('transactions')
	.from('BPr7vrFduuQqqVMu_tftxsScTKUq9ke0rx4q5C9ieQU')
	.find();

// 結果を続けてページングするには...
const newTxs = await ardb.next();

// または、次のように一度にすべての結果を取得することもできます：
const txs = await ardb.search('blocks')
	.id('BkJ_h-GGIwfek-cJd-RaJrOXezAc0PmklItzzCLIF_aSk36FEjpOBuBDS27D2K_T')
	.findAll();

```

## リソース
* [ArDB NPMパッケージ](https://www.npmjs.com/package/ardb)