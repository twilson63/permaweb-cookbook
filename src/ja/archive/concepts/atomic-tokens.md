# アトミックトークンの概念と原則

![https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A](https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A)

アトミックトークンは、データと Permaweb 上の SmartWeave コントラクトを参照する単一の永続識別子です。

## 仕様

データ MUST be stored on the Arweave ネットワーク and referencable by a Transaction Identifier

コントラクト MUST implement a `balances` object that represents the ownership of the アトミックトークン

コントラクト MUST implement a `transfer` function that takes the following arguments:

- target {WalletAddress or Contract}
- qty {Number}

> transfer 関数は、呼び出し元から target へ所有権を移転するべきです。

## オプション

_これらは、アトミックトークンを Permaweb 上で発見可能かつ取引可能にする実装オプションです_

[Verto Flex](https://github.com/useverto/flex) - Flex ライブラリを使用すると、取引所を信用することなくアトミックトークンを売買できます。

[Discoverability Tags - ANS 110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) - これらの追加タグは Permaweb のアプリケーションやサービスがあなたのトークンを検出するのに役立ちます。

[ガイドを確認する](../guides/atomic-tokens/intro.md)
