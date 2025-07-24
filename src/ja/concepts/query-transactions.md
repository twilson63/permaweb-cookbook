---
locale: ja
---
# トランザクションのクエリ

データを永久に保存するだけでは不十分です。Arweaveを有用にするためには、データが発見可能で取得可能である必要があります。このガイドでは、Arweave上のデータをクエリするためのさまざまなアプローチをまとめています。

## GraphQL

時間の経過とともに、GraphQLインターフェースを実装するインデックスサービスは、Arweave上のトランザクションデータをクエリするための好ましい方法となりました。インデックスサービスは、ネットワークに追加されるトランザクションとブロックヘッダーを読み取ります（通常、サービスが運営する完全なArweaveノードから）。読み取られると、ヘッダー情報はデータベースに挿入され、インデックス化され、効率的にクエリされます。インデックスサービスはこのデータベースを使用して、クライアントがクエリできるGraphQLエンドポイントを提供します。

GraphQLには、クエリデータセットを取得するのに理想的な利点がいくつかあります。インデックスサービスは、すべてのタイプのデータをクエリできる単一のエンドポイントを作成できます。このサービスは、REST APIを使用する場合のように各リソースごとにHTTPリクエストを行うのではなく、単一のリクエストで複数のリソースを返すことができます。GraphQLを使用すると、クライアントは単一の往復で複数のリクエストをバッチ処理し、必要なデータを正確に指定できるため、パフォーマンスが向上します。

以下のGraphQLの例は、特定のオーナーのウォレットアドレスから「Type」タグの値が「manifest」であるすべてのトランザクションIDをクエリします。タグに関する詳細については、[トランザクションタグ](tags.md)に関するガイドをお読みください。

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

### 公開インデックスサービス

[https://arweave.net/graphql](https://arweave.net/graphql)

[https://arweave-search.goldsky.com/graphql](https://arweave-search.goldsky.com/graphql)

[https://knn3-gateway.knn3.xyz/arseeding/graphql](https://knn3-gateway.knn3.xyz/arseeding/graphql)

## ブロックの検査

Arweaveにアップロードされた各データは、独自のトランザクションIDを持ち、それぞれがユニークなブロックに含まれ、ブロックチェーンに追加されます。各トランザクションに関連付けられたデータは256KBのチャンクに分割され、Arweaveのデータセットに順次追加されます。現在のブロックから[ブロックを遡る](https://arweave.net/block/current)ことができ、各ブロックを検査して問題のトランザクションIDを見つけることができます。見つかったら、チャンクのオフセットをブロックから取得し、Arweaveピアからチャンクを直接リクエストするために使用できます。これはネットワーク上のデータを見つけて読むための最も低いレベルの方法です。幸いにも、[GraphQL](#graphql)のような労力の少ないアプローチが利用可能です。

## ARQL

::: warning
ARQLは非推奨であり、ゲートウェイまたはインデックスサービスでのGraphQLクエリに置き換えられました。一部のピアはまだARQLリクエストを処理するかもしれませんが、結果の可用性と正確性は保証されていません。
:::

Arweave Query Language (ARQL)は、Arweaveの開発初期に使用されていました。ブロックやチャンクと共に、ピアは個々のトランザクションをインデックス化したSQLデータベースも維持していました。クライアントはARQLを使用してピアにクエリを投げ、トランザクションデータを取得できました。以下はARQLクエリ構文の例です。

```js:no-line-numbers
let get_mail_query =
	{
		op: 'and',
		expr1: {
			op: 'equals',
			expr1: 'to',
			expr2: address
		},
		expr2: {
			op: 'equals',
			expr1: 'App-Name',
			expr2: 'permamail'
		}
	}

const res = await this.arweave.api.post(`arql`, get_mail_query)
```

このクエリ手法は、ウィーブデータセットが小さくインデックス化しやすかったため、十分でした。しかし、Arweaveの採用が加速するにつれて、データセットをインデックス化しARQLクエリに応じることは、計算コストの増加を引き起こしました。時間が経つにつれて、マイニングがますます競争的になり、ピアはARQLサービスを提供する余裕が少なくなっていきました。これが最終的にインデックスサービスと、今日のArweaveで一般的な[GraphQLクエリ](#graphql)の必要性のきっかけとなりました。

ただし、ピアから直接データをクエリする道は残されています。[Permaweb Payments Protocol (P3)](https://arweave.net/UoDCeYYmamvnc0mrElUxr5rMKUYRaujo9nmci206WjQ)は、クライアントがサービスの対価を支払うことを可能にするためにコミュニティによって開発された仕様です。P3を使用することで、インデックスサービスを提供したいピアは、そのサービスに対して料金を請求することで、利益を上げながら運営することが可能になります。

## リソース

-   [Arweaveのクエリガイド](../guides/querying-arweave/querying-arweave.md)
-   [ArDBパッケージ](../guides/querying-arweave/ardb.md)
-   [ar-gqlパッケージ](../guides/querying-arweave/ar-gql.md)
-   [GraphQLリファレンス](../references/gql.md)