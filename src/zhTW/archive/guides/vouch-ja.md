---
locale: zh-TW
---

# Vouch

有幾種方法可以查詢 Arweave 位址，以驗證該位址是否已被某個服務背書。以下列出兩種做法。

## VouchDAO 套件

`isVouched` 函式可供在您的應用程式中以簡單直觀的方式使用。

#### 安裝

加入此套件：
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

#### 用法

在一個 async 函式中，您可以使用 `isVouched` 函式；若使用者已被背書，該函式會回傳 true。

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ARWEAVE_ADDRESS") // true || undefined
  // ...
})();
```

## 使用 GraphQL

您可以使用 GraphQL 查詢 Arweave 網路，以判斷特定 Arweave 位址是否已被背書。

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

若該位址已被背書，會回傳一個節點陣列，節點中包含與發行 ANS-109 的服務相關的 tags。您可以將 `owner address` 的值與所通過的社群投票交叉比對，以確認該服務是否已透過 VouchDAO 的社群投票獲得驗證。

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
- [VouchDAO Contract](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
- [Arweave/GraphQL Playground](https://arweave.net/graphql)
