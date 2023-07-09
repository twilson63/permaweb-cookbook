---
locale: jp
---
# アトミックトークンのコンセプトと原則

![https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A](https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A)

アトミックトークンは、データとSmartWeaveコントラクトの永久的な単一識別子であり、Permaweb上で参照されます。

## 仕様

データはarweaveネットワークに保存され、トランザクション識別子によって参照可能である必要があります。

コントラクトはアトミックトークンの所有権を表す`balances`オブジェクトを実装する必要があります。

コントラクトは、以下の引数を受け取る`transfer`関数を実装する必要があります:
- target {ウォレットアドレスまたはコントラクト}
- qty {数値}

> transfer関数は、所有者から対象への所有権の移転を行う必要があります。

## オプション

_これらはアトミックトークンをPermaweb上で検索可能で取引可能にするための実装オプションです_

[Verto Flex](https://github.com/useverto/flex) - Flexライブラリは、信頼できる取引所を信頼することなく、アトミックトークンを販売または購入できるようにします。

[Discoverability Tags - ANS 110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) - これらの追加のタグは、Permawebアプリケーションやサービスがトークンを発見するのに役立ちます。

[ガイドをご覧ください](../guides/atomic-tokens/intro.md)