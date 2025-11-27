# 建立錢包

使用者在決定如何與 Arweave 互動之前，應先進行適當的盡職調查與研究。

使用者可以透過像 [Wander](https://wander.app) 或 [Beacon](https://beaconwallet.app) 這類錢包，在不需要技術知識的情況下建立 Arweave 和 AO 錢包。

Arweave 錢包也可以以程式方式產生，使用像 `arweave-js` 的函式庫或像 `ardrive-cli` 的 CLI 工具。

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

如果你偏好透過指令列應用程式建立 Arweave 錢包，可以使用 [ArDrive CLI](https://github.com/ardriveapp/ardrive-cli)。

```sh
npm install -g ardrive-cli
```

你可以使用指令 `generate-seedphrase` 來產生助記詞：

```sh
# Generate seed-phrase
ardrive generate-seedphrase
"this is an example twelve word seed phrase that you could use"
```

或者，你可以使用 `generate-wallet` 來產生錢包檔案：

```sh
# Generate a wallet and store it in a chosen output file
ardrive generate-wallet > /path/to/wallet/file.json
```
