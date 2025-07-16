---
locale: ja
---
# ArDrive CLIを使用してアトミックアセットをデプロイおよび登録する

アトミックアセットは、Permawebで取引可能にするために登録する必要があります。`ardrive-cli`のようなサービスを使用してアセットをアップロードし、適切なデータタグを付与した後、このCLIを使用してアセットを登録できます。

## ArDrive-cliと`asset-register` CLIを使用してアトミックアセットを公開するためのガイド

### セットアップ



> Requires NodeJS - https://nodejs.org and jq - https://jqlang.github.io/jq/download/

```
npm i -g ardrive-cli
npm i -g asset-registar
```

### アトミックアセットタグの作成

テキストエディタを使用して、新しいファイル`data.json`を作成し、この新しいファイルに以下を追加します。

```json
{
  "dataGqlTags": {
    "Type": "ASSET_TYPE_HERE",
    "Title": "TITLE_HERE",
    "Description": "DESCRIPTION_HERE",
    "License": "yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8",
    "App-Name": "SmartWeaveContract",
    "App-Version": "0.3.0",
    "Contract-Src": "Of9pi--Gj7hCTawhgxOwbuWnFI1h24TTgO5pw8ENJNQ",
    "Indexed-By": "ucm",
    "Init-State": "{ \"ticker\": \"ATOMIC\", \"name\": \"ASSET_NAME_HERE\", \"balances\": { \"YOUR_WALLET_ADDRESS\": UNITS_HERE }, \"claimable\": [] }"
  }
}
```

タグが初期化されたら、すべての大文字の単語を、アセットに固有の値に置き換える必要があります。

ASSET_TYPE_HERE:

これはアセットの一語の説明で、「image」、「audio」、「video」などです。

TITLE_HERE:

アセットを説明するタイトルで、150文字を超えてはいけません。

DESCRIPTION_HERE:

検索結果やアセットのリスト結果に表示したい説明です。

ASSET_NAME_HERE:

アセットの名前で、一単語またはダッシュでつなげて書きます（例："AA-ALIEN-WITH-BEER"）。

YOUR_WALLET_ADDRESS:

所有権を与えたいウォレットアドレスです。

UNITS_HERE:

このアセットに対して提供したい部分単位の数で、唯一の所有者であれば1に、100人の所有者を望む場合は100に置き換えます。

ファイルを`data.json`として保存します。

### 公開するアセットをこのディレクトリにコピーします。
---

### 新しいArweaveウォレットを使ったアップロード

ウォレットを作成するか、ここにwallet.jsonをコピーしてください。
```sh
ardrive generate-seedphrase
# copy the seed phrase that is in the output and include in the next command where the `...` are.
# generate wallet
ardrive generate-wallet -s "..." > wallet.json
```

Using `ardrive-cli` we are going to create a drive and a folder.

```sh
# create drive and folder
export FOLDER=$(ardrive create-drive -w ./wallet.json -n "My Atomic Assets"  --turbo |  jq -r '.created[] | select(.type == "folder").entityId')
# upload atomic asset
export ASSET=$(ardrive upload-file -w ./wallet.json -F ${FOLDER} --metadata-file ./data.json -l ASSET_FILE_HERE --turbo | jq -r '.created[] | select(.type == "file").dataTxId')
```

> NOTE: if your file is larger than 500k, you will need to add credits to your ardrive wallet, you can do this by going to https://ardrive.io and logging in with your wallet file.


### アセットの登録

アセットがアトミックアセットタグでアップロードされたら、`asset-register <assetId>`と呼び出すだけです。

```sh
asset-registar ${ASSET}
```
### おめでとうございます！

検索バーにcontractIdを入力することで、ar://bazarでアセットを見つけることができるはずです。
