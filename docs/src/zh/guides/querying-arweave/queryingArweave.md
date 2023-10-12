---
locale: zh
---
# 使用GraphQL查询Arweave
Arweave提供了一种简单的查询交易并通过[标签](../concepts/tags.md)对其进行过滤的方法。Arweave与GraphQL兼容的索引服务提供了用户可以提交GraphQL查询的端点，并提供用于尝试查询的游乐场。

[GraphQL](https://graphql.org)是一种灵活的查询语言，服务可以使用它来为客户端构建定制的数据模式以供查询。GraphQL还允许客户端指定希望在结果中看到哪些可用数据结构的元素。

## 公共索引服务

- [arweave.net graphql](https://arweave.net/graphql) 原始的GraphQL端点，由[ar.io](https://ar.io)管理
- [goldsky search service](https://arweave-search.goldsky.com/graphql) 一个专门针对使用超集的GraphQL语法进行搜索优化的公共服务，由[goldsky](https://goldsky.com)管理
- [ar.io decentralized indexing](https://ar-io.dev/graphql) 一个去中心化的索引服务网络。目前正在测试中，可用于L1交易。
- [knn3 arseeding indexing](https://knn3-gateway.knn3.xyz/arseeding/graphql) 一个针对 Arseeding 的交易可以实时查询的服务。

## 执行GraphQL查询
要对arweave进行查询，我们需要通过支持GraphQL的索引服务进行访问。使用上面列出的其中一个GraphQL游乐场来开始吧！

复制并粘贴以下查询
```graphql:no-line-numbers
query {
  transactions(tags: [{
    name: "App-Name",
    values: ["PublicSquare"]
  }]) 
  {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}
```

如果您对GraphQL不熟悉，起初可能会感到有些压力，但是一旦了解了其结构，它就相当容易阅读和理解。

```text:no-line-numbers
query { <schema type> ( <filter criteria> ) { <data structure of the results> } }
```
在我们粘贴的示例查询中，我们的`<schema type>`是`transactions`，但我们也可以查询`blocks`。Arweave的GraphQL schema的完整描述在[Arweave GraphQL Guide](https://gql-guide.arweave.dev)中有详细说明。该指南将“过滤准则”称为“Query Structures”，将`transactions`和`blocks`的完整数据结构定义称为“Data Structures”。

对于`<data structure of the results>`来说，需要注意的是您可以指定您感兴趣的完整数据结构的一个子集。例如，交易模式的完整数据结构在[此处列出](https://gql-guide.arweave.dev/#full-data)。

在我们的案例中，我们对与我们的过滤准则匹配的任何交易感兴趣的是`id`和完整的`tags`列表。

点击游乐场中间的大的“运行”按钮来运行该查询。

![image](https://arweave.net/rYfVvFVKLFmmtXmf8KeTvsG8avUXMQ4qOBBTZRHqVU0)

您会注意到，在结果数据结构中，我们以原始查询中指定的方式得到了一系列交易。

如果您是新手，对于区块链来说这是意想不到的，我们还没有构建任何东西，为什么会有这些结果？事实证明，我们过滤的“App-Name: PublicSquare”标签已经被使用了一段时间。

Arweave协议的创始人Sam Williams几年前在一个[github代码片段](https://gist.github.com/samcamwilliams/811537f0a52b39057af1def9e61756b2)中提出了交易格式。自那以后，生态系统中的构建者一直在其周围构建和实验，使用这些标签发布交易。

回到对Arweave的查询。您会注意到在GraphQL结果中，没有可读的帖子消息，只有标签和有关帖子的信息。

这是因为GraphQL索引服务关注的是交易和块的标头数据的索引和检索，而不是它们关联的数据。

要获取交易的数据，我们需要使用另一个HTTP端点进行查找。
```text:no-line-numbers
https://arweave.net/<transaction id>
```

复制并粘贴您查询结果中的一个id，并修改上述链接，添加`id`。它应该类似于这样…

https://arweave.net/eaUAvulzZPrdh6_cHwUYV473OhvCumqT3K7eWI8tArk

在浏览器中导航到该URL（HTTP GET）的结果将检索到帖子的内容（存储在交易数据中）。在这个例子中是…
```text:no-line-numbers
哇，这太酷了 😎
```
（有关完整的arweave HTTP端点列表，请访问[HTTP API](https://docs.arweave.org/developers/server/http-api)文档。）

## 在JavaScript中提交查询
从javascript提交GraphQL查询与在游乐场中提交查询并没有太大的区别。

首先安装`arweave-js`包以便轻松访问GraphQL端点。
```console:no-line-numbers
npm install --save arweave
```

然后输入上面示例查询的稍微更高级的版本，并"await"提交查询的结果。

```js:no-line-numbers
import Arweave from 'arweave';

// 初始化arweave实例
const arweave = Arweave.init({});

// 创建一个查询，选择具有指定标签的前100个tx数据
const queryObject = {
	query:
	`{
		transactions(
			first:100,
			tags: [
				{
					name: "App-Name",
					values: ["PublicSquare"]
				},
				{
					name: "Content-Type",
					values: ["text/plain"]
				}
			]
		) 
		{
			edges {
				node {
					id
					tags {
						name
						value
					}
				}
			}
		}
	}`
};
const results = await arweave.api.post('/graphql', queryObject);
```

## 多个查询
可以在单次往返到GraphQL 链接点中提交多个查询。此示例查询了两个钱包地址的“name”交易（每个查询分别查询），使用现在已被“ar-profile”替代但仍然持久的“arweave-id”协议。
```graphql:no-line-numbers
query {
	account1: transactions(first: 1, owners:["89tR0-C1m3_sCWCoVCChg4gFYKdiH5_ZDyZpdJ2DDRw"],
		tags: [
			{
				name: "App-Name",
				values: ["arweave-id"]
			},
			{
				name: "Type",
				values: ["name"]
			}
		]
	) {
		edges {
			node {
				id
					owner {
					address
				}
			}
		}
	}
	account2: transactions(first: 1, owners:["kLx41ALBpTVpCAgymxPaooBgMyk9hsdijSF2T-lZ_Bg"],
		tags: [
			{
				name: "App-Name",
				values: ["arweave-id"]
			},
			{
				name: "Type",
				values: ["name"]
			}
		]
	) {
		edges {
			node {
				id
					owner {
					address
				}
			}
		}
	}
}
```

## 资源
* [Arweave GQL参考](../../references/gql.md)
* [ArDB包](./ardb.md)
* [ar-gql包](./ar-gql.md)
* [Search Indexing Service](./search-indexing-service.md)