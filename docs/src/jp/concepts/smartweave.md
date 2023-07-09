---
locale: jp
---
# SmartWeave（スマートウィーブ）

## SmartWeaveとは何ですか？

SmartWeaveは、Arweave上の主要なスマートコントラクトのパラダイムに与えられた名前です。SmartWeaveコントラクトのユニークな特性として、「遅延評価」というプロセスによって、コントラクトの現在の状態が提供されます。これは、Arweaveのマイニングノードがすべてのコントラクトの現在の状態を常に評価するのではなく、コントラクトを読むクライアントが状態を評価することを意味します。

## SmartWeaveはなぜ重要ですか？

分散型アプリケーションの状態とロジックは、そのデータの他の部分と同じく検閲耐性、永続性、検証可能性を持つ必要があります。SmartWeaveは、開発者がスマートコントラクトを記述し、そのアプリの状態とロジックをチェーン上でカプセル化し、信頼のおける検証可能な方法で実行することを可能にします。Arweaveプロトコルでは、ネットワークのためにスマートコントラクトの状態を評価するためのインセンティブが含まれていないため、これは小さな偉業です。

SmartWeaveは、コントラクトのやり取りのための不変の追加パターンを提供し、永続的なストレージを利用して状態を保持します。その結果、権限のない信頼のおける方法で、プロトコルとアプリケーションに動的な機能を提供する完全に分散型のオンチェーン状態機械が実現されます。SmartWeaveを使用することで、Arweaveに格納され、時間の経過とともに変更されないことが保証されたスマートコントラクトを作成できます。これにより、権限のない信頼のおける方法で[Permawebアプリケーション](/concepts/permawebApplications.md)を構築することができます。

開発者がPermawebアプリケーションのロジックを実装するためにSmartWeaveを使用する理由はいくつかあります：

- **分散型ストレージ**： SmartWeaveはArweave上に構築されているため、SmartWeaveを使用して作成されたアプリケーションは、集中型サーバーではなく分散ノードのネットワークに保存されます。これにより、検閲、改ざん、およびその他の干渉からより耐性を持つことができます。

- **遅延評価**： SmartWeaveコントラクトの遅延評価機能により、効率的かつスケーラブルな実行が可能です。Arweaveノードがコントラクトの状態を常に評価するのではなく、コントラクトを読むクライアントが状態を評価するため、ユーザーの処理能力を利用できます。

- **言語サポート**： SmartWeaveはJavaScript、TypeScript、Rust、Go、AssemblyScript、およびWASM（WebAssembly）など、さまざまなプログラミング言語をサポートしています。これにより、開発者はSmartWeaveアプリケーションを作成する際に最も馴染みのある言語を使用できます。

- **データの耐久性**： Arweaveは、データを非常に耐久性の高い形式で保存するように設計されています。これは、歴史的な記録や科学データなど、長期間にわたってデータを保存する必要があるアプリケーションに役立ちます。

- **経済モデル**： Arweaveは、データを無期限に保存するという概念に基づいた独自の経済モデルを使用しています。これにより、SmartWeaveを使用して作成されたPermawebアプリケーションの長期的な利用可能性と耐久性が確保されます。

## SmartWeaveはどのように動作しますか？

SmartWeaveコントラクトは、初期のコントラクトの状態から、トランザクションのタグを使用して編集、追加、削除を行い、構築されます。

`Warp`（以前の`RedStone`）などのSmartWeave SDKを使用して、これらのトランザクションをクエリしてローカルでコントラクトの状態を構築し、各トランザクションでコントラクトの状態を変更します。タグを使用してトランザクションをクエリするEvaluator（`Warp`）は、App-NameタグとContractタグによってトランザクションがコントラクトの一部であると判断します。

以下は、コントラクトの**インタラクション**の例です。
- `App-Name`はSmartWeave **ACTION**であることを示しています。
- `Contract`タグは初期コントラクト状態の特定のトランザクションIDを示しています。
- `Input`タグはコントラクトに実行する関数と他のデータを与えます。

```json
[
    {
        "name":"App-Name",
        "value":"SmartWeaveAction"
    },
    {
        "name":"App-Version",
        "value":"0.3.0"
    },
    {
        "name":"Contract",
        "value":"pyM5amizQRN2VlcVBVaC7QzlguUB0p3O3xx9JmbNW48"
    },
    {
        "name":"Input",
        "value":"{
            \"function\":\"setRecord\",
            \"subDomain\":\"@\",
            \"transactionId\":\"lfaFgcoBT8auBrFJepLV1hyiUjtlKwVwn5MTjPnTDcs\"
        }"
    }
]
```
そして、次に示すのは、**コントラクト**の例です。
- `App-Name`はSmartWeave **CONTRACT**であることを示しています。
- `Contract-Src`タグはコントラクトのソースコードを指し示しています。

```json
[
    {
        "key":"App-Name",
        "value":"SmartWeaveContract"
    },
    {
        "key":"App-Version",
        "value":"0.3.0"
    },
    {
        "key":"Contract-Src",
        "value":"JIIB01pRbNK2-UyNxwQK-6eknrjENMTpTvQmB8ZDzQg"
    },
    {
        "key":"SDK",
        "value":"RedStone"
    },
    {
        "key":"Content-Type",
        "value":"application/json"
    }
]
```

結果として得られる状態は、現在のコントラクトの状態であり、クライアント側のSDKはこれを使用してユーザーの残高、コントラクト所有者、およびその他のコントラクト固有の詳細を計算することができます。発信者が確認済みのコントラクト状態を持っている場合、チェーンにデプロイするためにユーザーが相互作用を構築し、[Gateway](/concepts/gateways.md)でマイニングまたはインデックス化され、次回コントラクト状態が構築されたときに含まれます。

## SmartWeaveエコシステムプロジェクト

SmartWeave SmartContractsを活用しているエコシステムプロジェクトは多数ありますが、以下はいくつかの注目すべきものです：

### 実装
- [Warp](https://warp.cc/) | SmartWeave SDKの主要な提供元であり、チュートリアルを提供し、SmartWeaveプロトコルのメンテナンスを支援しています。
- [EXM](https://docs.exm.dev/) | 実行エンジン（EXM）は、分散環境内で高可用性かつ高パフォーマンスなアプリケーションの作成と使用を可能にする開発者プラットフォームです。

### ツール
- [SonAr](https://sonar.warp.cc/#/app/contracts)| SmartWeaveコントラクトエクスプローラーであり、Warpによって作成およびホストされています。

### アプリ
- [Permapages](https://permapages.app/) | 永続的なウェブページ作成ツール、ArNS購入ポータル、およびANT作成ポータルです。Permaweb上のあなたのプロフィールです。
- [ArNS](arns.md) | Arweave Name System <!-- // todo: update to arns portal when portal is released -->
- [WeaveDB](https://weavedb.dev/) | スマートコントラクトとしてのNoSQLデータベース。
- [KwilDB](https://docs.kwil.com/) | スマートコントラクトとしてのSQLデータベース。
- [ArDrive Inferno](https://ardrive.io/inferno/) | Ardriveを介してアップロードするためのPSTを取得します。