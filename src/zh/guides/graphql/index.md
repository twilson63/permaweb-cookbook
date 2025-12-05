# 使用 GraphQL 查询 Arweave

本节说明可用于使用 GraphQL 查询 Arweave 数据的工具与库。GraphQL 提供了一种强大且灵活的方式，让你从 Arweave 网络中精确提取所需的数据。

Arweave 提供了一种简单的方法来查询交易并以 [标签](../../fundamentals/transactions/tags.md) 进行筛选。

兼容 Arweave GraphQL 的索引服务提供可供用户发送 GraphQL 查询的端点，并且通常也提供一个可试用查询的 playground（互动测试环境）。

[GraphQL](https://graphql.org) 是一种灵活的查询语言，服务端可以使用它为客户端建立自定义的数据结构供查询。GraphQL 也允许客户端指定希望在结果中看到的可用数据结构的元素。

## 公共索引服务

- [GraphQL](https://arweave.net/graphql) - 由 [AR.IO](https://ar.io) 管理的原始 GraphQL 端点
- [Goldsky search service](https://arweave-search.goldsky.com/graphql) - 一个专门为搜索优化、使用 GraphQL 语法超集的公共服务，由 [Goldsky](https://goldsky.com) 管理

## 执行 GraphQL 查询

要查询 Arweave，我们需要透过支持 GraphQL 的索引服务来访问。使用上面列出的 GraphQL playground 开始即可！

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

如果你不熟悉 GraphQL，起初可能会觉得有些难以掌握。不过，一旦了解其结构后，就相当容易阅读与理解。

```text:no-line-numbers
query { <schema type> ( <filter criteria> ) { <data structure of the results> } }
```

在示例查询中，我们粘贴的 `<schema type>` 是 `transactions`，但我们也可以查询 `blocks`。

Arweave 的 GraphQL 架构完整说明写在 [Arweave GraphQL Guide](https://gql-guide.arweave.net) 中。该指南将 `filter criteria` 称为“Query Structures”，并将 `transactions` 和 `blocks` 的完整数据结构定义称为“Data Structures”。

在 `<data structure of the results>` 方面，重点是你可以指定完整数据结构中你感兴趣的子集。例如，transactions 架构的完整数据结构可在[此处列出](https://gql-guide.arweave.net/#full-data)。

在我们的例子中，我们对符合筛选条件的任何交易的 `id` 以及完整的 `tags` 列表感兴趣。

在 playground 中按下中间的大「Play」按钮即可执行查询。

![图片](https://arweave.net/rYfVvFVKLFmmtXmf8KeTvsG8avUXMQ4qOBBTZRHqVU0)

你会注意到我们在结果中拿回了交易列表，格式与我们在原始查询中指定的数据结构相同。

如果你是区块链新手，这可能会让人感到意外：我们并没有创建任何东西，为什么这些结果会存在？事实是，我们筛选的 `"PublicSquare": "App-Name"` 标签已被使用了一段时间。

Arweave 协议的创始人 Sam Williams 几年前在一个 [GitHub 代码片段](https://gist.github.com/samcamwilliams/811537f0a52b39057af1def9e61756b2) 中提出了交易格式。此后生态系统中的开发者一直在基于该格式进行开发与实验，并发布带有那些标签的交易。

回到查询 Arweave。你会在 GraphQL 结果中注意到没有可读的帖子内容，只有标签与帖子相关的信息。

这是因为 GraphQL 索引服务主要负责索引与检索交易与区块的头部数据（header data），而不是其关联的数据内容。

要获取交易的数据内容，我们需要使用另一个 HTTP 端点查询该交易。

```text:no-line-numbers
https://arweave.net/<transaction id>
```

复制并粘贴查询结果中的某一个 id，将上述链接修改为附加该 `id`。它应该会看起来像这样…

https://arweave.net/eaUAvulzZPrdh6_cHwUYV473OhvCumqT3K7eWI8tArk

在浏览器中导向该 URL（HTTP GET）会取得该帖子的内容（存储在交易的 data 中）。在此示例中内容为…

```text:no-line-numbers
Woah that's pretty cool 😎
```

（欲查看完整 Arweave HTTP 端点清单，请参阅 [HTTP API](https://docs.arweave.org/developers/server/http-api) 文档。）

## 从 JavaScript 发送查询

从 JavaScript 发送 GraphQL 查询与在 playground 中发送差异不大。

首先安装 `arweave-js` 包以方便访问 GraphQL 端点。

```console:no-line-numbers
npm install --save arweave
```

然后使用稍微进阶一点的示例查询并 `await` 发送查询的结果。

```js:no-line-numbers
import Arweave from 'arweave';

// initialize an arweave instance
const arweave = Arweave.init({});

// create a query that selects tx data the first 100 tx with specific tags
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

## 多重查询

可以在对 GraphQL 端点的单次请求中发送多个查询。此示例对两个钱包地址各自以独立的查询方式查询 `name` 交易，使用现已被 `ar-profile` 取代但仍然永久存在的 `arweave-id` 协议。

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

- [Arweave GraphQL 指南与完整架构](https://gql-guide.arweave.net)
- [ar-gql 包](https://github.com/johnletey/arGql)
