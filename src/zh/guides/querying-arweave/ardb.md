---
locale: zh
---
# ArDB
一个构建在 GraphQL 之上的库，可以从 arweave 查询交易和区块数据，而无需记住 GraphQL 参数名称。只需在您喜欢的代码编辑器中使用自动完成构建查询。

## 安装
```console:no-line-numbers
yarn add ardb
```

## 示例
```js:no-line-numbers
import Arweave from 'arweave';
import ArDB from 'ardb';

// 初始化arweave实例
const arweave = Arweave.init({});

// arweave是Arweave客户端实例
const ardb = new ArDB(arweave);

// 通过id获取单个交易
const tx = await ardb.search('transaction')
	.id('A235HBk5p4nEWfjBEGsAo56kYsmq7mCCyc5UZq5sgjY')
	.findOne();

// 获取一个交易数组，并且只包含第一个结果
const txs = await ardb.search('transactions')
	.appName('SmartWeaveAction')
	.findOne();

// 这与以下操作相同：
const txs = await ardb.search('transactions')
	.tag('App-Name', 'SmartWeaveAction')
	.limit(1)
	.find();

// 搜索来自特定所有者/钱包地址的多个交易
const txs = await ardb.search('transactions')
	.from('BPr7vrFduuQqqVMu_tftxsScTKUq9ke0rx4q5C9ieQU')
	.find();

// 使用以下方式继续翻页...
const newTxs = await ardb.next();

// 或者可以通过以下方式一次获取所有结果：
const txs = await ardb.search('blocks')
 .id('BkJ_h-GGIwfek-cJd-RaJrOXezAc0PmklItzzCLIF_aSk36FEjpOBuBDS27D2K_T')
 .findAll();
```

## 资源
* [ArDB NPM包](https://www.npmjs.com/package/ardb)