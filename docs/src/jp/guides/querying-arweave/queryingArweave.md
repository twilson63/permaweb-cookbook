---
locale: jp
---
# GraphQLを使用してArweaveをクエリする
Arweaveは、[タグ](../concepts/tags.md)を使用してトランザクションをクエリし、フィルタリングするための簡単な方法を提供します。ArweaveのGraphQL互換のインデックスサービスは、ユーザーがGraphQLクエリを投稿するためのエンドポイントを提供し、クエリを試すためのプレイグラウンドも提供します。

[GraphQL](https://graphql.org)は、サービスがクライアントのためにカスタマイズされたデータスキーマを構築するために使用できる柔軟なクエリ言語です。GraphQLはまた、クライアントが結果に表示する利用可能なデータ構造の要素を指定することも可能です。

## パブリックインデックスサービス

- [arweave.net graphql](https://arweave.net/graphql)：[ar.io](https://ar.io)が管理する元のGraphQLエンドポイント
- [goldsky検索サービス](https://arweave-search.goldsky.com/graphql)：[goldsky](https://goldsky.com)が管理する、特にGraphQL構文のスーパーセットを使用して検索を最適化したパブリックサービス
- [ar.io分散型インデックス](https://ar-io.dev/graphql)：インデックスサービスのための分散型ネットワーク。現在はL1トランザクションでテスト中です。

## GraphQLクエリの実行
Arweaveをクエリするには、GraphQLをサポートするインデックスサービスを介してアクセスする必要があります。上記のいずれかのGraphQLプレイグラウンドを使用して始めましょう！

次のクエリをコピーして貼り付けます
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

GraphQLに詳しくない場合、最初は少し圧倒されるかもしれませんが、構造を知ってしまえば、読み取りやすく理解しやすいです。

```text:no-line-numbers
query { <スキーマの種類> ( <フィルタ条件> ) { <結果のデータ構造> } }
```
この例のクエリを貼り付けた場合、`<スキーマの種類>`は`transactions`ですが、`blocks`に対してもクエリを実行できます。ArweaveのGraphQLスキーマの詳細な記述は、[Arweave GraphQL Guide](https://gql-guide.arweave.dev)に書かれています。このガイドでは、`フィルタ条件`を「クエリ構造」と呼び、`transactions`と`blocks`の完全なデータ構造定義を「データ構造」と呼んでいます。

結果の`<結果のデータ構造>`に関しては、興味のある完全なデータ構造の一部を指定できるということに注意してください。たとえば、トランザクションスキーマの完全なデータ構造は[ここにリストされています](https://gql-guide.arweave.dev/#full-data)。

この場合、フィルタ条件に一致するトランザクションの`id`と完全なタグリストに興味があります。

プレイグラウンドの中央にある大きな「再生」ボタンをクリックしてクエリを実行します。

![image](https://arweave.net/rYfVvFVKLFmmtXmf8KeTvsG8avUXMQ4qOBBTZRHqVU0)

元のクエリで指定した結果のデータ構造が返されます。

ブロックチェーンに馴染みがない場合、これは予期しない結果です。何も構築していないのに、なぜこれらの結果が存在するのでしょうか？実は、フィルタリングした「App-Name」タグがしばらく使われていたからです。

Arweaveプロトコルの創設者であるサム・ウィリアムズは、数年前に[GitHubのコードスニペット](https://gist.github.com/samcamwilliams/811537f0a52b39057af1def9e61756b2)でトランザクション形式を提案しました。それ以来、エコシステムの開発者はその周りにビルドし、実験し、それらのタグを持つトランザクションを投稿しています。

Arweaveへのクエリに戻りましょう。GraphQLの結果では、読み取り可能な投稿メッセージはなく、タグと投稿に関する情報のみが表示されます。

これは、GraphQLインデックスサービスがトランザクションやブロックのヘッダデータのインデックス作成と取得に関心を持っているが、それらに関連するデータには関心を持っていないためです。

トランザクションのデータを取得するには、別のHTTPエンドポイントを使用して調べる必要があります。
```text:no-line-numbers
https://arweave.net/<トランザクションID>
```

クエリの結果のIDを1つコピーして貼り付け、上記のリンクに`id`を追加します。次のようになります...

https://arweave.net/eaUAvulzZPrdh6_cHwUYV473OhvCumqT3K7eWI8tArk

ブラウザでこのURLに移動する（HTTP GET）と、投稿のコンテンツ（トランザクションのデータに格納されている）が取得されます。この例では...
```text:no-line-numbers
Woah that's pretty cool 😎
```
(アルウィーヴのHTTPエンドポイントの完全なリストについては、[HTTP API](https://docs.arweave.org/developers/server/http-api)のドキュメントを参照してください。)

## JavaScriptからクエリを投稿する
JavaScriptからGraphQLクエリを投稿することは、プレイグラウンドに投稿することとあまり変わりません。

まず、`arweave-js`パッケージをインストールして簡単にGraphQLエンドポイントにアクセスできるようにします。
```console:no-line-numbers
npm install --save arweave
```

次に、上記の例クエリのやや高度なバージョンを入力し、その投稿結果を`await`します。

```js:no-line-numbers
import Arweave from 'arweave';

// arweaveのインスタンスを初期化する
const arweave = Arweave.init({});

// トランザクションのデータを選択するクエリを作成する（特定のタグを持つ最初の100トランザクション）
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
1回のラウンドトリップで複数のクエリをGraphQLエンドポイントに投稿することも可能です。この例では、既に無効になっていますが（`ar-profile`に置き換えられました）、それでも永続的な`arweave-id`プロトコルを使用して、2つのウォレットアドレスに対して「名前」トランザクションをクエリします。
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