# ウォレットの作成

ユーザーは、Arweave とどのようにやり取りするかを決める前に、十分な調査と検討を行うべきです。

ユーザーは、[Wander](https://wander.app) や [Beacon](https://beaconwallet.app) のようなウォレットを使用することで、技術的な知識がなくても Arweave および AO のウォレットを作成できます。

Arweave のウォレットは、`arweave-js` のようなライブラリや `ardrive-cli` のような CLI ツールを使用してプログラムで生成することもできます。

## arweave-js でウォレットを作成する

```sh
npm install arweave
```

```js
arweave.wallets.generate().then((key) => {
  console.log(key);
  // {
  //     "kty": "RSA",
  //     "n": "3WquzP5IVTIsv3XYJjfw5L-t4X34WoWHwOuxb9V8w...",
  //     "e": ...
});
```

## コマンドラインからウォレットを作成する

コマンドラインアプリケーションで Arweave のウォレットを作成したい場合は、[ArDrive CLI](https://github.com/ardriveapp/ardrive-cli) を使用できます。

```sh
npm install -g ardrive-cli
```

`generate-seedphrase` コマンドでシードフレーズを生成できます：

```sh
# Generate seed-phrase
ardrive generate-seedphrase
"this is an example twelve word seed phrase that you could use"
```

または、`generate-wallet` を使用してウォレットファイルを生成できます：

```sh
# Generate a wallet and store it in a chosen output file
ardrive generate-wallet > /path/to/wallet/file.json
```
