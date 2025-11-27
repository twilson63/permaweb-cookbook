---
locale: ko
---

# Vouch

Arweave 주소가 특정 서비스로부터 vouch를 받았는지 확인하기 위해 쿼리할 수 있는 몇 가지 방법이 있습니다. 다음은 그 중 두 가지 방법입니다.

## VouchDAO 패키지

`isVouched` 함수는 애플리케이션에서 간단하게 사용할 수 있습니다.

#### 설치

다음과 같이 npm으로 패키지를 추가하세요:

```console:no-line-numbers
npm i vouchdao
```

또는 yarn:

```console:no-line-numbers
yarn add vouchdao
```

#### 사용법

비동기 함수 내에서 `isVouched` 함수를 사용하면, 사용자가 이미 vouch를 받았으면 `true`를 반환합니다.

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ALAMAT_ARWEAVE") // true || undefined
  // ...
})();
```

## GraphQL 사용

Arweave 네트워크에 대해 GraphQL로 쿼리하여 특정 Arweave 주소가 vouch를 받았는지 확인할 수 있습니다.

```graphql
query {
  transactions(tags: { name: "Vouch-For", values: ["ALAMAT_ARWEAVE"] }) {
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

주소가 이미 vouch를 받았다면, ANS-109를 발행한 서비스와 관련된 태그들을 포함한 노드들의 배열이 반환됩니다. 해당 서비스가 VouchDAO를 통한 커뮤니티 투표로 검증되었는지 확인하려면 관련된 `owner` 주소를 [커뮤니티 투표](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes)에서 확인할 수 있습니다.

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
    "value": "ALAMAT_ARWEAVE"
  }
]
```

## 리소스

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 계약](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
- [Arweave/GraphQL Playground](https://arweave.net/graphql)
