---
locale: ja
---
# 概要

---
> **⚠️ 廃止通知**
>
> この文書は廃止されており、古い情報が含まれている可能性があります。

利益共有トークン（PST）は、次の構造を含むスマートウィーブトークンの一種です。

| プロパティ    | 型        |
| ----------- | ----------- |
| balances    | オブジェクト      |
| name        | 文字列      |
| ticker      | 文字列      |
| transfer    | メソッド      |
| balance     | メソッド      |

PSTは通常、プロトコルや「利益共有コミュニティ」（PSC）を管理するために使用されます。これはDAOに似ています。

### PSTはどのように配布されますか？

---

アプリケーションの創設者は、一定数のPSTを作成し、彼らの判断で配布できます。資本を調達するために保持したり、投資家に販売したりすることができます。

プロトコルは、成長を促進するために、作業を貢献したり、コミュニティのタスクを完了したりする報酬としてPSTを提供できます。

PSTは[Permaswap](https://permaswap.network/#/)（現在テストネット中）でお互いに交換することもでき、開発者は[Verto Flex](https://github.com/useverto/flex)を使用してトークン取引の権限を設定できます。

### 特徴

---

PSTは「**マイクロ配当**」として機能します。プロトコルが使用されると、チッピング額が保持者に配分されるために取っておかれます。このチップは$ARで支払われ、PSTの通貨ではありません。これにより、開発中のアプリとArweave自体との間に特別な関係が生まれます。

### 利点

---

- 開発者がプロトコルを運営し、所有権を柔軟に分配する方法を提供します
- PSTはプロトコルの作業やコミュニティのタスクの支払いに使用できます
- 創設者はネットワークの使用を増やすインセンティブがあり、収益に直接結びついています
- 保持者は**内在的**価値（報酬$AR、より多くの「株式」ではなく）を得ます

### 例 PST: ARDRIVEトークン

---

ArDriveは、適切に名付けられたPST、ARDRIVEを利用したパーマウェブアプリケーションです。

誰かがArDriveを通じてデータをアップロードするために$ARを支払うと、15％のコミュニティ手数料がランダムな重み付け方式で単一のトークン保持者に配分されます。

![ArDrive PSTサイクル](~@source/images/ardrive-pst.png)

ユーザーがデータをアップロード -> ARDRIVEトークン保持者が$ARを受け取る -> ARDRIVEトークン保持者はこの$ARを使用してファイルをアップロード -> サイクルが繰り返される。このようにして、あなた自身のPSTを実装する方法を理解してもらえればと思います。

### PSTを探求する

---

ViewblockやSonar by Redstoneを使用してPSTを表示するのが最も適切です。PSTを特に表示するリンクを使用して、誰かが見つける手間を省いてください。

[PST契約](https://viewblock.io/arweave)を表示するために、Etherscanのような体験を得るためにViewBlockを使用できます。こちらの[例](https://viewblock.io/arweave/contract/-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ)を見てください。

もう一つのオプションは、[RedStone Finance](https://sonar.redstone.tools/#/app/contracts)によって構築されたArweaveスマートコントラクトエクスプローラーであるSonarです。こちらの[例](https://sonar.warp.cc/?#/app/contract/-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ)をご覧ください。

> 一部のコミュニティメンバーは、PSTを「パーマウェブサービストークン」と呼ぶことを議論しています。PSTに関してはまだ多くの探索が必要です → [ここで議論に参加してください](https://discord.com/channels/999377270701564065/999377270701564068/1055569446481178734)（Discord）。