---
locale: ja
---
# アトミックトークンの概念と原則

![https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A](https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A)

アトミックトークンは、データおよびパーマウェブ上の SmartWeave コントラクトを参照する単一の永続的な識別子です。

## 仕様

データは必ず arweave ネットワークに保存され、トランザクション識別子で参照可能でなければなりません。

コントラクトは、アトミックトークンの所有権を表す `balances` オブジェクトを実装しなければなりません。

コントラクトは、以下の引数を取る `transfer` 関数を実装しなければなりません：
- target {WalletAddress または Contract}
- qty {Number}

> transfer 関数は、呼び出し元からターゲットへ所有権を移転する必要があります。

## オプション

_これらはアトミックトークンをパーマウェブ上で発見可能かつ取引可能にするための実装オプションです。_

[Verto Flex](https://github.com/useverto/flex) - Flexライブラリを使用することで、アトミックトークンを信頼することなく売買できます。

[発見可能性タグ - ANS 110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) - これらの追加タグは、パーマウェブアプリケーションやサービスがトークンを発見するのに役立ちます。

[ガイドをチェック](../guides/atomic-tokens/intro.md)