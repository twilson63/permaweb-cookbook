# 트랜잭션에 대한 완전한 GraphQL 구조

다음 GraphQL 쿼리는 인덱싱 서비스가 캡처한 트랜잭션의 모든 속성을 반환합니다.

```graphql:no-line-numbers
query {
    transactions {

        pageInfo {
          hasNextPage
        }
        edges {
            cursor
            node {
                id
                anchor
                signature
                recipient
                owner {
                    address
                    key
                }
                fee {
                    winston
                    ar
                }
                quantity {
                    winston
                    ar
                }
                data {
                    size
                    type
                }
                tags {
                    name
                    value
                }
                block {
                    id
                    timestamp
                    height
                    previous
                }
                parent {
                    id
                }
            }
        }
    }
}

```

## 페이징

기본적으로 GraphQL 쿼리는 처음 10개의 결과를 반환합니다. 더 큰 결과 집합은 transactions 쿼리에 `first: X` 옵션을 추가하여 요청할 수 있습니다(`X`는 1에서 100 사이의 값입니다).

```graphql{4}
query
{
  transactions(
    first:100,
    tags: [
      {
        name: "App-Name",
        values: ["PublicSquare"]
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
}

```

결과 집합에 100개 이상의 항목이 있는 경우, 이후 페이지의 결과는 `cursor`를 사용하여 검색할 수 있습니다.

```graphql{13-15,17}
query
{
  transactions(
    first:100,
    tags: [
      {
        name: "App-Name",
        values: ["PublicSquare"]
      }
    ]
  )
  {
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
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

후속 결과 페이지가 있는 경우 `hasNextPage`는 `true` 값을 가집니다. 결과 집합의 마지막 항목에서 `cursor` 값을 가져와 쿼리의 `after` 매개변수 값으로 사용하세요.

```graphql{5}
query
{
  transactions(
    first:100,
    after: "WyIyMDIyLTEyLTMwVDE2OjQ0OjIzLjc0OVoiLDEwMF0=",
    tags: [
      {
        name: "App-Name",
        values: ["PublicSquare"]
      }
    ]
  )
  {
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
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

전체 결과 집합을 가져오려면 각 페이지의 마지막 항목에서 가져온 업데이트된 `cursor` 값으로 `after` 쿼리를 반복하여 `hasNextPage`가 `false`가 될 때까지 반복하세요.

## 속도 제한 (Rate Limiting)

인덱싱 서비스는 공격 및 서비스 남용을 방지하기 위해 속도 제한을 구현합니다. `arweave.net/graphql` 서비스는 GraphQL 쿼리를 5분당 600회(IP 주소당)로 제한합니다. 응답을 파싱하기 전에 쿼리 결과의 상태 코드가 200대인지 항상 확인하세요. HTTP 상태 코드 429는 속도 제한이 적용되고 있음을 나타냅니다. HTTP 상태 코드 503은 일반적으로 쿼리 결과 집합이 `arweave.net/graphql`에 대해 너무 큼을 나타냅니다.

## 리소스

- Arweave GraphQL 스키마의 더 완전한 목록은 [Arweave GraphQL 가이드](https://gql-guide.arweave.net)를 참조하세요
- [ArDB 패키지](../guides/querying-arweave/ardb.md)
- [ar-gql 패키지](../guides/querying-arweave/ar-gql.md)
- GraphQL에 대한 일반 안내는 [graphql.org/learn](https://graphql.org/learn)이 좋은 출발점입니다
