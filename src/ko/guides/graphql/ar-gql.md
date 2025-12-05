# ar-gql

이 패키지는 GraphQL 위에 얇게 얹는 최소한의 레이어로, 쿼리 변수를 사용하는 매개변수화된 쿼리를 지원합니다. 또한 페이징된 결과의 관리를 구현합니다.

## 설치

`ar-gql`을 설치하려면 다음을 실행하세요
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm i ar-gql
```

 </CodeGroupItem>
 <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add ar-gql
```

  </CodeGroupItem>
</CodeGroup>

## 예제

```js:no-line-numbers
import { arGql } from "ar-gql"

const argql = arGql()

(async () => {
	let results = await argql.run(`query( $count: Int ){
    transactions(
      first: $count,
      tags: [
        {
          name: "App-Name",
          values: ["PublicSquare"]
        },
        {
          name: "Content-Type",
          values: ["text/plain"]
        },
      ]
    ) {
      edges {
        node {
          id
          owner {
            address
          }
          data {
            size
          }
          block {
            height
            timestamp
          }
          tags {
            name,
            value
          }
        }
      }
    }
  }`, {count: 1});
  console.log(results);
})();
```

## 리소스

- [ar-gql GitHub 페이지](https://github.com/johnletey/arGql)
