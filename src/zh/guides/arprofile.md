---
locale: zh
---
# ArProfile（Ar个人资料）
ArProfile是Arweave的本地DID（去中心化身份标识）。

底层账户协议旨在满足用户之间社交互动的基本需求：头像、唯一名称、用户名和简介。它还可以添加来自 Twitter、Discord、Github、Instagram 和 Facebook 等知名社交网络的帐户。

## 安装
使用npm添加包：
<CodeGroup>
  <CodeGroupItem title="Npm">

```console
npm install arweave-account
```

  </CodeGroupItem>
  <CodeGroupItem title="Yarn">

```console
yarn add arweave-account
```

  </CodeGroupItem>
</CodeGroup>

## 使用ArProfile
```js:no-line-numbers
import Account from 'arweave-account'
const account = new Account(opts);
```

可以将可选参数选项传递给构造函数。以下是默认选项：
```js:no-line-numbers
const opts = {
  cacheIsActivated: true,
  cacheSize: 100,
  cacheTime: 60
};
```

::: 提示
缓存将在本地存储中存储相关个人资料信息，以便将来对这些数据的请求可以更快地完成。存储的持续时间由传入的选项指定。
:::

#### 通过地址获取个人资料
要使用 Arweave 地址检索账户信息，在异步函数内将用户地址传递给“get”函数

```js:no-line-numbers
await account.get("aIUmY9Iy4qoW3HOikTy6aJww-mM4Y-CUJ7mXoPdzdog")

{
  "txid": "NPJJoq-9EwUeAce_bSbSyqICaGs4_7Hg6VxCyoCY8UQ",
  "addr": "aIUmY9Iy4qoW3HOikTy6aJww-mM4Y-CUJ7mXoPdzdog",
  "handle": "@cromatikap#aIUdog",
  "profile": {
    "handleName": "cromatikap",
    "avatar": "xqjVvn9b8hmtDJhfVw80OZzAsn-ErpWbaFCPZWG5vKI",
    "avatarURL": "https://arweave.net/xqjVvn9b8hmtDJhfVw80OZzAsn-ErpWbaFCPZWG5vKI",
    "banner": "ar://a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k",
    "bannerURL": "https://arweave.net/a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k",
    "name": "Axel",
    "bio": "Metaweave.xyz创始人\n我喜欢狗",
    "email": "",
    "links": {
      "twitter": "cromatikap",
      "github": "cromatikap",
      "instagram": "cromatikap",
      "discord": "cromatikap#6039"
    },
    "wallets": {}
  }
}
```

#### 通过用户名获取个人资料
Arweave地址可以与多个ArProfile关联。要使用现有的ArProfile用户名检索账户信息，在异步函数内将用户用户名传递给“search”函数

```js:no-line-numbers
await account.search("cromatikap")

[
  {
    "txid": "H0qHXb2mC3Y1zRZcSczZ-fp4UytCxSJDhO7j9DP2wQE",
    "addr": "Y4P1UzeAgQNU169vhYo3Cdx4-gevKvaBWCfkoG-ajU8",
    "handle": "@cromatikap#Y4PjU8",
    "profile": {
      "handleName": "cromatikap",
      "avatar": "ar://xpuHFNujK8K6_1SHRn4KPLxkHZKfIryEjXIDYkKwRtE",
      "avatarURL": "https://arweave.net/xpuHFNujK8K6_1SHRn4KPLxkHZKfIryEjXIDYkKwRtE",
      "banner": "ar://a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k",
      "bannerURL": "https://arweave.net/a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k",
      "name": "cromatikap on the go",
      "bio": "移动账户",
      "email": "",
      "links": {},
      "wallets": {}
    }
  },
  {...}, // 更多个人资料
  {...}
]
```

#### 通过唯一用户名获取个人资料
要使用Arweave地址检索账户信息，在异步函数内将用户用户名和唯一用户名传递给“search”函数

```js:no-line-numbers
await account.search("cromatikap#aIUdog")

{
  "txid": "_DGURgOAih5p2vTyaEu9_bBDpZv81rctPO2q9cpOFS0",
  "addr": "HDCwh7xJcIK23vx1blxysTnUpqy1PEzAb5Am84ZdERA",
  "handle": "@cromatikap#HDCERA",
  "profile": {
    "handleName": "cromatikap",
    "avatar": "ar://OrG-ZG2WN3wdcwvpjz1ihPe4MI24QBJUpsJGIdL85wA",
    "avatarURL": "https://arweave.net/OrG-ZG2WN3wdcwvpjz1ihPe4MI24QBJUpsJGIdL85wA",
    "banner": "ar://a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k",
    "bannerURL": "https://arweave.net/a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k",
    "name": "Axel",
    "bio": "cromatikap的测试账户\n更新",
    "email": "",
    "links": {
      "github": "cromatikap",
      "twitter": "cromatikap"
    },
    "wallets": {}
  }
}
```

## 总结
只需3行代码即可实现，ArProfile是一种简单直接的方式，用于向应用程序添加额外的Arweave用户信息，例如头像、简介和社交链接。

[ArProfile](https://arprofile.arweave.dev)