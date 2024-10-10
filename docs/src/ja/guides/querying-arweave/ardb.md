---
locale: ja
---
# ArDB
GraphQLの上に構築されたライブラリで、GraphQLのパラメータ名を暗記することなく、Arweaveからトランザクションおよびブロックデータをクエリすることができます。お気に入りのコードエディタでオートコンプリートを使用してクエリを構築するだけです。

## Installation
```console:no-line-numbers
yarn add ardb
```

## Example
```js:no-line-numbers
import Arweave from 'arweave';
import ArDB from 'ardb';

// initialize an arweave instance
const arweave = Arweave.init({});

// arweave is Arweave Client instance
const ardb = new ArDB(arweave);

// Get a single transaction by its id
const tx = await ardb.search('transaction')
	.id('A235HBk5p4nEWfjBEGsAo56kYsmq7mCCyc5UZq5sgjY')
	.findOne();

// Get an array of transactions and include only the first result
const txs = await ardb.search('transactions')
	.appName('SmartWeaveAction')
	.findOne();

// This is the same as doing:
const txs = await ardb.search('transactions')
	.tag('App-Name', 'SmartWeaveAction')
	.limit(1)
	.find();

// Search for multiple transactions from a specific owner/wallet address
const txs = await ardb.search('transactions')
	.from('BPr7vrFduuQqqVMu_tftxsScTKUq9ke0rx4q5C9ieQU')
	.find();

// Continue paging though the results with...
const newTxs = await ardb.next();

// Or you could get all results at once by doing:
const txs = await ardb.search('blocks')
 .id('BkJ_h-GGIwfek-cJd-RaJrOXezAc0PmklItzzCLIF_aSk36FEjpOBuBDS27D2K_T')
 .findAll();

```

## リソース
* [ArDB NPMパッケージ](https://www.npmjs.com/package/ardb)