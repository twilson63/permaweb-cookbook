# 使用 GraphQL 查詢 Arweave

本節說明可用於使用 GraphQL 查詢 Arweave 資料的工具與函式庫。GraphQL 提供了一種強大且靈活的方式，讓你從 Arweave 網路中精確擷取所需的資料。

Arweave 提供了一種簡單的方法來查詢交易並以 [標籤](../../fundamentals/transactions/tags.md) 進行篩選。

相容於 Arweave GraphQL 的索引服務提供可供使用者發送 GraphQL 查詢的端點，並且通常也提供一個可試用查詢的 playground（互動測試環境）。

[GraphQL](https://graphql.org) 是一種靈活的查詢語言，服務端可以使用它為客戶端建立自訂的資料結構供查詢。GraphQL 也允許客戶端指定希望在結果中看到的可用資料結構的元素。

## 公共索引服務

- [GraphQL](https://arweave.net/graphql) - 由 [AR.IO](https://ar.io) 管理的原始 GraphQL 端點
- [Goldsky search service](https://arweave-search.goldsky.com/graphql) - 一個專門為搜尋優化、使用 GraphQL 語法超集的公共服務，由 [Goldsky](https://goldsky.com) 管理

## 執行 GraphQL 查詢

要查詢 Arweave，我們需要透過支援 GraphQL 的索引服務來存取。使用上面列出的 GraphQL playground 開始即可！

複製並貼上以下查詢

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

如果你不熟悉 GraphQL，起初可能會覺得有些難以掌握。不過，一旦了解其結構後，就相當容易閱讀與理解。

```text:no-line-numbers
query { <schema type> ( <filter criteria> ) { <data structure of the results> } }
```

在範例查詢中，我們貼上的 `<schema type>` 是 `transactions`，但我們也可以查詢 `blocks`。

Arweave 的 GraphQL 架構完整說明寫在 [Arweave GraphQL Guide](https://gql-guide.arweave.net) 中。該指南將 `filter criteria` 稱為「Query Structures」，並將 `transactions` 和 `blocks` 的完整資料結構定義稱為「Data Structures」。

在 `<data structure of the results>` 方面，重點是你可以指定完整資料結構中你感興趣的子集。例如，transactions 架構的完整資料結構可在[此處列出](https://gql-guide.arweave.net/#full-data)。

在我們的例子中，我們對符合篩選條件的任何交易的 `id` 以及完整的 `tags` 清單感興趣。

在 playground 中按下中間的大「Play」按鈕即可執行查詢。

![圖片](https://arweave.net/rYfVvFVKLFmmtXmf8KeTvsG8avUXMQ4qOBBTZRHqVU0)

你會注意到我們在結果中拿回了交易清單，格式與我們在原始查詢中指定的資料結構相同。

如果你是區塊鏈新手，這可能會讓人感到意外：我們並沒有建立任何東西，為什麼這些結果會存在？事實是，我們篩選的 `“PublicSquare”: “App-Name”` 標籤已被使用了一段時間。

Arweave 協議的創始人 Sam Williams 幾年前在一個 [GitHub 程式碼片段](https://gist.github.com/samcamwilliams/811537f0a52b39057af1def9e61756b2) 中提出了交易格式。此後生態系統中的開發者一直在基於該格式進行開發與實驗，並張貼帶有那些標籤的交易。

回到查詢 Arweave。你會在 GraphQL 結果中注意到沒有可讀的貼文內容，只有標籤與貼文相關的資訊。

這是因為 GraphQL 索引服務主要負責索引與檢索交易與區塊的標頭資料（header data），而不是其關聯的資料內容。

要取得交易的資料內容，我們需要使用另一個 HTTP 端點查詢該交易。

```text:no-line-numbers
https://arweave.net/<transaction id>
```

複製並貼上查詢結果中的某一個 id，將上述連結修改為附加該 `id`。它應該會看起來像這樣…

https://arweave.net/eaUAvulzZPrdh6_cHwUYV473OhvCumqT3K7eWI8tArk

在瀏覽器中導向該 URL（HTTP GET）會取得該貼文的內容（儲存在交易的 data 中）。在此範例中內容為…

```text:no-line-numbers
Woah that's pretty cool 😎
```

（欲查看完整 Arweave HTTP 端點清單，請參閱 [HTTP API](https://docs.arweave.org/developers/server/http-api) 文件。）

## 從 JavaScript 發送查詢

從 JavaScript 發送 GraphQL 查詢與在 playground 中發送差異不大。

首先安裝 `arweave-js` 套件以方便存取 GraphQL 端點。

```console:no-line-numbers
npm install --save arweave
```

然後使用稍微進階一點的範例查詢並 `await` 發送查詢的結果。

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

## 多重查詢

可以在對 GraphQL 端點的單次請求中發送多個查詢。此範例對兩個錢包地址各自以獨立的查詢方式查詢 `name` 交易，使用現已被 `ar-profile` 取代但仍然永久存在的 `arweave-id` 協議。

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

## 資源

- [Arweave GraphQL Guide and Full Schema](https://gql-guide.arweave.net)
- [ar-gql package](https://github.com/johnletey/arGql)
