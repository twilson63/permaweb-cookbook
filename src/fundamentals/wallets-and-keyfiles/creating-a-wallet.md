## Creating a Wallet

Users can create Arweave and AO wallets without requiring any technical knowledge by using wallets like [Wander](https://wander.app) or [Beacon](https://beaconwallet.app). 

These are third-party applications, so as with most of crypto DYOR before choosing a wallet.

## Generating a wallet programmatically 

Arweave wallets can also be generated programatically.

### Creating a wallet with arweave-js

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
### Creating a wallet from the command line

If you would prefer to create an Arweave wallet through a command-line application, you can use the ArDrive CLI.

```sh
npm install -g ardrive-cli
```

You can generate a seed phrase with the command `generate-seedphrase`:

```sh
# Generate seed-phrase
ardrive generate-seedphrase
"this is an example twelve word seed phrase that you could use"
```

Or, you can generate a wallet file using generate wallet:

```sh
# Generate a wallet and store it in a chosen output file
ardrive generate-wallet > /path/to/wallet/file.json
```

