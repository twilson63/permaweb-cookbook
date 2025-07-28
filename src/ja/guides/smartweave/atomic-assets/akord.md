---
locale: ja
---
# Akordを使ってアトミックアセットをミントする

Akordは、[アトミックアセット標準](https://atomic-assets.arweave.net/)に準拠したアトミックNFTの作成を可能にします。

アトミックアセットは、[ユニバーサルデータライセンス](https://arwiki.wiki/#/en/Universal-Data-License-How-to-use-it) (UDL) を添付するオプションでミントされ、[ユニバーサルコンテンツマーケットプレイス](https://docs.akord.com/nfts/minting-atomic-nfts/universal-content-marketplace) (UCM) にリストすることができます。

## AkordJSを使って

[AkordJS](https://github.com/Akord-com/akord-js)パッケージを使用してアトミックアセットをミントできます。

### 始める前に

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

### NFTメタデータの定義
NFTのために以下のフィールドを定義できます。
| 名前 | 説明 | オプション |
| ---- | ----------- | -------- |
| owner | アセットの所有者のアドレス | false |
| name | アセットの名前 (最大150文字) | false |
| description | アセットの説明 (最大300文字) | false |
| types | アセットの種類、例: "image", "video" | false |
| topics | アセットに関連するトピックやカテゴリー、例: "nature", "music" | true |
| creator | アセットの作成者のアドレス。提供されない場合、所有者がデフォルトになります | true |
| thumbnail | アセットに関連付けられたサムネイル画像 | true |
| contractTxId | コントラクトソーストランザクションID。提供されない場合、デフォルトは "Of9pi--Gj7hCTawhgxOwbuWnFI1h24TTgO5pw8ENJNQ" | true |
| ticker | トークンのシンボル。提供されない場合、デフォルトは "ATOMIC" | true |


### ミントフローの例


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
### おめでとうございます！

トランザクションがArweaveネットワークで受け入れられると（平均で5〜15分かかります）、 \
それは自動的に[Warp](https://sonar.warp.cc/)に登録され、次のURLを訪れることでNFTにアクセスできます：
https://viewblock.io/arweave/tx/{uri}

## Akordウェブアプリを使用して

また、ウェブアプリケーション内からアトミックアセットの作成を段階的に説明する完全なユーザーフレンドリーガイドを見つけることができます。 \
[ミントガイドはこちら](https://docs.akord.com/nfts/minting-atomic-nfts) \
そして、最良の部分は、コーディングが不要であることです！

## まとめ

このガイドでは、AkordJSを使って単一のNFTをミントする方法を示しましたが、SDKはここで終わりません。 \
さらに深く掘り下げるには、次のAkordJSモジュールをチェックしてください：
- [NFT](https://github.com/Akord-com/akord-js?tab=readme-ov-file#nft) - UDLを添付してNFTをミントし、UCMにリストする方法を学ぶ
- [コレクション](https://github.com/Akord-com/akord-js?tab=readme-ov-file#collection) - アトミックNFTのコレクションをミントする方法を学ぶ
