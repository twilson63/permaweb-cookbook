# Creating a Wallet

Users should do their due diligence and research before deciding how to interact with Arweave.

Users can create Arweave and AO wallets without requiring any technical knowledge by using wallets like [Wander](https://wander.app) or [Beacon](https://beaconwallet.app). 

Arweave wallets can also be generated programatically, using libraries such as `arweave-js` or CLI tools such as `ardrive-cli`. 

## Creating a wallet with arweave-js

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

## Creating a wallet from the command line

If you would prefer to create an Arweave wallet through a command-line application, you can use the [ArDrive CLI](https://github.com/ardriveapp/ardrive-cli).

```sh
npm install -g ardrive-cli
```

You can generate a seed phrase with the command `generate-seedphrase`:

```sh
# Generate seed-phrase
ardrive generate-seedphrase
"this is an example twelve word seed phrase that you could use"
```

Or, you can generate a wallet file using `generate-wallet`:

```sh
# Generate a wallet and store it in a chosen output file
ardrive generate-wallet > /path/to/wallet/file.json
```
