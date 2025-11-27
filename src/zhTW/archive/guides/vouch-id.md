---
locale: zh-TW
---

# Vouch

有幾種方法可以查詢 Arweave 位址，以驗證該位址是否已獲得特定服務的背書（vouch）。以下為兩種方法。

## VouchDAO 套件

函式 `isVouched` 可在您的應用程式中簡單使用。

#### 安裝

使用 npm 新增此套件：

```console:no-line-numbers
npm i vouchdao
```

或使用 yarn：

```console:no-line-numbers
yarn add vouchdao
```

#### 用法

在 async 函式中，您可以使用 `isVouched`，若使用者已獲得背書，該函式會回傳 `true`。

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ALAMAT_ARWEAVE") // true || undefined
  // ...
})();
```

## 使用 GraphQL

您可以使用 GraphQL 對 Arweave 網路進行查詢，以確認某個 Arweave 地址是否已獲得背書。

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

如果該地址已獲得背書，會回傳包含與發佈 ANS-109 的服務相關標籤之節點陣列。您可以檢查與 [社群投票](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes) 有關的 `擁有者地址`，以確定該服務是否已透過 VouchDAO 的社群投票完成驗證。

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

## 資源

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 合約](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
- [Arweave/GraphQL Playground](https://arweave.net/graphql)
