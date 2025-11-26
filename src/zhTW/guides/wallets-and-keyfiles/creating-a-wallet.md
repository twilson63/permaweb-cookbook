# 建立錢包

使用者在決定如何與 Arweave 互動之前，應自行進行盡職調查與研究。

使用者可使用像 [Wander](https://wander.app) 或 [Beacon](https://beaconwallet.app) 之類的錢包，在不需要技術知識的情況下建立 Arweave 與 AO 錢包。

也可以透過程式產生 Arweave 錢包，使用像 `arweave-js` 這類函式庫或像 `ardrive-cli` 的指令列工具。

## 使用 arweave-js 建立錢包

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

## 從指令列建立錢包

如果您想透過指令列應用程式建立 Arweave 錢包，可以使用 [ArDrive CLI](https://github.com/ardriveapp/ardrive-cli)。

```sh
npm install -g ardrive-cli
```

您可以使用指令 `generate-seedphrase` 產生種子詞：

```sh
# Generate seed-phrase
ardrive generate-seedphrase
"this is an example twelve word seed phrase that you could use"
```

或者，您可以使用 `generate-wallet` 產生錢包檔案：

```sh
# Generate a wallet and store it in a chosen output file
ardrive generate-wallet > /path/to/wallet/file.json
```
