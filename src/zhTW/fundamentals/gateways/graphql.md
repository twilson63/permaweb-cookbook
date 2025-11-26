# GraphQL 查詢

GraphQL 在需要尋找交易或區塊的 **元資料**（例如交易 ID、標籤等）時特別有用。

當您需要存取與交易相關的實際資料時，請使用 HTTP API 或其他相關的 API/SDK。

## 概覽

隨著時間推移，實作 GraphQL 介面的索引服務已逐漸成為在 Arweave 上查詢交易資料的首選方法。索引服務會在交易和區塊標頭新增到網路時讀取它們（通常是從該服務所操作的完整 Arweave 節點）。讀取後，標頭資訊會被插入到資料庫中，藉此進行索引並高效查詢。索引服務使用這個資料庫來提供一個 GraphQL 端點供客戶端查詢。

GraphQL 有一些優點，使其非常適合用來擷取查詢資料集。它讓索引服務能夠建立單一端點，該端點可用來查詢所有類型的資料。服務能在單一請求中回傳多個資源，而非像 REST API 那樣為每個資源發出一個 HTTP 請求。使用 GraphQL，客戶端可以在單一往返中批次多個請求，並精確指定所需的資料，從而提升效能。

## 基本查詢範例

下面的 GraphQL 範例會查詢來自特定擁有者的錢包地址，且具有名為 "Type" 且值為 "manifest" 的標籤的所有交易 ID。關於標籤的更多資訊，請閱讀 [交易標籤](../transactions/tags.md) 指南。

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

## 公共索引服務

[https://arweave.net/graphql](https://arweave.net/graphql)

[https://arweave-search.goldsky.com/graphql](https://arwe
