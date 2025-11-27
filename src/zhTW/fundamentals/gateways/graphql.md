# GraphQL 查詢

GraphQL 在尋找交易或區塊的 **元資料**（例如交易 ID、標籤等）時特別有用。

當您需要存取與交易相關的實際資料時，請使用 HTTP API 或其他相關的 API/SDK。

## 概覽

隨著時間推移，實作 GraphQL 介面的索引服務已成為在 Arweave 上查詢交易資料的首選方法。索引服務會在交易與區塊被加入網路時讀取它們的標頭（通常來自該服務所操作的完整 Arweave 節點）。讀取後，標頭資訊會插入到可供索引與高效率查詢的資料庫中。索引服務使用這個資料庫為用戶端提供一個 GraphQL 端點以供查詢。

GraphQL 有幾項優勢，使其非常適合擷取查詢資料集。它讓索引服務能建立單一端點來查詢各種類型的資料。該服務能在單一請求中回傳多個資源，而不是像使用 REST API 時為每個資源發出一次 HTTP 請求。透過 GraphQL，用戶端可以在單次往返中批次多個請求，並精確指定所需的資料，從而提高效能。

## 基本查詢範例

以下 GraphQL 範例會查詢來自指定擁有者錢包位址且具有一個值為 "manifest" 的 "Type" 標籤的所有交易 ID。欲了解更多關於標籤的資訊，請閱讀 [交易標籤](../transactions/tags.md) 指南。

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

## 公開的索引服務

[https://arweave.net/graphql](https://arweave.net/graphql)

[https://arweave-search.goldsky.com/graphql](https://arweave-search.goldsky.com/graphql)

## 資源

- [查詢 Arweave 指南](../../guides/querying-arweave/querying-arweave.md)
- [ar-gql 套件](../../guides/querying-arweave/ar-gql.md)
- [GraphQL 參考](../../references/gql.md)
