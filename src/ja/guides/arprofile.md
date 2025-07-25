---
locale: ja
---
# ArProfile

[ArProfile](https://arprofile.arweave.net) は、オープンデータプロトコル [`Account`](https://docs.arprofile.org/#/?id=data-protocol) に依存する Arweave ネイティブの DID です。

[`arweave-account`](https://www.npmjs.com/package/arweave-account) は、ウェブアプリやバックエンド（nodejs）など、コードベースに ArProfile を簡単に統合するための npm パッケージです。

[完全なドキュメントはこちら](https://docs.arprofile.org)を参照してください。

## 目的

基本的なアカウントプロトコルは、ユーザー間の社会的相互作用に必要な基本的ニーズを満たすことを目的としています：アバター、一意のハンドル、名前、およびプロフィール。さらに、Twitter、Discord、Github、Instagram、Facebook などの著名なソーシャルネットワークからアカウントを追加する機能も含まれています。

## クイックインテグレーション

[permadapp](/concepts/permawebApplications.html) プロフィールビューワーは、tx [`5OHoPfYucLPTgOvJGgnL0Cg0Ktl-ZDaiTjQo_2B3tBg`](https://viewblock.io/arweave/tx/5OHoPfYucLPTgOvJGgnL0Cg0Ktl-ZDaiTjQo_2B3tBg) で入手可能です。

任意の ArProfile を `<iframe>` HTML タグで埋め込むことができます。

簡単にするために、最新の txid に自動的に更新されるように、[ArNS](https://ar.io/arns/) 名 `profile` を使用することをお勧めします。

### 埋め込み可能な URL

- https://profile.arweave.net/`address`/`<wallet_address>`
- https://profile.arweave.net/`handler`/`<name#unique>`

### 例

```html
<iframe
  src="https://profile.arweave.net/address/vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI"
  width="300"
  height="420"
  frameBorder="0">
</iframe>
```

Result:

<iframe
  src="https://4tq6qppwfzylhu4a5perucol2audikwzpzsdnisogqup6ydxwqma.arweave.net/5OHoPfYucLPTgOvJGgnL0Cg0Ktl-ZDaiTjQo_2B3tBg/address/vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI"
  width="300"
  height="420"
  frameBorder="0">
</iframe>

# コードベースへの統合

[`arweave-account`](https://www.npmjs.com/package/arweave-account) は、ウェブアプリやバックエンド（nodejs）など、コードベースに ArProfile を簡単に統合するための npm パッケージです。

## インストール

npm を使用してパッケージを追加します：
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

## Using ArProfile
```js:no-line-numbers
import Account from 'arweave-account'
const account = new Account(opts);
```

Optional argument options can be passed into the constructor. Here is the default options:
```js:no-line-numbers
const opts = {
  cacheIsActivated: true,
  cacheSize: 100,
  cacheTime: 60
};
```

::: tip
キャッシュは、関連するプロフィール情報をローカルストレージに保存するため、将来のデータ要求に対してより迅速に応答できます。保存される期間は、渡されたオプションで指定します。
:::

#### アドレスによるプロフィールの取得
Arweave アドレスを使用してアカウント情報を取得するには、非同期関数内でユーザーアドレスを `get` 関数に渡します。


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

#### ハンドルによるプロフィールの取得
Arweave アドレスは複数の ArProfile にリンクできます。既存の ArProfile ハンドルを使用してアカウント情報を取得するには、非同期関数内でユーザーハンドルを `search` 関数に渡します。

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
  {...}, // more profiles
  {...}
]
```

#### ユニークハンドルによるプロフィールの取得
Arweave アドレスを使用してアカウント情報を取得するには、非同期関数内でユーザーハンドルとユニークハンドルを `search` 関数に渡します。

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
実装に必要なコードはわずか 3 行で、ArProfile はアプリケーションにアバター、バイオ、ソーシャルリンクなどの追加の Arweave ユーザー情報を追加するための簡単な方法です。