# GraphQL 查询

GraphQL 在寻找交易或区块的 **元数据**（例如交易 ID、标签等）时特别有用。

当您需要访问与交易相关的实际数据时，请使用 HTTP API 或其他相关的 API/SDK。

## 概览

随着时间推移，实现 GraphQL 接口的索引服务已成为在 Arweave 上查询交易数据的首选方法。索引服务会在交易与区块被加入网络时读取它们的标头（通常来自该服务所操作的完整 Arweave 节点）。读取后，标头信息会插入到可供索引与高效查询的数据库中。索引服务使用这个数据库为客户端提供一个 GraphQL 端点以供查询。

GraphQL 有几项优势，使其非常适合检索查询数据集。它让索引服务能建立单一端点来查询各类类型的数据。该服务能在单一请求中返回多个资源，而不是像使用 REST API 时为每个资源发出一次 HTTP 请求。通过 GraphQL，客户端可以在单次往返中批量多个请求，并精确指定所需的数据，从而提高性能。

## 基本查询范例

以下 GraphQL 示例会查询来自指定拥有者钱包地址且具有一个值为 "manifest" 的 "Type" 标签的所有交易 ID。欲了解更多关于标签的信息，请阅读 [交易标签](../transactions/tags.md) 指南。

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

## 公开的索引服务

[https://arweave.net/graphql](https://arweave.net/graphql)

[https://arweave-search.goldsky.com/graphql](https://arweave-search.goldsky.com/graphql)

## 资源

- [查询 Arweave 指南](../../guides/querying-arweave/querying-arweave.md)
- [ar-gql 套件](../../guides/querying-arweave/ar-gql.md)
- [GraphQL 参考](../../references/gql.md)
