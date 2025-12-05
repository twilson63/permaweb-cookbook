# GraphQL 쿼리

GraphQL은 트랜잭션 ID, 태그 등 트랜잭션이나 블록의 메타데이터를 찾아야 할 때 특히 유용합니다.

트랜잭션에 연결된 실제 데이터에 접근해야 하는 경우에는 HTTP API 또는 기타 관련 API/SDK를 사용하세요.

## 개요

시간이 지나면서 GraphQL 인터페이스를 구현한 인덱싱 서비스는 Arweave에서 트랜잭션 데이터를 쿼리하는 선호되는 방법이 되었습니다. 인덱싱 서비스는 네트워크에 추가되는 대로(보통 서비스가 운영하는 풀 Arweave 노드로부터) 트랜잭션 및 블록 헤더를 읽습니다. 읽은 헤더 정보는 인덱싱 및 효율적인 조회가 가능하도록 데이터베이스에 삽입됩니다. 인덱싱 서비스는 이 데이터베이스를 사용하여 클라이언트가 쿼리할 수 있는 GraphQL 엔드포인트를 제공합니다.

GraphQL은 쿼리 데이터 세트를 검색하는 데 적합한 몇 가지 장점이 있습니다. 인덱싱 서비스는 단일 엔드포인트를 생성하여 모든 유형의 데이터를 쿼리할 수 있게 합니다. 또한 서비스는 각 리소스마다 HTTP 요청을 하는 것(REST API에서와 같이)과 달리 단일 요청으로 여러 리소스를 반환할 수 있습니다. GraphQL을 사용하면 클라이언트가 여러 요청을 단일 왕복으로 배치하고 필요한 데이터를 정확히 지정할 수 있어 성능이 향상됩니다.

## 기본 쿼리 예시

다음 GraphQL 예시는 특정 소유자 지갑 주소의 모든 트랜잭션 ID 중에서 "Type" 태그의 값이 "manifest"인 것들을 쿼리합니다. 태그에 대한 자세한 내용은 [트랜잭션 태그](../transactions/tags.md) 가이드를 참조하세요.

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

## 공용 인덱싱 서비스

[https://arweave.net/graphql](https://arweave.net/graphql)

[https://arweave-search.goldsky.com/graphql](https://arweave-search.goldsky.com/graphql)

## 자료

- [Arweave 쿼리 가이드](../../guides/querying-arweave/querying-arweave.md)
- [ar-gql 패키지](../../guides/querying-arweave/ar-gql.md)
- [GraphQL 참조](../../references/gql.md)
