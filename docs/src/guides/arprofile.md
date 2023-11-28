# ArProfile

[ArProfile](https://arprofile.arweave.dev) is an Arweave native DID which relies on the open data protocol [`Account`](https://docs.arprofile.org/#/?id=data-protocol).

[`arweave-account`](https://www.npmjs.com/package/arweave-account) is a npm package that allows you to easily integrate ArProfile in your codebase, wether it is a web app or a backend (nodejs).

[See complete documentation here](https://docs.arprofile.org)

## Purpose

The underlying account protocol aims to satisfy essential needs for social interactions between users: an avatar, a unique handle, a name and a bio. It also includes the possibility to add accounts from the well known social networks such as Twitter, Discord, Github, Instagram and Facebook.

## Quick integration

A [permadapp](/concepts/permawebApplications.html) profile viewer is available at the tx [`5OHoPfYucLPTgOvJGgnL0Cg0Ktl-ZDaiTjQo_2B3tBg`](https://viewblock.io/arweave/tx/5OHoPfYucLPTgOvJGgnL0Cg0Ktl-ZDaiTjQo_2B3tBg)

You can embed any ArProfile with a `<iframe>` html tag.

For simplicity and to update automatically to the lattest txid, we recommend using the [ArNS](https://ar.io/arns/) name `profile`.

### Embeddable URLs

- https://profile.arweave.dev/`address`/`<wallet_address>`
- https://profile.arweave.dev/`handler`/`<name#unique>`

### Example

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

# Integration in your codebase

[`arweave-account`](https://www.npmjs.com/package/arweave-account) is a npm package that allows you to easily integrate ArProfile in your codebase, wether it is a web app or a backend (nodejs).

## Installation

Add the package using npm:
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
Caching will store the relevant profile information in your local storage so that future requests for such data can be fulfilled much faster. The duration that is stored is specified in the options passed in 
:::

#### Get Profile by Address
To retrieve account information using an Arweave address, inside an async function pass the user address to the `get` function

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

#### Get Profile by Handle
An Arweave address can be linked to multiple ArProfile's. To retrieve account information using an existing ArProfile handle, inside an async function pass the user handle to the `search` function

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

#### Get Profile by Unique Handle
To retrieve account information using an Arweave address, inside an async function pass the user handle and unique handle to the `search` function

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

## Summary
With just 3 lines of code needed to implement, ArProfile is a straight-forward way for adding additional Arweave user information such as avatars, bio's and social links to your applications.
