# Vouch

서비스로부터 보증(vouched)되었는지 확인하기 위해 Arweave 주소를 조회하는 방법이 몇 가지 있습니다. 아래는 그중 두 가지 접근 방식입니다.

## VouchDAO 패키지

`isVouched` 함수는 애플리케이션에서 간단하게 사용할 수 있도록 제공됩니다.

#### 설치

패키지를 추가하세요:
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm i vouchdao
```

</CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add vouchdao
```

</CodeGroupItem>
</CodeGroup>

#### 사용법

비동기 함수 내부에서 `isVouched` 함수를 사용하면 해당 사용자가 보증된 경우 true를 반환합니다.

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ARWEAVE_ADDRESS") // true || undefined
  // ...
})();
```

## GraphQL 사용하기

GraphQL을 사용하여 Arweave 네트워크를 조회하면 특정 Arweave 주소가 보증되었는지 확인할 수 있습니다.

```graphql
query {
  transactions(tags: { name: "Vouch-For", values: ["ARWEAVE_ADDRESS"] }) {
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

해당 주소가 보증된 경우, ANS-109를 발행한 서비스에 관한 태그를 포함한 노드 배열이 반환됩니다. `owner address` 값을 전달된 커뮤니티 투표와 교차 확인하여 서비스가 VouchDAO를 통해 커뮤니티 투표로 검증되었는지 확인할 수 있습니다.

```graphql
"owner": {
 "address": "Ax_uXyLQBPZSQ15movzv9-O1mDo30khslqN64qD27Z8"
},
"tags": [
  {
    "name": "Content-Type",
    "value": "application/json"
  },
  {
    "name": "App-Name",
    "value": "Vouch"
  },
  {
    "name": "App-Version",
    "value": "0.1"
  },
  {
    "name": "Verification-Method",
    "value": "Twitter"
  },
  {
    "name": "Vouch-For",
    "value": "ARWEAVE_ADDRESS"
  }
]
```

## 참고 자료

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO Contract](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
- [Arweave/GraphQL Playground](https://arweave.net/graphql)
