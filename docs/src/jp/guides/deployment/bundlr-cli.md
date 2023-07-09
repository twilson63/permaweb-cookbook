---
locale: jp
---
# Bundlr CLI

## 必要条件
デプロイするためには、Arweaveウォレットが必要です。ディレクトリのサイズが100kbを超える場合は、<a href="#fund-bundlr">資金提供されたBundlrインスタンスが必要です</a>。

## インストール

Bundlr CLIをインストールするには、次のコマンドを実行します。
<CodeGroup>
 <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install -g @bundlr-network/client
```
 </CodeGroupItem>
 <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn global add @bundlr-network/client
```
  </CodeGroupItem>
</CodeGroup>


## 静的ビルド
Permawebアプリケーションは静的に生成されます。つまり、コードとコンテンツは事前に生成され、ネットワーク上に保存されます。

以下は静的サイトの例です。Permawebにデプロイするには、`build`ディレクトリを`upload-dir`フラグの引数として渡します。

```js
|- build
    |- index.html
    |- styles.css
    |- index.js
```

## デプロイ

```console
bundlr upload-dir [フォルダのパス] -w [ウォレットのパス] --index-file [index.html] -c [通貨] -h [Bundlrノード]
```

<br/>
<img src="https://arweave.net/XfcrDTZsBn-rNwPuIiftHsLCyYczxgIZeIcr10l1-AM" />

## その他のコマンド

#### Bundlrの資金提供

```console
bundlr fund [金額] -h [Bundlrノード] -w [ウォレットのパス] -c [通貨]
```
<sub style="float:right">\* Bundlrインスタンスへの資金提供は最大30分かかる場合があります</sub>

#### Bundlrの残高を確認する
```console
bundlr balance [ウォレットのアドレス] -h [Bundlrノード] -c arweave
```