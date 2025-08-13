---
locale: ja
---
# SmartWeave

> **⚠️ 廃止のお知らせ**
>
> このドキュメントは廃止されており、古い情報を含んでいる可能性があります。

## SmartWeaveとは？

SmartWeaveは、Arweave上の主要なスマートコントラクトのパラダイムに与えられた名前です。SmartWeaveコントラクトのユニークな特性は、コントラクトの現在の状態が「レイジー評価」によって提供されることです。これは、Arweaveのマイニングノードがすべてのコントラクトの現在の状態を常に評価するのではなく、コントラクトを読むクライアントが自分自身で状態を評価することを意味します。

## SmartWeaveが重要な理由

分散型アプリケーションの状態とロジックは、他のデータと同様に検閲に対する耐性があり、永続的で、検証可能である必要があります。SmartWeaveは、開発者がアプリの状態とロジックをオンチェーンでカプセル化し、信頼できる検証可能な方法で実行するためのスマートコントラクトを書くことを可能にします。これは、Arweaveプロトコルがノードにネットワークのためにスマートコントラクトの状態を評価するインセンティブを含んでいないため、決して簡単なことではありません。

SmartWeaveは、状態を保持するために永続的なストレージを利用するための不変の追加専用パターンを提供します。その結果、許可不要で信頼できる方法でプロトコルやアプリケーションに動的な機能を提供できる完全に分散型のオンチェーン状態マシンが実現します。SmartWeaveを使用することで、開発者はArweaveに保存され、時間とともに変更されないことが保証されたスマートコントラクトを作成できます。これにより、[Permawebアプリケーション](/concepts/permaweb-applications.md)を動的機能を持つ形で構築できるようになります。

開発者が自分のPermawebアプリケーションのロジックを実装するためにSmartWeaveを使用する理由はいくつかあります：

- **分散ストレージ:** SmartWeaveはArweave上に構築されているため、SmartWeaveを使用して作成されたアプリケーションは、中央サーバーではなく、ノードの分散ネットワーク上に保存されます。これにより、検閲や改ざん、その他の干渉に対する耐性が向上します。

- **レイジー評価:** SmartWeaveコントラクトのレイジー評価機能により、効率的でスケーラブルな実行が可能です。Arweaveノードがコントラクトの状態を常に評価するのではなく、コントラクトを読むクライアントがその状態を評価する責任を負うことで、ネットワークノードの処理能力を利用することができます。

- **言語サポート:** SmartWeaveはJavaScript、TypeScript、Rust、Go、AssemblyScript、WASM（WebAssembly）など、さまざまなプログラミング言語をサポートしています。これにより、開発者はSmartWeaveアプリケーションを作成する際に最も馴染みのある言語を使用できます。

- **データの耐久性:** Arweaveはデータを非常に耐久性があり、長期間保存できる方法で保存することを目的としています。これは、歴史的記録や科学データなど、長期間データを保存する必要があるアプリケーションに便利です。

- **経済モデル:** Arweaveは、永久保存の概念に基づくユニークな経済モデルを使用しており、データを無期限に保存するためにマイナーにインセンティブを与えます。これにより、SmartWeaveを使用して作成されたPermawebアプリケーションの長期的な実現可能性と耐久性が保証されます。

## SmartWeaveの仕組み

SmartWeaveコントラクトは、コントラクトの初期状態から構築され、トランザクションタグを使用して編集、追加、削除されます。

`Warp`（以前の`RedStone`）のようなSmartWeave SDKは、これらのトランザクションをクエリしてコントラクトの状態をローカルに構築し、各トランザクションでコントラクトの状態を変更します。Evaluator（`Warp`）は、タグを使用してコントラクトのトランザクションをクエリします。トランザクションがコントラクトの一部であることは、App-NameタグとContractタグによって判断されます。

以下はコントラクトの**相互作用**の例です。
- `App-Name`は、それがSmartweaveの**アクション**であることを示します。
- `Contract`タグは初期コントラクト状態の特定のトランザクションIDを示します。
- `Input`タグは、コントラクトに実行すべき関数と必要な他のデータを提供します：

