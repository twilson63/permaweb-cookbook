# 创建钱包

用户在决定如何与 Arweave 互动之前，应先进行适当的尽职调查与研究。

用户可以通过像 [Wander](https://wander.app) 或 [Beacon](https://beaconwallet.app) 这类钱包，在不需要技术知识的情况下创建 Arweave 和 AO 钱包。

Arweave 钱包也可以以程序方式生成，使用像 `arweave-js` 的库或像 `ardrive-cli` 的 CLI 工具。

## 使用 arweave-js 创建钱包

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

## 从命令行创建钱包

如果你偏好通过命令行应用创建 Arweave 钱包，可以使用 [ArDrive CLI](https://github.com/ardriveapp/ardrive-cli)。

```sh
npm install -g ardrive-cli
```

你可以使用指令 `generate-seedphrase` 来产生助记词：

```sh
# Generate seed-phrase
ardrive generate-seedphrase
"this is an example twelve word seed phrase that you could use"
```

或者，你可以使用 `generate-wallet` 来生成钱包文件：

```sh
# Generate a wallet and store it in a chosen output file
ardrive generate-wallet > /path/to/wallet/file.json
```
