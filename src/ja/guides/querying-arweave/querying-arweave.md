---
locale: ja
---
# ArweaveをGraphQLでクエリする
Arweaveはトランザクションをクエリし、[タグ](../concepts/tags.md)でフィルタリングするための簡単な方法を提供しています。ArweaveのGraphQL対応インデックスサービスは、ユーザーがGraphQLクエリを送信できるエンドポイントを提供し、クエリを試すためのプレイグラウンドも提供しています。

[GraphQL](https://graphql.org)は、サービスがクライアントがクエリできるカスタマイズされたデータスキーマを構築するために使用できる柔軟なクエリ言語です。GraphQLはまた、クライアントが結果に表示したいデータ構造の要素を指定することも可能にします。

## 公開インデックスサービス

- [arweave.net graphql](https://arweave.net/graphql) 元のgraphqlエンドポイント、[ar.io](https://ar.io)によって管理されています。
- [goldsky検索サービス](https://arweave-search.goldsky.com/graphql) 特に検索用に最適化された公開サービス、[goldsky](https://goldsky.com)によって管理されています。
- [ar.io分散インデックス](https://ar-io.dev/graphql) 分散型インデックスサービスのネットワーク。現在、L1トランザクションでテスト中です。
- [knn3 arseedingインデックス](https://knn3-gateway.knn3.xyz/arseeding/graphql) arseeding取引用のリアルタイムクエリサービスです。

## GraphQLクエリの実行
Arweaveをクエリするには、GraphQLをサポートするインデックスサービスを介してアクセスする必要があります。上記のGraphQLプレイグラウンドのいずれかを使用して始めましょう！

以下のクエリをコピーして貼り付けます

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



GraphQLに不慣れな場合、最初は少し圧倒されるかもしれませんが、構造を知ると、読みやすく理解しやすいものです。

```text:no-line-numbers
query { <schema type> ( <filter criteria> ) { <data structure of the results> } }
```
貼り付けた例のクエリでは、`<schema type>`が`transactions`ですが、`blocks`をクエリすることもできます。ArweaveのGraphQLスキーマの完全な説明は、[Arweave GraphQL Guide](https://gql-guide.arweave.net)に書かれています。このガイドでは、`filter criteria`を「クエリ構造」と呼び、`transactions`および`blocks`の完全なデータ構造定義を「データ構造」と呼んでいます。

`<data structure of the results>`に関して言えば、興味のあるデータ構造のサブセットを指定できることが重要です。たとえば、トランザクションスキーマの完全なデータ構造は[こちらにリストされています](https://gql-guide.arweave.net/#full-data)。

この場合、フィルタ基準に一致するトランザクションの`id`と完全な`tags`リストに興味があります。

プレイグラウンドの中央にある大きな「再生」ボタンをクリックしてクエリを実行します。

![image](https://arweave.net/rYfVvFVKLFmmtXmf8KeTvsG8avUXMQ4qOBBTZRHqVU0)

結果データ構造にリストされたトランザクションが返されるのに気づくでしょう。

ブロックチェーンに不慣れな場合、これは予期しないかもしれません。何も構築していないのに、なぜこれらの結果が存在するのでしょうか？実際、フィルタリングした`“PublicSquare”: “App-Name”`タグは、しばらくの間使用されていました。

Arweaveプロトコルの創設者であるSam Williamsは、数年前に[githubのコードスニペット](https://gist.github.com/samcamwilliams/811537f0a52b39057af1def9e61756b2)でトランザクション形式を提案しました。それ以来、エコシステム内のビルダーはそれを元に構築し、実験し、これらのタグを使ってトランザクションを投稿してきました。

Arweaveのクエリに戻ります。GraphQLの結果には、読み取り可能な投稿メッセージはなく、タグと投稿に関する情報だけが含まれています。

これは、GraphQLインデックスサービスがトランザクションやブロックのヘッダーデータのインデックス作成と取得に関心を持っているためであり、それらに関連するデータには関与していないためです。

トランザクションのデータを取得するには、別のHTTPエンドポイントを使用して検索する必要があります。
```text:no-line-numbers
https://arweave.net/<transaction id>
```

クエリ結果の1つの`id`をコピーして、上記のリンクを変更し、`id`を追加します。以下のようになるはずです…

https://arweave.net/eaUAvulzZPrdh6_cHwUYV473OhvCumqT3K7eWI8tArk

ブラウザでそのURLにナビゲートすると（HTTP GET）、投稿の内容（トランザクションデータに格納されている）が取得されます。この例では…
```text:no-line-numbers
Woah that's pretty cool 😎
```
（Arweave HTTPエンドポイントの完全なリストについては、[HTTP API](https://docs.arweave.org/developers/server/http-api)のドキュメントを参照してください。）

## JavaScriptからクエリを投稿する
JavaScriptからGraphQLクエリを投稿することは、プレイグラウンドで投稿するのとあまり変わりません。

まず、GraphQLエンドポイントへの簡単なアクセスのために`arweave-js`パッケージをインストールします。
```console:no-line-numbers
npm install --save arweave
```

次に、上記の例のクエリのやや高度なバージョンを入力し、結果を`await`します。

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

## 複数のクエリ
GraphQLエンドポイントへの1回のラウンドトリップで複数のクエリを投稿することも可能です。この例では、`arweave-id`プロトコル（現在は`ar-profile`に置き換えられていますが、依然として永久的です）を使用して2つのウォレットアドレスの`name`トランザクションをクエリします。
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


## リソース
* [Arweave GQLリファレンス](../../references/gql.md)
* [ArDBパッケージ](./ardb.md)
* [ar-gqlパッケージ](./ar-gql.md)
* [検索インデックスサービス](./search-indexing-service.md)