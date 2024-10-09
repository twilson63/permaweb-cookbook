---
locale: ja
---
# Mint your Atomic Assets with Akord

Akord enables the creation of Atomic NFTs compliant with the [Atomic Asset standard](https://atomic-assets.arweave.dev/).

The Atomic Asset can be minted with the option to attach the [Universal Data License](https://arwiki.wiki/#/en/Universal-Data-License-How-to-use-it) (UDL), and can be listed on the [Universal Content Marketplace](https://docs.akord.com/nfts/minting-atomic-nfts/universal-content-marketplace) (UCM).

## with AkordJS

You can mint your Atomic Assets using [AkordJS](https://github.com/Akord-com/akord-js) package.

### Before you get started

> Requires NodeJS - https://nodejs.org

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install @akord/akord-js
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add @akord/akord-js
```

  </CodeGroupItem>
</CodeGroup>

### Defining NFT metadata
You can define following fields for your NFT
| Name | Description | Optional
| ---- | ----------- | --------
| owner | the address of the asset owner | false
| name | the name of the asset (max 150 characters) | false
| description | a description of the asset (max 300 characters) | false
| types | the types of the asset, ex: "image", "video" | false
| topics | the topics or categories associated with the assets, ex: "nature", "music" | true
| creator | the address of the asset creator, if not provided, defaults to the asset owner | true
| thumbnail | a thumbnail image associated with the asset | true
| contractTxId | contract source transaction id, if not provided, defaults to "Of9pi--Gj7hCTawhgxOwbuWnFI1h24TTgO5pw8ENJNQ" | true
| ticker | the symbol of the token, if not provided, defaults to "ATOMIC" | true


### Minting flow example

```js
import { Akord, Auth } from '@akord/akord-js'

// First, let's initialize Akord instance
// In order to mint Atomic NFTs with AkordJS, you first need an Akord account. 
// Sign up for Akord here: https://v2.akord.com/signup
const { wallet } = await Auth.signIn(email, password);
const akord = await Akord.init(wallet);

// Now, let's define our NFT metadata
const metadata = {
  name: "Golden Orchid - Flora Fantasy #1",
  owner: "zpCttRSE4zoDmmqu37PwGkwoMI89JsoY9mZx4IfzVb8",
  creator: "oB8a20xgJy9ytEPkrFeIkQ9_6nWuoaNbsQYtaCVkNIY",
  description: "A rare digital representation of the mythical Golden Orchid",
  types: ["image"],
  topics: ["floral", "nature"]
};

// Let's create a public vault to contain our NFTs
const { vaultId } = await akord.vault.create("My NFTs", { public: true });

// Finally, let's mint the NFT by passing the path to the asset data, NFT metadata
const { uri } = await akord.nft.mint(vaultId, "./my-nft.jpeg", metadata);
```

### Congrats!

Once the transaction is accepted on Arweave network (it takes 5-15 minutes on average), \
it will get automatically registered on [Warp](https://sonar.warp.cc/) and you can access your NFT on ViewBlock by visiting the following URL:
https://viewblock.io/arweave/tx/{uri}

## with Akord web app

Alternatively, you can find a complete user-friendly guide that walk you through the creation of atomic assets from within a web application. \
[Go to the minting guide here.](https://docs.akord.com/nfts/minting-atomic-nfts) \
And the best part is, no coding is involved!

## Summary

In this guide, we demonstrated how to mint a single NFT with AkordJS, but the SDK doesn't stop there. \
To delve deeper, check out these AkordJS modules:
- [NFT](https://github.com/Akord-com/akord-js?tab=readme-ov-file#nft) - learn how to mint NFTs with the UDL attached and list them on UCM
- [Collection](https://github.com/Akord-com/akord-js?tab=readme-ov-file#collection) - learn how to mint a collection of Atomic NFTs