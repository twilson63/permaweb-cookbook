# 使用 GraphQL 查詢 Arweave

本節介紹可用來使用 GraphQL 查詢 Arweave 資料的工具與函式庫。GraphQL 提供了一種強大且彈性的方式，讓你能從 Arweave 網路精準取得所需資料。

Arweave 提供了一個簡單的方式來查詢交易並依照 [tags](../fundamentals/transactions/tags.md) 進行篩選。

相容於 Arweave GraphQL 的索引服務提供可讓使用者張貼 GraphQL 查詢的端點，並且通常提供可以試驗查詢的 playground。

[GraphQL](https://graphql.org) 是一種彈性的查詢語言，服務可以用它來為用戶端建立自訂的資料結構供查詢。GraphQL 也允許用戶端指定希望在結果中看到可用資料結構的哪些元素。

## 公開索引服務

- [GraphQL](https://arweave.net/graphql) - 原始的 GraphQL 端點，由 [AR.IO](https://ar.io) 管理
- [Goldsky search service](https://arweave-search.goldsky.com/graphql) - 一個公開服務，專門針對搜尋進行優化，使用 GraphQL 語法的超集，由 [Goldsky](https://goldsky.com) 管理

## 執行 GraphQL 查詢

要查詢 Arweave，我們需要透過支援 GraphQL 的索引服務存取它。使用上面列出的其中一個 GraphQL playground 開始吧！

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

如果你不熟悉 GraphQL，起初可能會覺得有點難以理解。不過，一旦了解了結構，就相當容易閱讀與理解。

```text:no-line-numbers
query { <schema type> ( <filter criteria> ) { <data structure of the results> } }
```

在我們貼上的範例查詢中，我們的 `<schema type>` 是 `transactions`，但我們也可以查詢 `blocks`。

Arweave 的 GraphQL 架構完整說明寫在 [Arweave GraphQL Guide](https://gql-guide.arweave.net)。該指南將 `filter criteria` 稱為「Query Structures」，並將 `transactions` 與 `blocks` 的完整資料結構定義稱為「Data Structures」。

至於 `<data structure of the results>`，需要注意的是你可以指定完整資料結構中的一個子集作為你想要的結果。例如，transactions 架構的完整資料結構[列在這裡](https://gql-guide.arweave.net/#full-data)。

在本例中，我們對任何符合篩選條件的交易感興趣的是其 `id` 與完整的 `tags` 列表。

點擊 playground 中間的大「Play」按鈕以執行查詢。

![圖片](https://arweave.net/rYfVvFVKLFmmtXmf8KeTvsG8avUXMQ4qOBBTZRHqVU0)

你會注意到我們在結果資料結構中拿回了一個交易清單，該資料結構就是我們在原始查詢中指定的。

如果你是區塊鏈新手，這可能有點意外：我們什麼都沒建立，為什麼會有這些結果？事實上，我們所篩選的 `“PublicSquare”: “App-Name”` 標籤已經使用了一段時間。

Arweave 協議的創辦人 Sam Williams 幾年前在一個 [github code snippet](https://gist.github.com/samcamwilliams/811537f0a52b39057af1def9e61756b2) 中提出了交易格式。從那時起，生態系中的開發者一直在它的基礎上構建、試驗，並張貼帶有那些標籤的交易。

回到查詢 Arweave。你會發現在 GraphQL 結果中並沒有可讀的貼文內容，只有標籤和貼文的相關資訊。

這是因為 GraphQL 索引服務關注的是為交易與區塊建立索引與檢索標頭資料，而非其關聯的資料內容。

要取得交易的資料，我們需要使用另一個 HTTP 端點查詢它。

```text:no-line-numbers
https://arweave.net/<transaction id>
```

將你查詢結果中的其中一個 id 複製並貼上到上述連結，並在後面加上該 `id`。它應該看起來像這樣…

https://arweave.net/eaUAvulzZPrdh6_cHwUYV473OhvCumqT3K7eWI8tArk

在瀏覽器中導向該 URL（HTTP GET）會取得該貼文的內容（存放在交易的 data 中）。在本例中，內容為…

```text:no-line-numbers
Woah that's pretty cool 😎
```

（欲知 Arweave HTTP 端點的完整清單，請參閱 [HTTP API](https://docs.arweave.org/developers/server/http-api) 文件。）

## 從 JavaScript 發送查詢

從 JavaScript 發送 GraphQL 查詢與在 playground 中發送並沒有太大差異。

首先安裝 `arweave-js` 套件以便輕鬆存取 GraphQL 端點。

```console:no-line-numbers
npm install --save arweave
```

接著輸入一個比上述範例稍進階的查詢版本，並使用 `await` 等待張貼查詢後的結果。

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

可以在單次往返請求中向 GraphQL 端點張貼多個查詢。下例示範對兩個錢包地址（各作為獨立查詢）查詢 `name` 交易，使用現已被 `ar-profile` 取代但仍為永久性的 `arweave-id` 協議。

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
