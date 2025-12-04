# GraphQL で Arweave をクエリする

このセクションでは、GraphQL を使用して Arweave データをクエリするためのツールとライブラリを説明します。GraphQL は、Arweave ネットワークから必要なデータを正確に取得するための強力かつ柔軟な手段を提供します。

Arweave は、トランザクションをクエリし、[タグ](../../fundamentals/transactions/tags.md)でフィルタリングする簡単な方法を提供しています。

Arweave の GraphQL 互換インデックスサービスは、ユーザーが GraphQL クエリを送信できるエンドポイントを提供するとともに、クエリを試すためのプレイグラウンドも提供しています。

[GraphQL](https://graphql.org) は、サービスがクライアント向けにカスタマイズされたデータスキーマを構築するために使用できる柔軟なクエリ言語です。GraphQL は、クライアントが利用可能なデータ構造のどの要素を結果に表示したいかを指定することも可能にします。

## 公開インデックスサービス

- [GraphQL](https://arweave.net/graphql) - 元祖の GraphQL エンドポイント、[AR.IO](https://ar.io) によって管理されています
- [Goldsky search service](https://arweave-search.goldsky.com/graphql) - GraphQL 構文のスーパーセットを用いて検索向けに最適化された公開サービス、[Goldsky](https://goldsky.com) によって管理されています

## GraphQL クエリの実行

Arweave をクエリするには、GraphQL をサポートするインデックスサービス経由でアクセスする必要があります。上で挙げた GraphQL プレイグラウンドのいずれかを使って始めてください。

以下のクエリをコピーして貼り付けてください

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

GraphQL に慣れていない場合、最初は少し圧倒されるかもしれません。しかし、構造を把握すれば読んで理解するのは比較的簡単です。

```text:no-line-numbers
query { <schema type> ( <filter criteria> ) { <data structure of the results> } }
```

この例のクエリでは、私たちが指定した `<schema type>` は `transactions` ですが、`blocks` をクエリすることもできます。

Arweave の GraphQL スキーマの詳細な説明は、[Arweave GraphQL Guide](https://gql-guide.arweave.net) に記載されています。ガイドでは `filter criteria` を「Query Structures」と呼び、`transactions` と `blocks` の完全なデータ構造定義を「Data Structures」としています。

`<data structure of the results>` に関して注目すべき点は、興味のある完全なデータ構造のサブセットを指定できることです。たとえば、transactions スキーマの完全なデータ構造は[こちらに一覧](https://gql-guide.arweave.net/#full-data)されています。

この例では、フィルタ条件に一致するトランザクションの `id` と全タグ一覧（`tags`）に興味があります。

プレイグラウンドの中央にある大きな「Play」ボタンを押してクエリを実行してください。

![画像](https://arweave.net/rYfVvFVKLFmmtXmf8KeTvsG8avUXMQ4qOBBTZRHqVU0)

元のクエリで指定したデータ構造に沿って、結果としてトランザクションのリストが返されることがわかるはずです。

ブロックチェーンに不慣れな場合は驚くかもしれません — 我々は何も構築していないのに、なぜこれらの結果が存在するのか？ 実は、フィルタした `“PublicSquare”: “App-Name”` タグは以前から使われてきました。

Arweave プロトコルの創設者 Sam Williams は数年前にトランザクションフォーマットを [github のコードスニペット](https://gist.github.com/samcamwilliams/811537f0a52b39057af1def9e61756b2) で提案しました。それ以来、エコシステム内の開発者がこれをベースに構築・実験を行い、これらのタグを付けたトランザクションを投稿してきました。

Arweave をクエリに戻すと、GraphQL の結果には読み取れる投稿メッセージはなく、タグや投稿に関する情報のみがあることがわかります。

これは、GraphQL インデックスサービスがトランザクションやブロックのヘッダデータのインデックス化と取得に関心がある一方で、それらに関連するデータ本体は対象としていないためです。

トランザクションのデータ本体を取得するには、別の HTTP エンドポイントを使って参照する必要があります。

```text:no-line-numbers
https://arweave.net/<transaction id>
```

クエリ結果の id のいずれかをコピーして上のリンクに貼り付けてください。例えば次のようになります…

https://arweave.net/eaUAvulzZPrdh6_cHwUYV473OhvCumqT3K7eWI8tArk

ブラウザでその URL に移動（HTTP GET）すると、投稿のコンテンツ（トランザクションのデータに保存された内容）を取得できます。この例では次のような内容です…

```text:no-line-numbers
Woah that's pretty cool 😎
```

（Arweave の HTTP エンドポイントの完全な一覧は[HTTP API](https://docs.arweave.org/developers/server/http-api) のドキュメントを参照してください。）

## JavaScript からクエリを投稿する

JavaScript から GraphQL クエリを投稿することは、プレイグラウンドに投稿する場合と大差ありません。

まず、GraphQL エンドポイントへのアクセスを簡単にするために `arweave` パッケージをインストールします。

```console:no-line-numbers
npm install --save arweave
```

次に、上の例を少し拡張したクエリを作成し、投稿結果を `await` します。

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

## 複数クエリ

GraphQL エンドポイントに対して 1 回の往復で複数のクエリを投稿することが可能です。次の例は、現在は廃止された（`ar-profile` に置き換えられました）が依然として恒久的な `arweave-id` プロトコルを使って、2 つのウォレットアドレスに対してそれぞれ `name` トランザクションをクエリするものです（各クエリは別名で実行されます）。

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

- [Arweave GraphQL Guide and Full Schema](https://gql-guide.arweave.net)
- [ar-gql package](https://github.com/johnletey/arGql)
