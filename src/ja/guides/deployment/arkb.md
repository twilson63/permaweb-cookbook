---
locale: ja
---
# arkb

## 要件

`arkb`を使用してデプロイするには、データトランザクションコストをカバーするためのArweaveウォレットが必要です。

## インストール

`arkb`をインストールするには、以下のコマンドを実行します。
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install -g arkb
```

 </CodeGroupItem>
 <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add ar-gql
```

  </CodeGroupItem>
</CodeGroup>

## デプロイ

ファイルのディレクトリまたはPermawebアプリケーションをアップロードする際、デフォルトで`arkb`は各ファイルをL1トランザクションとして個別にデプロイし、Bundlrを使用してトランザクションをバンドルするオプションがあります。

## 静的ビルド

Permawebアプリケーションは静的に生成されるため、コードとコンテンツは事前に生成され、ネットワークに保存されます。

以下は静的サイトの例です。これをPermawebにデプロイするには、`build`ディレクトリを`deploy`フラグの引数として渡します。

```js
|- build
    |- index.html
    |- styles.css
    |- index.js
```

#### デフォルトデプロイ

L1トランザクションとしてデプロイすると、Arweaveネットワークに直接アップロードされるため、確認に時間がかかる場合があります。

```console
arkb deploy [folder] --wallet [path to wallet]
```

<br/>
<img src="https://arweave.net/_itbo7y4H0kDm4mrPViDlc6bt85-0yLU2pO2KoSA0eM" />

#### バンドルデプロイ

Bundlrを使用してデプロイするには、<a href="#fund-bundlr">Bundlrノードに資金を供給する</a>必要があります。

Bundlrのnode2は、100KB未満のトランザクションを無料で提供します。

デプロイメントにカスタム識別可能なタグを追加するには、`tag-name/tag-value`構文を使用します。

```console
arkb deploy [folder] --use-bundler [bundlr node] --wallet [path to wallet] --tag-name [tag name] --tag-value [tag value]
```

<br/>
<img src="https://arweave.net/jXP0mQvLiRaUNYWl1clpB1G2hZeO07i5T5Lzxi3Kesk" />

## Other Commands

#### Fund Bundlr

```console
arkb fund-bundler [amount] --use-bundler [bundlr node]
```

<sub style="float:right">\* Funding a Bundlr instance can take up to 30 minutes to process</sub>

#### Saving Keyfile

```console
arkb wallet-save [path to wallet]
```

キーを保存した後は、--wallet-file オプションなしでコマンドを実行できるようになります。次のように実行します。

```console
arkb deploy [path to directory]
```

#### Check Wallet Balance

```console
arkb balance
```
