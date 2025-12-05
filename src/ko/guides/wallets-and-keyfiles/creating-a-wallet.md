# 지갑 생성하기

사용자는 Arweave와 상호작용하는 방법을 결정하기 전에 스스로 충분한 조사와 검토를 해야 합니다.

[Wander](https://wander.app) 또는 [Beacon](https://beaconwallet.app) 같은 지갑을 사용하면 기술 지식 없이도 Arweave 및 AO 지갑을 생성할 수 있습니다.

Arweave 지갑은 `arweave-js` 같은 라이브러리나 `ardrive-cli` 같은 CLI 도구를 사용하여 프로그래밍 방식으로 생성할 수도 있습니다.

## arweave-js로 지갑 생성하기

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

## 명령줄에서 지갑 생성하기

명령줄 애플리케이션을 통해 Arweave 지갑을 생성하려면 [ArDrive CLI](https://github.com/ardriveapp/ardrive-cli)를 사용할 수 있습니다.

```sh
npm install -g ardrive-cli
```

다음 명령 `generate-seedphrase`로 시드 문구를 생성할 수 있습니다:

```sh
# Generate seed-phrase
ardrive generate-seedphrase
"this is an example twelve word seed phrase that you could use"
```

또는 `generate-wallet`를 사용하여 지갑 파일을 생성할 수 있습니다:

```sh
# Generate a wallet and store it in a chosen output file
ardrive generate-wallet > /path/to/wallet/file.json
```
