---
locale: id
---

# ArProfile
ArProfile adalah Arweave native DID (Decentralized Identifier).

Protokol akun yang mendasarinya bertujuan untuk memenuhi kebutuhan dasar interaksi sosial antara pengguna: avatar, nama unik, nama, dan bio. Ini juga mencakup kemungkinan untuk menambahkan akun dari jejaring sosial terkenal seperti Twitter, Discord, Github, Instagram, dan Facebook.

## Instalasi
Tambahkan paket menggunakan npm:

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

## Menggunakan ArProfile
```js:no-line-numbers
import Account from 'arweave-account'
const account = new Account(opts);
```

Opsional, Anda dapat meneruskan argumen pilihan ke dalam konstruktor. Berikut adalah pilihan default:

```js:no-line-numbers
const opts = {
  cacheIsActivated: true,
  cacheSize: 100,
  cacheTime: 60
};
```

::: tip
Penyimpanan cache akan menyimpan informasi profil yang relevan di penyimpanan lokal Anda sehingga permintaan masa depan untuk data tersebut dapat dipenuhi lebih cepat. Durasi yang disimpan ditentukan dalam opsi yang diteruskan.
:::

#### Dapatkan Profil berdasarkan Alamat
Untuk mengambil informasi akun menggunakan alamat Arweave, dalam sebuah fungsi async, lewatkan alamat pengguna ke fungsi `get`

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

#### Dapatkan Profil berdasarkan Handle
Satu alamat Arweave dapat terhubung ke beberapa ArProfile. Untuk mengambil informasi akun menggunakan handle ArProfile yang sudah ada, dalam fungsi async, lewatkan handle pengguna ke fungsi `search`

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
  {...}, // profil lainnya
  {...}
]
```

#### Dapatkan Profil berdasarkan Handle Unik
Untuk mengambil informasi akun menggunakan alamat Arweave, dalam fungsi async, lewatkan handle pengguna dan handle unik ke fungsi `search`

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

## Ringkasan
Dengan hanya 3 baris kode yang diperlukan untuk diimplementasikan, ArProfile adalah cara yang langsung untuk menambahkan informasi pengguna Arweave tambahan seperti avatar, bio, dan tautan sosial ke aplikasi Anda.

[ArProfile](https://arprofile.arweave.dev)