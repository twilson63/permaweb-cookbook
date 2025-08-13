---
locale: ja
---
# Execution Machine SDK

JavaScript SDKは、JavaScriptおよびTypeScriptアプリケーションでExecution Machine（EXM）を使用するためのものです。SDKを使用するには、以下のセットアップ手順が必要です。

## インストール

プロジェクトにEXMをインストールするには、`npm`または`yarn`を使用できます。

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

EXMをプロジェクトで使用する場合、パッケージは次のようにインポートする必要があります。

<CodeGroup>
  <CodeGroupItem title="JavaScript">

```js
import { Exm } from '@execution-machine/sdk';
```
  </CodeGroupItem>
</CodeGroup>

## インスタンスの作成

インストールとインポートの後、EXMと対話するにはインスタンスを作成する必要があります。

<CodeGroup>
  <CodeGroupItem title="JavaScript">

```js
const exmInstance = new Exm({ token: 'MY_EXM_TOKEN' });
```
  </CodeGroupItem>
</CodeGroup>

## サマリー

以下のガイドでは、EXM JS SDKを使用してサーバーレス関数をデプロイする方法と、それらとのインタラクション方法を示します。
