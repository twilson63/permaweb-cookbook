---
locale: jp
---
# 実行マシン SDK

JavaScript SDK は、JavaScript および TypeScript アプリケーションでの実行マシン（EXM）の使用を可能にします。SDK を使用するには、以下のセットアップ手順が必要です。

## インストール

プロジェクトに EXM をインストールするには、`npm` または `yarn` を使用できます。

<CodeGroup>
  <CodeGroupItem title="npm">

```bash
npm install @execution-machine/sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="yarn">

```bash
yarn add @execution-machine/sdk
```

  </CodeGroupItem>
</CodeGroup>

## インポート

プロジェクトで EXM を使用する場合は、次のようにパッケージをインポートする必要があります。

<CodeGroup>
  <CodeGroupItem title="JavaScript">

```js
import { Exm } from '@execution-machine/sdk';
```
  </CodeGroupItem>
</CodeGroup>

## インスタンスの作成

インストールとインポートの後、EXM との対話を行うためには、インスタンスを作成する必要があります。

<CodeGroup>
  <CodeGroupItem title="JavaScript">

```js
const exmInstance = new Exm({ token: 'MY_EXM_TOKEN' });
```
  </CodeGroupItem>
</CodeGroup>

## 概要

以下のガイドでは、EXM JS SDK を使用してサーバーレス関数をデプロイする方法と、それらとの対話方法について説明します。