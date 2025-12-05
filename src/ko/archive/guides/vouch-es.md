---
locale: ko
---

# Vouch

Arweave 주소가 서비스에 의해 보증(백업)되었는지 확인하는 방법은 여러 가지가 있습니다. 아래에는 이를 확인하는 두 가지 접근법을 제시합니다.

## VouchDAO 패키지

함수 `isVouched`는 애플리케이션에서 간편하게 사용할 수 있도록 제공됩니다.

#### 설치

npm을 사용해 패키지를 추가하세요:

```console:no-line-numbers
npm i vouchdao
```

또는 yarn:

```console:no-line-numbers
yarn add vouchdao
```

#### 사용법

비동기 함수 내부에서 `isVouched` 함수를 사용하면, 사용자가 보증된 경우 true를 반환합니다.

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("DIRECCIÓN_ARWEAVE") // true || undefined
  // ...
})();
```

## GraphQL 사용하기

GraphQL을 사용해 Arweave 네트워크에서 특정 Arweave 주소가 보증되었는지 조회할 수 있습니다.

```graphql
query {
  transactions(tags: { name: "Vouch-For", values: ["DIRECCIÓN_ARWEAVE"] }) {
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

주소가 보증된 경우, ANS-109을 발행하는 서비스와 관련된 태그를 포함한 노드 배열이 반환됩니다. 서비스가 VouchDAO를 통해 커뮤니티 투표로 검증되었는지 확인하려면 `owner`의 주소를 [커뮤니티 투표](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes)와 대조하여 확인하세요.

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
    "value": "DIRECCIÓN_ARWEAVE"
  }
]
```

## 리소스

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 스마트 컨트랙트](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
- [Arweave/GraphQL 플레이그라운드](https://arweave.net/graphql)
