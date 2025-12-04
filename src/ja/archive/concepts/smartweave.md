# SmartWeave

> **⚠️ 非推奨のお知らせ**
>
> 本ドキュメントは非推奨であり、古い情報が含まれている可能性があります。

## SmartWeave とは？

SmartWeave は Arweave 上で支配的なスマートコントラクトのパラダイムの名称です。SmartWeave コントラクトの独自の特性は、現在のコントラクト状態が「遅延評価（lazy evaluation）」のプロセスによって提供される点にあります。つまり、Arweave のマイニングノードが常に全てのコントラクトの現在状態を評価するのではなく、コントラクトを読み取るクライアントが自分自身で状態を評価するということです。

## SmartWeave が重要な理由

分散型アプリケーションの状態とロジックは、そのデータと同様に検閲耐性、永続性、検証可能性を持つ必要があります。SmartWeave を使うことで、開発者はアプリの状態とロジックをオンチェーンにカプセル化したスマートコントラクトを書き、信頼不要かつ検証可能な方法で実行できます。これは Arweave プロトコル自体にネットワークのためにスマートコントラクト状態を評価するノードへのインセンティブが含まれていないため、小さな成果ではありません。

SmartWeave は、状態を保持するために永続ストレージを活用する追記専用（append-only）の不変パターンを提供します。その結果、プロトコルやアプリケーションに対して、パーミッションレスかつ信頼不要に動的な機能を与える完全に分散化されたオンチェーン状態マシンが実現します。SmartWeave を使用することで、開発者は Arweave 上に格納され、時間の経過とともに変更されないことが保証されるスマートコントラクトを作成できます。これにより、パーミウェブ（Permaweb）上でパーミッションレスかつ信頼不要に利用できる動的機能を持つアプリケーション（[Permaweb アプリケーション](/concepts/permaweb-applications.md)）を構築できます。

開発者がパーミウェブアプリケーションのロジック実装に SmartWeave を選択する理由はいくつかあります。

- **分散型ストレージ（Decentralized storage）:** SmartWeave は Arweave 上に構築されているため、SmartWeave を用いて作成されたアプリケーションは中央集権的なサーバー上ではなく分散ノードのネットワーク上に保存されます。これにより、検閲や改ざん、その他の干渉に対する耐性が高まります。

- **遅延評価（Lazy evaluation）:** SmartWeave コントラクトの遅延評価機能は、効率的でスケーラブルな実行を可能にします。Arweave ノードが常にコントラクトの状態を評価する代わりに、コントラクトを読むクライアントが状態を評価する責任を持ち、ネットワークノードではなくユーザーの処理能力を活用します。

- **言語サポート（Language support）:** SmartWeave は JavaScript、TypeScript、Rust、Go、AssemblyScript、WASM（WebAssembly）などの複数のプログラミング言語をサポートしています。これにより、開発者は最も慣れ親しんだ言語で SmartWeave アプリケーションを作成できます。

- **データ耐久性（Data durability）:** Arweave はデータを長期的かつ高い耐久性で保存するよう設計されています。これは歴史的記録や科学データなど、長期間データを保存する必要があるアプリケーションに有用です。

- **経済モデル（Economic model）:** Arweave は永久ストレージの概念に基づく独自の経済モデルを採用しており、マイナーにデータを永続的に保存するインセンティブを与えます。これにより、SmartWeave を用いて作成されたパーミウェブアプリケーションの長期的な存続性と耐久性が確保されます。

## SmartWeave の仕組み

SmartWeave コントラクトは、本質的に初期のコントラクト状態から構成され、トランザクションタグを使った編集・追加・削除によって状態が変化します。

`Warp`（以前は `RedStone`）などの SmartWeave SDK は、これらのトランザクションをクエリしてクライアント側でコントラクト状態を構築し、各トランザクションごとにコントラクト状態を更新します。Evaluator（`Warp`）はタグを使ってコントラクトのトランザクションをクエリします。トランザクションがコントラクトの一部であることは、App-Name タグと Contract タグによって判別されます。

以下はコントラクトの「interaction（インタラクション）」の例です。

- `App-Name` はそれが SmartWeave の **ACTION** であることを示します。
- `Contract` タグは初期コントラクト状態の特定のトランザクション ID を示します。
- `Input` タグはコントラクトに実行する関数とその他必要なデータを与えます:

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

そしてこちらは**コントラクト**の例です。

- `App-Name` はそれが SmartWeave の **CONTRACT** であることを示します。
- `Contract-Src` タグはコントラクトのソースコードを指します:

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

その結果得られるのが現在のコントラクト状態であり、クライアント側の SDK はこれを用いてユーザーの残高やコントラクトの所有者、その他コントラクト固有の詳細を計算できます。呼び出し元が検証済みのコントラクト状態を持っていれば、ユーザー用のインタラクションを作成してチェーンにデプロイできます。該当トランザクションがマイニングされるか、[ゲートウェイ](/concepts/gateways.md) 上でインデックスされると、誰かが次にコントラクト状態を構築する際にそのトランザクションが含まれます。

SmartWeave プロトコル、その主要実装である Warp Contracts、その他の情報の包括的な概要については [Warp Academy](https://academy.warp.cc/) をご覧ください。ステップバイステップのチュートリアル、上級概念の解説、SmartWeave がいかにしてパーミウェブを強化するかを詳しく学べます。

## SmartWeave エコシステムプロジェクト

SmartWeave SmartContracts を活用するエコシステムプロジェクトは多数ありますが、いくつかの注目点を以下に示します。

### 実装（Implementations）

- [Warp](https://warp.cc/) | SmartWeave SDK、チュートリアルの主要提供者であり、SmartWeave プロトコルの保守にも関与しています。
- [MEM](https://www.mem.tech/) | Molecular Execution Machine (MEM) は、分散環境内で高可用性かつ高性能なアプリケーションの作成と利用を支援する開発者向けプラットフォームです。

### ツール（Tools）

- [SonAr](https://sonar.warp.cc/#/app/contracts) | Warp によって作成・ホストされている SmartWeave コントラクトエクスプローラー。

### リソース（Resources）

- [Warp Academy](https://academy.warp.cc/) | SmartWeave に関するあらゆる情報のワンストップリソース。

### アプリ（Apps）

- [Permapages](https://permapages.app/) | 永続的なウェブページ作成ツール、ArNS 購入ポータル、および ANT 作成ポータル。パーミウェブ上のプロフィール。
- [ArNS](arns.md) | Arweave ネームシステム <!-- // todo: update to arns portal when portal is released -->
- [WeaveDB](https://weavedb.dev/) | スマートコントラクトとしての NoSQL データベース。
- [KwilDB](https://docs.kwil.com/) | スマートコントラクトとしての SQL データベース。
- [ArDrive Inferno](https://ardrive.io/inferno/) | ArDrive を通じてアップロードするための PST を入手。
- [FirstBatch](https://www.firstbatch.xyz/) | 開発者や企業がパーソナライズされた、プライベートで歪みのない AI アプリケーションを作成するのを支援します。
- [Othent](https://othent.io/) | 既存の従来型ソーシャルログインを用いた Web3 トランザクション。
- [BazAR](https://bazar.arweave.net/) | 現実世界の権利を伴うデジタルコンテンツのマーケットプレイス。
- [Alex the Archieve](https://alex.arweave.net/) | Arweave の不変ストレージを活用した分散型アーカイブプラットフォーム。

その他にも多数あります。