```json
[
    {
        name:"App-Name"
        value:"SmartWeaveAction"
    },
    {
        name:"App-Version"
        value:"0.3.0"
    },
    {
        name:"Contract"
        value:"pyM5amizQRN2VlcVBVaC7QzlguUB0p3O3xx9JmbNW48"
    },
    {
        name:"Input"
        value:"{
            "function":"setRecord",
            "subDomain":"@",
            "transactionId":"lfaFgcoBT8auBrFJepLV1hyiUjtlKwVwn5MTjPnTDcs"
        }"
    }
]
```
以下は**コントラクト**の例です。
- `App-Name`は、それがSmartweaveの**コントラクト**であることを示します。
- `Contract-Src`タグはコントラクトのソースコードを指します：

```json
[
    {
        key:"App-Name"
        value:"SmartWeaveContract"
    },
    {
        key:"App-Version"
        value:"0.3.0"
    },
    {
        key:"Contract-Src"
        value:"JIIB01pRbNK2-UyNxwQK-6eknrjENMTpTvQmB8ZDzQg"
    },
    {
        key:"SDK"
        value:"RedStone"
    },
    {
        key:"Content-Type"
        value:"application/json"
    }
]
```

結果として得られる状態は、クライアント側のSDKがユーザーの残高、コントラクト所有者、およびその他のコントラクト特有の詳細を計算するために使用できる現在のコントラクト状態です。呼び出し元が検証済みのコントラクト状態を取得すると、ブロックチェーンにデプロイするためのユーザーの相互作用を構築できます。この相互作用は、マイニングまたは[ゲートウェイ](/concepts/gateways.md)でインデックスされると、次回コントラクト状態が構築される際に含まれます。

SmartWeaveプロトコルの包括的な概要、主要な実装であるWarp Contracts、その他については、[Warp Academy](https://academy.warp.cc/)を訪れてください。ステップバイステップのチュートリアルを掘り下げ、先進的な概念を探索し、SmartWeaveがどのようにパーマウェブを強化するかを発見してください。

## SmartWeaveエコシステムプロジェクト

SmartWeaveスマートコントラクトを活用しているエコシステムプロジェクトは多数ありますが、以下にいくつかの注目すべきプロジェクトを示します：

### 実装
- [Warp](https://warp.cc/) | SmartWeave SDK、チュートリアルの主要プロバイダーであり、SmartWeaveプロトコルの維持に協力しています。
- [MEM](https://www.mem.tech/) | 分子実行マシン（MEM）は、分散環境内で高い可用性と高性能なアプリケーションの作成と使用を支える開発者プラットフォームです。

### ツール
- [SonAr](https://sonar.warp.cc/#/app/contracts)| SmartWeaveコントラクトエクスプローラー、Warpによって作成され、ホストされています。

### リソース
- [Warp Academy](https://academy.warp.cc/) | SmartWeaveに関するすべての情報が集まるワンストップショップ

### アプリ
- [Permapages](https://permapages.app/) | 永続的なウェブページ作成ツール、ArNS購入ポータル、ANT作成ポータル。あなたのパーマウェブ上のプロフィール。
- [ArNS](arns.md) | Arweave Name System
- [WeaveDB](https://weavedb.dev/) | スマートコントラクトとしてのNoSQLデータベース。
- [KwilDB](https://docs.kwil.com/)| スマートコントラクトとしてのSQLデータベース。
- [ArDrive Inferno](https://ardrive.io/inferno/) | Ardriveを介してアップロードするためのPSTを取得します。
- [Akord](https://akord.com/) | Arweave上の安全なストレージを提供するプロトコルで、シームレスなUXを実現します。
- [FirstBatch](https://www.firstbatch.xyz/) | FirstBatchは、開発者や企業が個別化されたプライベート
- [Othent](https://othent.io/) | Web3 transactions with existing traditional social logins.
- [BazAR](https://bazar.arweave.net/) | Digital content marketplace with real-world rights.
- [Alex the Archieve](https://alex.arweave.net/) | A decentralized archival platform utilizing Arweave's immutable storage.

and so much more.
