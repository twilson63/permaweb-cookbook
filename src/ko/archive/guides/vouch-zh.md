---
locale: ko
---

# Vouch

Arweave 주소가 특정 서비스에 의해 인증되었는지 확인하는 방법은 여러 가지가 있습니다. 아래에는 그중 두 가지 방법을 설명합니다.

## VouchDAO 패키지

`isVouched` 함수는 애플리케이션에서 바로 사용할 수 있습니다。

#### 설치

npm으로 패키지 추가:

```console:no-line-numbers
npm i vouchdao
```

또는 yarn 사용:

```console:no-line-numbers
yarn add vouchdao
```

#### 사용

비동기 함수 내에서 `isVouched` 함수를 사용하면, 사용자가 이미 인증된 경우 true를 반환합니다。

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ARWEAVE_ADDRESS") // true || undefined
  // ...
})();
```

## GraphQL 사용

GraphQL을 사용해 Arweave 네트워크를 쿼리하여 특정 Arweave 주소가 인증되었는지 확인할 수 있습니다。

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

주소가 인증된 경우 ANS-109을 게시한 서비스와 관련된 노드 태그가 반환됩니다. "owner address" 값은 VouchDAO의 커뮤니티 투표([커뮤니티 투표](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes))와 교차 참조하여 해당 서비스가 커뮤니티 투표를 통해 검증되었는지 확인할 수 있습니다。

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

## 리소스

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 계약](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
- [Arweave/GraphQL 플레이그라운드](https://arweave.net/graphql)
