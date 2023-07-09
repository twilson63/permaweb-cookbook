---
locale: jp
---
# ArProfile（アー・プロファイル）
ArProfileは、ArweaveのネイティブなDID（分散識別子）です。

この基盤となるアカウントプロトコルは、ユーザー間のソーシャルインタラクションのための必要な機能を提供します：アバター、ユニークなハンドル、名前、および紹介文です。また、Twitter、Discord、Github、Instagram、Facebookなどのよく知られたソーシャルネットワークのアカウントを追加することも可能です。

## インストール
npmを使用してパッケージを追加します：
<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install arweave-account
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add arweave-account
```

  </CodeGroupItem>
</CodeGroup>

## ArProfileの使用方法
```js:no-line-numbers
import Account from 'arweave-account'
const account = new Account(opts);
```

コンストラクタにオプションを渡すこともできます。以下はデフォルトのオプションです：
```js:no-line-numbers
const opts = {
  cacheIsActivated: true,
  cacheSize: 100,
  cacheTime: 60
};
```

::: tip
キャッシュは、関連するプロフィール情報をローカルストレージに保存するため、将来のデータ取得要求に対して高速に応答することができます。保存される期間は、オプションで指定されます。
:::

#### アドレス別プロフィールの取得
Arweaveのアドレスを使用してアカウント情報を取得するには、非同期関数の内部でユーザーアドレスを`get`関数に渡します。

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
    "bio": "Founder of Metaweave.xyz\nI love dogs",
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

#### ハンドル別プロフィールの取得
Arweaveアドレスは複数のArProfileにリンクされることがあります。既存のArProfileハンドルを使用してアカウント情報を取得するには、非同期関数の内部でユーザーハンドルを`search`関数に渡します。

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
      "bio": "mobile account",
      "email": "",
      "links": {},
      "wallets": {}
    }
  },
  {...}, // 他のプロフィール
  {...}
]
```

#### ユニークハンドル別プロフィールの取得
アドレスとユニークハンドルを`search`関数に渡して、アカウント情報を取得するには、非同期関数の内部でユーザーハンドルとユニークハンドルを`search`関数に渡します。

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
    "bio": "test account by cromatikap\nUPDATE",
    "email": "",
    "links": {
      "github": "cromatikap",
      "twitter": "cromatikap"
    },
    "wallets": {}
  }
}
```

## まとめ
実装に必要なコードはたったの3行であり、ArProfileはアバターや紹介文、ソーシャルリンクなどの追加情報を、簡単にアプリケーションに組み込むための直感的な方法です。

[ArProfile](https://arprofile.arweave.dev)