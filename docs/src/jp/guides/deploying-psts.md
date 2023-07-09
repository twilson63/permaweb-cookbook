---
locale: jp
---
# PSTの作成と展開

### **前提条件**

---

PSTを作成する前に、**NodeJS/NPM**をインストールする必要があります。

### **始める準備**

---

SmartWeaveの契約は2つのパートに分けることができます：

- **契約**（トークンの背後にある実際のロジック）
- **初期状態**（トークンが持ついくつかの設定や構成）

このガイドでは、両方を作成します。

**ローカル環境の設定**

`npm install arweave arlocal warp-contracts`を実行します。

これにより、PSTの作成と展開に必要な関数が提供されます。

### **契約の設定**

---

PSTは展開前に初期状態の設定が必要です。トークン名やトークンの数量などが含まれます。

次のような設定ファイルを作成します：

```json
// initial-state.json
{
  "ticker": "TEST_PST",
  "name": "テストPST",
  "owner": "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo",
  "balances": {
      "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo": 1000,
      "Jo9BZOaIVBDIhyKDiSnJ1bIU4usT1ZZJ5Kl6M-rBFdI": 1000,
  }
}

```

これにより、PSTの初期オプションが設定されます。`initial-state.json`として保存してください。

- **`ticker`** - トークンのシンボル（例: BTC、ETH）
- **`name`** - トークンの名前
- **`owner`** - 契約オーナーのアドレス
- **`balances`** - 初期トークンを配布するアドレス

### 契約の記述

PSTの契約には、`handle`という1つの関数が必要です。この関数は2つの引数、`state`（契約の現在の状態）と`action`（実行したいアクション）を受け取ります（例: トークンの転送）。

PSTの契約への呼び出しの結果は、次の2つのいずれかを返す必要があります：
- **`state`** - 呼び出しが契約の状態を変更する場合（例: 転送）
- **`result`** - 呼び出しが状態を変更しない場合（例: 残高の表示）

それ以外の場合は、呼び出しが無効であるか失敗した場合は**`error`**をスローする必要があります。

まず、メインの`handle`関数を定義しましょう。
```js
//contract.js
export function handle(state, action) {
  let balances = state.balances;
  let input = action.input;
  let caller = action.caller;
}
```
これにより、スマートコントラクトが使用する一般的なインタラクションのためのいくつかの変数がセットアップされます。

次に、状態を変更する最初の種類の入力を追加します。これにより、契約のオーナーが自分のウォレットアドレスに新しいPSTを発行できるようになります。

```js
  if (input.function == 'mint') {
    let qty = input.qty;

  if (qty <= 0) {
    throw new ContractError('無効なトークンの発行');
  }

  if (!Number.isInteger(qty)) {
    throw new ContractError('"qty"の値が無効です。整数である必要があります');
  }

  if(caller != state.owner) {
    throw new ContractError('契約のオーナーのみが新しいトークンを発行できます。');
  }

  balances[caller] ? (balances[caller] += qty) : (balances[caller] = qty);
  return { state };
  }
```
次の関数では、ウォレット間でのPSTの転送を処理します。

```js
if (input.function == 'transfer') {

    let target = input.target;
    let qty = input.qty;

    if (!Number.isInteger(qty)) {
      throw new ContractError(`"qty"の値が無効です。整数である必要があります`);
    }

    if (!target) {
      throw new ContractError(`ターゲットが指定されていません`);
    }

    if (qty <= 0 || caller == target) {
      throw new ContractError('無効なトークンの転送');
    }

    if (balances[caller] < qty) {
      throw new ContractError(`発信者の残高は${qty}トークンを送信するには十分ではありません！`);
    }

    // 発信者のトークン残高を減らす
    balances[caller] -= qty;
    if (target in balances) {
      // ウォレットが既に状態に存在する場合、新しいトークンを追加する
      balances[target] += qty;
    } else {
      // ウォレットが新しい場合、開始残高を設定する
      balances[target] = qty;
    }

    return { state };
  }
```
さらに、対象ウォレットのPSTの残高を表示する方法も追加しましょう。

```js
if (input.function == 'balance') {

    let target = input.target;
    let ticker = state.ticker;
    
    if (typeof target !== 'string') {
      throw new ContractError(`バランスを取得するために対象を指定する必要があります`);
    }

    if (typeof balances[target] !== 'number') {
      throw new ContractError(`バランスを取得できません。対象が存在しません`);
    }

    return { result: { target, ticker, balance: balances[target] } };
  }
```
最後に、与えられた入力が`mint`、`transfer`、または`balance`のいずれでもない場合はエラーをスローしましょう。

```js
throw new ContractError(`関数が指定されていないか、認識できない関数です："${input.function}"`);
```

### **契約の展開**

契約を展開するためには、Warpと連携して契約を展開するNodeJSスクリプトを作成する必要があります。

`deploy-contract.js`というファイルを作成し、`WarpFactory`をインポートして開始します。

```js
import { WarpFactory } from 'warp-contracts/mjs'
```
次に、Warpのインスタンスを初期化します。

`forMainnet()`を`forLocal()`または`forTestnet()`に置き換えて、契約を展開する場所に応じて変更できます。

```js
const warp = WarpFactory.forMainnet();
```

Warpの設定が完了したら、契約を展開するためのウォレットが必要です。ローカルのキーファイルを使用する場合は次のようにします：

```js
const walletAddress = "path/to/wallet.json"
```
 または、次のコードを使用してWarpを介して新しいウォレットを作成することもできます：

```js
const jwk = await warp.arweave.wallets.generate();
const walletAddress = await warp.arweave.wallets.jwkToAddress(jwk);
```
トランザクションのサイズが100KB以下の場合は無料なので、ウォレットに資金を提供する必要はありません！

---

契約を展開する前に、初期状態ファイルと契約ファイルを読み込む必要があります。

```js
const contract = fs.readFileSync(path.join(__dirname, 'contract.js'), 'utf8');
const state = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'initial-state.json'), 'utf8')
);
```
展開に使う新しいウォレットを生成した場合、初期状態の`owner`をオーバーライドする必要があります。次のコードでこれを行うことができます：

```js
const initialState = {
  ...stateFromFile,
  ...{
    owner: walletAddress,
  },
};
```
ウォレットを使用している場合は、代わりに`initial-state.json`ファイルを直接編集してウォレットアドレスを使用できます。

次のコードは、契約を展開する処理を担当します：

```js
const contractTxId = await warp.createContract.deploy({
  wallet,
  initState: JSON.stringify(initialState),
  src: contractSrc,
});

console.log('展開が完了しました: ', {
  ...result,
  sonar: `https://sonar.warp.cc/#/app/contract/${result.contractTxId}`
});
```

`node deploy-contract.js`を実行して、契約を展開し、契約トランザクションIDをターミナルにログ出力します。

---

**ソースと詳細な情報**: [Warp Docs](https://academy.warp.cc/tutorials/pst/introduction/intro)