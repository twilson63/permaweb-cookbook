---
locale: zh-TW
---

# Vouch

有幾種方式可以查詢 Arweave 位址，以確認該位址是否已被某項服務背書。以下提供兩種做法。

## VouchDAO 套件

函式 `isVouched` 可用於你的應用程式中，方便地判斷是否已被背書。

#### 安裝

使用 npm 新增此套件：

```console:no-line-numbers
npm i vouchdao
```

或使用 yarn：

```console:no-line-numbers
yarn add vouchdao
```

#### 使用

在非同步函式中可以使用 `isVouched`，若使用者已被背書，會回傳 true。

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("DIRECCIÓN_ARWEAVE") // true || undefined
  // ...
})();
```

## 使用 GraphQL

你可以透過 GraphQL 查詢 Arweave 網路，以判斷特定 Arweave 位址是否已被背書。

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

若該位址已被背書，將會回傳一個包含與發出 ANS-109 服務相關標籤的節點陣列。你可以比對 `owner` 的位址，並與 [社群投票](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes) 交叉驗證，以確認該服務是否已通過 VouchDAO 的社群投票驗證。

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

## 資源

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 合約](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
- [Arweave/GraphQL Playground](https://arweave.net/graphql)
