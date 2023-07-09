---
locale: jp
---
# arkb

## 必要条件
データトランザクションの費用をカバーするために、`arkb`を使用してデプロイするためにはArweaveウォレットが必要です。

## インストール

`arkb`をインストールするには、次のコマンドを実行します。
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

ファイルのディレクトリやPermawebアプリケーションをアップロードする場合、デフォルトでは`arkb`は各ファイルをL1トランザクションとして個別にデプロイし、トランザクションをBundlrを使用してバンドルするオプションがあります。

## 静的ビルド
Permawebアプリケーションは静的に生成されるため、コードとコンテンツは事前に生成されネットワークに保存されます。

以下は静的サイトの例です。Permawebにデプロイするには、`build`ディレクトリを`deploy`フラグの引数として渡します。

```js
|- build
    |- index.html
    |- styles.css
    |- index.js
```

#### デフォルトのデプロイ

L1トランザクションとしてデプロイする場合、Arweaveネットワークに直接アップロードされるため、確認に時間がかかる場合があります。

```console
arkb deploy [folder] --wallet [path to wallet]
```
<br/>
<img src="https://arweave.net/_itbo7y4H0kDm4mrPViDlc6bt85-0yLU2pO2KoSA0eM" />

#### バンドル化されたデプロイ
Bundlrを使用してデプロイするには、<a href="#fund-bundlr">Bundlrノードに資金を提供</a>する必要があります。

Bundlr node2では、100kb未満のトランザクションは無料です。

`tag-name/tag-value`構文を使用して、デプロイにカスタムの識別タグを追加できます。

```console
arkb deploy [folder] --use-bundler [bundlr node] --wallet [path to wallet] --tag-name [tag name] --tag-value [tag value]
```
<br/>
<img src="https://arweave.net/jXP0mQvLiRaUNYWl1clpB1G2hZeO07i5T5Lzxi3Kesk" />

## その他のコマンド

#### Bundlrに資金を提供

```console
arkb fund-bundler [amount] --use-bundler [bundlr node]
```

<sub style="float:right">\* Bundlrインスタンスへの資金提供は最大30分かかる場合があります</sub>
#### キーファイルの保存

```console
arkb wallet-save [path to wallet]
``` 

キーを保存した後は、--wallet-fileオプションなしでコマンドを実行できます。次のように実行します。

```console
arkb deploy [path to directory]
```

#### ウォレットの残高を確認する
```console
arkb balance
```