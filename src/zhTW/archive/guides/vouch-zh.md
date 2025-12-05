# Vouch

有幾種查詢 Arweave 位址以驗證其是否已由服務認證的方法。以下是其中兩種做法。

## VouchDAO 套件

`isVouched` 函式可直接在應用程式中使用。

#### 安裝

使用 npm 新增套件：

```console:no-line-numbers
npm i vouchdao
```

或者使用 yarn：

```console:no-line-numbers
yarn add vouchdao
```

#### 使用

在非同步函式中，您可以使用 `isVouched` 函式，如果使用者已獲得認證，它將回傳 true。

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ARWEAVE_ADDRESS") // true || undefined
  // ...
})();
```

## 使用 GraphQL

您可以使用 GraphQL 查詢 Arweave 網路，以瞭解指定的 Arweave 位址是否已獲得認證。

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

如果位址已獲得認證，將回傳一組與發布 ANS-109 的服務相關的節點標籤。您可以將「owner address（擁有者地址）」的值與透過 VouchDAO 的社區投票中的[社區投票](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes)進行交叉比對，以確保該服務已通過社區投票驗證。

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

## 資源

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 合約](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
- [Arweave/GraphQL Playground](https://arweave.net/graphql)
