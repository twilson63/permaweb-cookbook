# GraphQL クエリ

GraphQL は、トランザクションやブロックのメタデータ（トランザクション ID、タグなど）を検索する必要がある場合に特に有用です。

トランザクションに関連付けられた実際のデータにアクセスする必要がある場合は、HTTP API やその他の関連する API/SDK を使用してください。

## 概要

時間の経過とともに、GraphQL インターフェースを実装するインデックスサービスは、Arweave 上のトランザクションデータをクエリするための主流の手法になりました。インデックスサービスは、ネットワークに追加されるトランザクションおよびブロックのヘッダーを（通常はサービスが運用するフル Arweave ノードから）読み取り、そのヘッダー情報をデータベースに挿入してインデックス化および効率的なクエリが可能にします。インデックスサービスはこのデータベースを利用して、クライアントがクエリを実行できる GraphQL エンドポイントを提供します。

GraphQL には、クエリデータセットの取得に適したいくつかの利点があります。これにより、インデックスサービスはあらゆる種類のデータをクエリできる単一のエンドポイントを作成できます。サービスは各リソースごとに HTTP リクエストを行う（REST API のように）代わりに、単一のリクエストで複数のリソースを返すことができます。GraphQL を使用すると、クライアントは複数のリクエストを単一の往復でバッチ処理でき、必要なデータを正確に指定できるため、パフォーマンスが向上します。

## 基本的なクエリ例

次の GraphQL 例は、ある所有者のウォレットアドレスから、"Type" タグの値が "manifest" であるすべてのトランザクション ID をクエリします。タグの詳細については、[トランザクションタグ](../transactions/tags.md) のガイドを参照してください。

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

## 公開インデックスサービス

[https://arweave.net/graphql](https://arweave.net/graphql)

[https://arweave-search.goldsky.com/graphql](https://arweave-search.goldsky.com/graphql)

## リソース

- [Arweave のクエリガイド](../../guides/graphql/index.md)
- [ar-gql パッケージ](../../guides/graphql/ar-gql.md)
