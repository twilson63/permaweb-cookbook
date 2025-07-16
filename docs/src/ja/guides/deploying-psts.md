---
locale: ja
---
# PSTの作成とデプロイ

### **前提条件**

---

PSTを作成する前に、**NodeJS/NPM**をインストールしておく必要があります。

### **始めに**

---

SmartWeaveコントラクトは、以下の2つの部分に分かれています。

- **コントラクト**（トークンの背後にある実際のロジック）
- **初期状態**（トークンに設定したい設定や構成）

このガイドでは、両方を作成します。

**ローカル環境の設定**

次のコマンドを実行します。

Run `npm install arweave arlocal warp-contracts`. 

This will provide functions to create and deploy a PST.

### **Configuring The Contract**

---

The PST requires some initial state setup before deployment, e.g. the token name, and token quantity.

Create a configuration file that looks something like this:

```json
// initial-state.json
{
  "ticker": "TEST_PST",
  "name": "Test PST",
  "owner": "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo",
  "balances": {
      "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo": 1000,
      "Jo9BZOaIVBDIhyKDiSnJ1bIU4usT1ZZJ5Kl6M-rBFdI": 1000,
  }
}

```
これにより、PSTの初期オプションが設定されます。これを `initial-state.json` として保存してください。

- **`ticker`** - トークンのシンボル（例：BTC、ETH）
- **`name`** - トークンの名前
- **`owner`** - コントラクトの所有者のアドレス
- **`balances`** - 初期トークンを配布するアドレス

### コントラクトの作成

PSTコントラクトには、`handle` という単一の関数が必要です。この関数は2つの引数を受け取ります。

`state` はコントラクトの現在の状態を表し、`action` は実行したいアクション（例：トークンの移転）を示します。

PSTコントラクトへの呼び出しは、次のいずれかの結果を返す必要があります：
- **`state`** - コントラクトの状態が変更された場合（例：移転を行う）。
- **`result`** - コントラクトの状態が変更されない場合（例：残高の確認）。

それ以外の場合は、呼び出しが無効であるか失敗した場合には **`error`** を投げる必要があります。

まず、メインの `handle` 関数を定義しましょう。.
```js
//contract.js
export function handle(state, action) {
  let balances = state.balances;
  let input = action.input;
  let caller = action.caller;
}
```
これにより、スマートコントラクトが使用する一般的な操作のための変数が設定されます。

次に、状態を変更する最初のタイプの入力を追加します。これにより、契約の所有者は新しいPSTを自分のウォレットアドレスにミントできます。

```js
  if (input.function == 'mint') {
    let qty = input.qty;

  if (qty <= 0) {
    throw new ContractError('Invalid token mint');
  }

  if (!Number.isInteger(qty)) {
    throw new ContractError('Invalid value for "qty". Must be an integer');
  }

  if(caller != state.owner) {
    throw new ContractError('Only the owner of the contract can mint new tokens.');
  }

  balances[caller] ? (balances[caller] += qty) : (balances[caller] = qty);
  return { state };
  }
```
次の関数は、ウォレット間のPSTの転送を処理します。

```js
if (input.function == 'transfer') {

    let target = input.target;
    let qty = input.qty;

    if (!Number.isInteger(qty)) {
      throw new ContractError(`Invalid value for "qty". Must be an integer`);
    }

    if (!target) {
      throw new ContractError(`No target specified`);
    }

    if (qty <= 0 || caller == target) {
      throw new ContractError('Invalid token transfer');
    }

    if (balances[caller] < qty) {
      throw new ContractError(`Caller balance not high enough to send ${qty} token(s)!`);
    }

    // Lower the token balance of the caller
    balances[caller] -= qty;
    if (target in balances) {
      // Wallet already exists in state, add new tokens
      balances[target] += qty;
    } else {
      // Wallet is new, set starting balance
      balances[target] = qty;
    }

    return { state };
  }
```
ターゲットウォレットのPST残高を表示する方法も追加しましょう。

```js
if (input.function == 'balance') {

    let target = input.target;
    let ticker = state.ticker;
    
    if (typeof target !== 'string') {
      throw new ContractError(`Must specificy target to get balance for`);
    }

    if (typeof balances[target] !== 'number') {
      throw new ContractError(`Cannnot get balance, target does not exist`);
    }

    return { result: { target, ticker, balance: balances[target] } };
  }
```
最後に、入力された内容が`mint`、`transfer`、または`balance`関数でない場合にエラーをスローします。

```js
throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
```

### **契約のデプロイ**

契約をデプロイするには、Warpと連携して契約をデプロイするNodeJSスクリプトを書く必要があります。

`deploy-contract.js`という名前のファイルを作成し、`WarpFactory`をインポートして開始します。

```js
import { WarpFactory } from 'warp-contracts/mjs'
```
次に、Warpのインスタンスを初期化します。

契約をデプロイする場所に応じて、`forMainnet()`を`forLocal()`または`forTestnet()`に置き換えることができます。

```js
const warp = WarpFactory.forMainnet();
```

Warpの設定が完了したら、契約をデプロイするためのウォレットが必要です。ローカルのキー・ファイルを使用するか、自分のものを使用できます：

```js
const walletAddress = "path/to/wallet.json"
```
 or, generate a new wallet through Warp using the following code:

```js
const jwk = await warp.arweave.wallets.generate();
const walletAddress = await warp.arweave.wallets.jwkToAddress(jwk);
```
100KB未満のトランザクションは無料なので、ウォレットに資金を入れる必要はありません！

---

契約をデプロイする前に、初期状態ファイルと契約ファイルを読み込む必要があります。

```js
const contract = fs.readFileSync(path.join(__dirname, 'contract.js'), 'utf8');
const state = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'initial-state.json'), 'utf8')
);
```
新しいウォレットを生成してデプロイする場合、初期状態で`owner`を上書きする必要があります。次のコードを使ってこれを行うことができます：
```js
const initialState = {
  ...stateFromFile,
  ...{
    owner: walletAddress,
  },
};
```
ウォレットを使用している場合は、代わりに`initial-state.json`ファイルを直接編集してウォレットアドレスを使用できます。

以下のコードが契約のデプロイを処理します：

```js
const contractTxId = await warp.createContract.deploy({
  wallet,
  initState: JSON.stringify(initialState),
  src: contractSrc,
});

console.log('Deployment completed: ', {
  ...result,
  sonar: `https://sonar.warp.cc/#/app/contract/${result.contractTxId}`
});
```

`node deploy-contract.js`を実行すると、あなたの契約がデプロイされ、ターミナルに契約トランザクションIDがログとして表示されます。

---

**出典およびさらなる情報**: [Warp Docs](https://academy.warp.cc/tutorials/pst/introduction/intro)