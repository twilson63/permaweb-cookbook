---
locale: zh
---
# 查询交易记录
仅仅将数据永久保存并不足以使Arweave变得有用，数据还需要能够被发现和检索。本指南总结了在Arweave上查询数据的不同方法。

## GraphQL
随着时间的推移，实现GraphQL接口的索引服务已成为在Arweave上查询交易数据的首选方法。索引服务会读取网络上添加的交易和区块头信息（通常来自该服务运行的完整Arweave节点）。读取后，头部信息将被插入到数据库中，以便进行索引和高效查询。索引服务使用该数据库为客户端提供GraphQL端点以进行查询。

GraphQL拥有一些优势，使其成为检索查询数据集的理想选择。它使索引服务能够创建一个单一端点，然后用于查询所有类型的数据。该服务能够在单个请求中返回多个资源，而不是为每个资源进行一次HTTP请求（与使用REST API时相比）。使用GraphQL，客户端可以将多个请求批处理到单个往返中，并指定所需的确切数据，从而提高性能。

以下是一个GraphQL示例，查询具有值为"manifest"的"Type"标签的给定所有者钱包地址的所有交易ID。有关标签的更多信息，请阅读[Transaction Tags](tags.md)指南。

```js:no-line-numbers
const queryObject = {
	query:
	`{
		transactions (
			owners:["${address}"],
			tags: [
			  {
					name: "Type",
					values: ["manifest"]
				}
			]
		) {
			edges {
				node {
					id
				}
			}
		}
	}`
};
const results = await arweave.api.post('/graphql', queryObject);
```

### 公共索引服务
[https://arweave.net/graphql](https://arweave.net/graphql)

[https://arweave-search.goldsky.com/graphql](https://arweave-search.goldsky.com/graphql)

[https://knn3-gateway.knn3.xyz/arseeding/graphql](https://knn3-gateway.knn3.xyz/arseeding/graphql)

## 检查区块
上传到Arweave的每个数据都有其自己的唯一交易ID，并包含在唯一的区块中，然后添加到区块链中。与每个交易关联的数据被分割为256KB的块，并按顺序追加到Arweave的数据集中。可以从[当前区块](https://arweave.net/block/current)开始，逐个区块倒退，并检查其中的交易ID。找到后，可以从区块中检索到块的偏移量，并用于直接向Arweave节点请求块。这是在网络上定位和读取数据的最低级别方法。幸运的是，还有可用的工具，比如[GraphQL](#graphql)，可以减少工作量。

## ARQL
::: warning
ARQL已废弃，由基于网关或索引服务的GraphQL查询取代。一些节点可能仍然支持ARQL请求，但不保证结果的可用性和准确性。
:::
Arweave查询语言（ARQL）是Arweave早期开发中使用的方法。除了区块和块片之外，节点还维护了一个SQL数据库，用于索引各个交易。客户端可以使用ARQL查询节点并获取交易数据。以下是一个ARQL查询语法示例。

```js:no-line-numbers
let get_mail_query =
	{
		op: 'and',
		expr1: {
			op: 'equals',
			expr1: 'to',
			expr2: address
		},
		expr2: {
			op: 'equals',
			expr1: 'App-Name',
			expr2: 'permamail'
		}
	}

const res = await this.arweave.api.post(`arql`, get_mail_query)
```
这种查询方法在数据集较小且易于索引的情况下足够使用。随着Arweave的普及加速，索引数据集并响应ARQL查询导致了越来越大的计算成本。随着挖矿变得越来越具竞争力，节点越来越不可能支付提供ARQL服务的费用。这最终成为索引服务和当今Arweave上普遍使用的[GraphQL查询](#graphql)的动力。

然而，仍然有一种方法可以直接从节点查询数据。[Permaweb支付协议(P3)](https://arweave.net/UoDCeYYmamvnc0mrElUxr5rMKUYRaujo9nmci206WjQ)是由社区开发的一项规范，允许客户端为服务付费。使用P3，希望提供索引服务的节点可以通过收费来盈利并得以运营。

## 资源
* [Arweave查询指南](../guides/querying-arweave/queryingArweave.md)
* [ArDB包](../guides/querying-arweave/ardb.md)
* [ar-gql包](../guides/querying-arweave/ar-gql.md)
* [GraphQL参考](../references/gql.md)