# Vouch

## 概要

#### 動機

Vouching は Sybil 耐性に対する分散型のアプローチを提供します。Sybil 攻撃とは、攻撃者が多数の仮名のアイデンティティを作成して不釣り合いに大きな影響力を得ることでネットワークを破壊する行為です。

#### Vouch プロトコル

Arweave は ANS-109 Vouch (Assertion of Identity) の概念を導入しました。これは特定のトランザクション形式といくつかのタグを用いる標準で、permaweb 上の誰でも任意の Arweave アドレスのアイデンティティと人間性を "vouch" できるようにします。

ANS-109 のような標準を permaweb に追加することで、Sybil 攻撃や悪意のあるアクターを最小化し、permaweb ユーザーにとってより安全な体験を提供します。

## ANS-109 トランザクション形式

| タグ名              | _任意?_ | タグ値                                                                                                |
| ------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| App-Name            | False   | `Vouch`                                                                                               |
| Vouch-For           | False   | Arweave `address` that is being vouched for in this transaction                                       |
| App-Version         | True    | `0.1`                                                                                                 |
| Verification-Method | True    | Method of verification of identity for the person. Example - `Twitter`/`In-Person`/`Gmail`/`Facebook` |
| User-Identifier     | True    | An identifier for the user based on the Verification Method. Example - `abhav@arweave.org`            |

## リソース

- [ANS-109 ドキュメント](https://github.com/ArweaveTeam/arweave-standards/blob/ans-109/ans/ANS-109.md)
