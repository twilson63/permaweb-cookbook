# GraphQL로 Arweave 쿼리하기

이 섹션에서는 GraphQL을 사용해 Arweave 데이터를 쿼리할 때 사용할 수 있는 도구와 라이브러리를 다룹니다. GraphQL은 Arweave 네트워크에서 필요한 데이터를 정확히 가져올 수 있는 강력하고 유연한 방법을 제공합니다.

Arweave는 트랜잭션을 쿼리하고 [태그](../fundamentals/transactions/tags.md)로 필터링하는 간단한 방법을 제공합니다.

Arweave의 GraphQL 호환 인덱싱 서비스들은 사용자가 GraphQL 쿼리를 POST할 수 있는 엔드포인트를 제공하며, 쿼리를 시도해볼 수 있는 플레이그라운드도 제공합니다.

[GraphQL](https://graphql.org)은 서비스가 클라이언트가 쿼리할 수 있는 맞춤형 데이터 스키마를 구축하는 데 사용할 수 있는 유연한 쿼리 언어입니다. GraphQL은 또한 클라이언트가 결과에서 보고자 하는 데이터 구조의 요소를 지정할 수 있게 합니다.

## 공개 인덱싱 서비스

- [GraphQL](https://arweave.net/graphql) - 원래의 GraphQL 엔드포인트로, [AR.IO](https://ar.io)에서 관리합니다.
- [Goldsky search service](https://arweave-search.goldsky.com/graphql) - GraphQL 구문의 상위 집합을 사용해 검색에 최적화된 공개 서비스로, [Goldsky](https://goldsky.com)에서 관리합니다.

## GraphQL 쿼리 실행하기

Arweave를 쿼리하려면 GraphQL을 지원하는 인덱싱 서비스를 통해 접근해야 합니다. 시작하려면 위에 나열된 GraphQL 플레이그라운드 중 하나를 사용하세요!

다음 쿼리를 복사하여 붙여넣습니다.

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

GraphQL이 익숙하지 않다면 처음에는 다소 압도적으로 보일 수 있습니다. 하지만 구조를 알게 되면 읽고 이해하기가 상당히 쉽습니다.

```text:no-line-numbers
query { <schema type> ( <filter criteria> ) { <data structure of the results> } }
```

예제 쿼리에서 우리가 넣은 `<schema type>`은 `transactions`이지만 `blocks`를 쿼리할 수도 있습니다.

Arweave의 GraphQL 스키마에 대한 전체 설명은 [Arweave GraphQL Guide](https://gql-guide.arweave.net)에 정리되어 있습니다. 가이드는 `filter criteria`를 “Query Structures”로 지칭하고, `transactions`와 `blocks`의 완전한 데이터 구조 정의를 “Data Structures”로 설명합니다.

`<data structure of the results>`에 관해서는, 관심 있는 전체 데이터 구조의 서브셋을 지정할 수 있다는 점이 핵심입니다. 예를 들어, transactions 스키마의 전체 데이터 구조는 [여기](https://gql-guide.arweave.net/#full-data)에 나와 있습니다.

이 예에서는 필터 조건을 만족하는 트랜잭션에 대해 `id`와 전체 `tags` 목록에 관심이 있습니다.

플레이그라운드 중앙의 큰 "Play" 버튼을 눌러 쿼리를 실행하세요.

![이미지](https://arweave.net/rYfVvFVKLFmmtXmf8KeTvsG8avUXMQ4qOBBTZRHqVU0)

결과 데이터 구조에서 원래 쿼리에서 지정한 구조로 트랜잭션 목록을 되돌려주는 것을 확인할 수 있습니다.

블록체인에 익숙하지 않다면 이 결과가 뜻밖일 수 있습니다. 우리는 아무것도 만들지 않았는데 왜 이런 결과가 존재하나요? 그 이유는 우리가 필터링한 `“PublicSquare”: “App-Name”` 태그가 이미 오랫동안 사용되어 왔기 때문입니다.

Arweave 프로토콜의 창시자 Sam Williams는 몇 년 전에 트랜잭션 포맷을 [github 코드 스니펫](https://gist.github.com/samcamwilliams/811537f0a52b39057af1def9e61756b2)으로 제안했습니다. 그 이후로 생태계의 개발자들은 이를 기반으로 실험하고 해당 태그를 포함한 트랜잭션을 게시해왔습니다.

다시 Arweave 쿼리로 돌아오면, GraphQL 결과에서 읽을 수 있는 게시물 본문은 보이지 않고 태그 및 게시물 관련 메타데이터만 보이는 것을 알 수 있습니다.

이는 GraphQL 인덱싱 서비스가 트랜잭션과 블록의 헤더 데이터 인덱싱 및 검색에 관여하지만, 그에 연관된 본문 데이터까지는 인덱싱하지 않기 때문입니다.

트랜잭션의 데이터를 가져오려면 다른 HTTP 엔드포인트를 사용해 조회해야 합니다.

```text:no-line-numbers
https://arweave.net/<transaction id>
```

쿼리 결과에서 id 중 하나를 복사하여 위 링크에 붙여넣어 `id`를 추가합니다. 다음과 비슷하게 보일 것입니다…

https://arweave.net/eaUAvulzZPrdh6_cHwUYV473OhvCumqT3K7eWI8tArk

브라우저에서 해당 URL로 이동(HTTP GET)하면 트랜잭션 데이터에 저장된 게시물 콘텐츠를 가져오게 됩니다. 이 예에서는 다음과 같습니다…

```text:no-line-numbers
Woah that's pretty cool 😎
```

(Arweave HTTP 엔드포인트의 전체 목록은 [HTTP API](https://docs.arweave.org/developers/server/http-api) 설명서를 참조하세요.)

## JavaScript에서 쿼리 POST하기

JavaScript에서 GraphQL 쿼리를 POST하는 것은 플레이그라운드에서 POST하는 것과 크게 다르지 않습니다.

먼저 GraphQL 엔드포인트에 쉽게 접근하기 위해 `arweave-js` 패키지를 설치합니다.

```console:no-line-numbers
npm install --save arweave
```

그런 다음 위 예제 쿼리의 조금 더 발전된 버전을 입력하고 POST 결과를 `await`합니다.

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

## 다중 쿼리

GraphQL 엔드포인트에 한 번의 요청으로 여러 쿼리를 POST하는 것이 가능합니다. 이 예제는 이제는 사용되지 않지만(대체된 것은 `ar-profile`) 여전히 영구적인 `arweave-id` 프로토콜을 사용하여 두 지갑 주소에 대해 `name` 트랜잭션을 각각 별도의 쿼리로 요청합니다.

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

## 참고 자료

- [Arweave GraphQL Guide and Full Schema](https://gql-guide.arweave.net)
- [ar-gql 패키지](https://github.com/johnletey/arGql)
