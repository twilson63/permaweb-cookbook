---
locale: jp
---
# トランザクションのクエリ
データを永続的に保存するだけでは十分ではありません。Arweaveが有用になるには、データを発見可能で取得可能にする必要があります。このガイドでは、Arweave上のデータをクエリするための異なるアプローチをまとめています。

## GraphQL
時間の経過とともに、GraphQLインターフェースを実装するインデックスサービスが、Arweave上のトランザクションデータをクエリするための優先される方法となってきました。インデックスサービスは、ネットワークに追加されるトランザクションとブロックヘッダーを読み取ります（通常はサービスが運営するフルのArweaveノードから）。読み取られたヘッダー情報はデータベースに挿入され、インデックス作成および効率的なクエリが可能になります。インデックスサービスはこのデータベースを使用して、クライアントがクエリを行うためのGraphQLエンドポイントを提供します。

GraphQLには、クエリデータセットを取得するためのいくつかの利点があります。これにより、インデックスサービスは複数のリソースを単一のリクエストで返すことができます。また、GraphQLでは、クライアントは単一のラウンドトリップで複数のリクエストをまとめて送信し、必要なデータを具体的に指定することができます。これによりパフォーマンスが向上します。

以下のGraphQLの例は、指定した所有者のウォレットアドレスから「Type」タグの値が「manifest」であるすべてのトランザクションIDをクエリします。タグの詳細については、[Transaction Tags（タグ）のガイド](tags.md)を参照してください。

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

### パブリックインデックスサービス
[https://arweave.net/graphql](https://arweave.net/graphql)

[https://arweave-search.goldsky.com/graphql](https://arweave-search.goldsky.com/graphql)

## ブロックの検査
Arweaveにアップロードされるデータは、個々のトランザクションIDとともに固有のブロックに含まれ、それがブロックチェーンに追加されます。各トランザクションに関連するデータは、256KBのチャンクに分割され、順次Arweaveのデータセットに追記されます。[現在のブロック](https://arweave.net/block/current)からブロックごとに後戻りし、調査するトランザクションIDを見つけることが可能です。見つかった場合、チャンクのオフセットをブロックから取得し、Arweaveピアから直接チャンクをリクエストすることができます。これはネットワーク上のデータを探索して読み取るための最も基本的な方法です。幸いなことに、[GraphQLのような](#graphql)手間のかからないアプローチも利用できます。

## ARQL
::: warning
ARQLは非推奨であり、ゲートウェイまたはインデックスサービスでのGraphQLクエリに置き換えられました。一部のピアはまだARQLリクエストを受け入れるかもしれませんが、結果の利用可能性と精度は保証されません。
:::
Arweave Query Language (ARQL) は、Arweaveの初期の開発では使用されました。ブロックやチャンクと並行して、ピアは個々のトランザクションをインデックス化したSQLデータベースを保持していました。クライアントはARQLを使用してピアにクエリを行い、トランザクションデータを取得できました。以下はARQLクエリの例です。

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
このクエリ手法は、Weaveのデータセットが小さくインデックス化が容易な場合には十分でした。しかし、Arweaveの採用が加速するにつれて、データセットのインデックス作成およびARQLクエリへの応答は、計算コストが増大しました。マイニングがますます競争力を持つようになるにつれて、ピアはARQLサービスを提供するのに十分な費用を負担できなくなりました。結果的に、これがインデックスサービスと[GraphQLクエリ](#graphql)のArweaveで一般的な手法の実現の原動力となりました。

しかし、ピアから直接データをクエリできる方法への道もあります。コミュニティによって開発された[Permaweb Payments Protocol（P3）](https://arweave.net/UoDCeYYmamvnc0mrElUxr5rMKUYRaujo9nmci206WjQ)は、クライアントがサービス料金を支払うための仕様です。P3を使用することで、インデックスサービスを提供したいピアは、サービスの料金を請求することで収益を上げることができます。

## リソース
* [Arweaveのクエリガイド](../guides/querying-arweave/queryingArweave.md)
* [ArDBパッケージ](../guides/querying-arweave/ardb.md)
* [ar-gqlパッケージ](../guides/querying-arweave/ar-gql.md)
* [GraphQLリファレンス](../references/gql.md)