---
locale: jp
---
# Warp（SmartWeave）SDK - ReadState（状態の読み取り）

SmartWeaveの契約状態は遅延評価によって計算されます。つまり、状態の評価は書き込みではなく読み込み時に行われます。契約の読み取り時に、SDKはすべての状態の相互作用を収集し、ソートして、リデュースまたはフォールドパターンを使用してソースの契約に対して実行します。

## 基本的な状態の読み取り

```ts
const warp = WarpFactory.forMainnet()
const CONTRACT_ID = '_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk'

const result = await warp.contract(CONTRACT_ID).readState()

// 現在の状態をログに出力
console.log(result.cachedValue.state)
```

## 高度な状態の読み取り

一部の契約では、他の契約の状態を読み取ったり、他の契約を呼び出したり、書き込んだりする場合があります。これらの契約の状態を要求する際には、評価オプションを設定する必要があります。

```ts
const warp = WarpFactory.forMainnet()
const CONTRACT_ID = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

const result = await warp.contract(CONTRACT_ID)
  .setEvaluationOptions({
    internalWrites: true,
    allowBigInt: true
  })
  .readState()

// 現在の状態をログに出力
console.log(result.cachedValue.state)
```

### 一般的な評価オプション

| 名前 | 説明 |
| ---- | ----------- |
| internalWrites | 他の契約への内部書き込みを含む契約の評価 |
| allowBigInt | BigIntプリミティブを使用する契約の評価に使用されます。bigIntについて詳しくは[MDNドキュメント](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)を参照してください。 |
| unsafeClient | この値は `allow`、`skip`、`throw` のいずれかです。契約内でunsafeClientを使用することは避けるべきです。それは非決定的な結果をもたらす可能性があります。 |

## 特定のブロックの高さまたはソートキーからの状態の読み取り

現在の状態ではなく、特定のブロックの高さでの状態を見たい場合は、ブロックの高さを指定して契約の状態を読み取ることができます。

```ts
const { sortKey, cachedValue } = await contract.readState(1090111)
```

## 概要

SmartWeave契約の現在の状態の読み取りは、すべての相互作用を取得し、各相互作用をフォールドメソッドを介して処理することによって状態の評価を実行します。このアプローチはパーマウェブに固有のものであり、SmartWeave契約コードがどのように実行されるかについての独自の理解が必要です。