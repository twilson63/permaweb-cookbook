---
locale: ja
---
# Warp (SmartWeave) SDK - ReadState  

> **⚠️ Deprecation Notice**
>
> この文書は廃止予定であり、古い情報が含まれている可能性があります。

SmartWeaveコントラクトの状態は、遅延評価を通じて計算されます。つまり、状態の評価は書き込みではなく読み取りで行われます。コントラクトを読み取る際、SDKはすべての状態インタラクションを収集し、ソートして、reduceまたはfoldパターンを使用してソースコントラクトに対して実行します。

## 基本的なReadstate

```ts
const warp = WarpFactory.forMainnet()
const CONTRACT_ID = '_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk'

const result = await warp.contract(CONTRACT_ID).readState()

// log current state
console.log(result.cachedValue.state)
```


## 高度なReadstate

一部のコントラクトは、他のコントラクトの状態を読み取ったり、他のコントラクトに対して呼び出しや書き込みを行ったりします。これらのコントラクトの状態を要求する際には、評価オプションを設定する必要があります。

```ts
const warp = WarpFactory.forMainnet()
const CONTRACT_ID = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

const result = await warp.contract(CONTRACT_ID)
  .setEvaluationOptions({
    internalWrites: true,
    allowBigInt: true
  })
  .readState()

// log current state
console.log(result.cachedValue.state)
```

### 一般的な評価オプション

| 名前 | 説明 |
| ---- | ----------- |
| internalWrites | 他のコントラクトへの内部書き込みを含むコントラクトを評価します |
| allowBigInt | BigIntプリミティブを使用するコントラクトを評価します。BigIntについての詳細は[MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)を参照してください。 |
| unsafeClient | この値は `allow`、`skip`、または `throw` です。unsafeClientをコントラクトで使用することは避けるべきで、非決定的な結果を招く可能性があります。 |

## 特定のBlockHeightまたはSortkeyからのReadstate

現在の状態ではなく、以前の状態を確認したい場合、blockHeightを指定することで特定のブロック高でのコントラクトの状態を読み取ることができます。


```ts
const { sortKey, cachedValue } = await contract.readState(1090111)
```

## まとめ

SmartWeaveコントラクトの現在の状態を読み取ることは、すべてのインタラクションを引き出し、それぞれのインタラクションをfoldメソッドを通じて処理することによって状態評価を行います。このアプローチはpermaweb特有のものであり、SmartWeaveコントラクトコードがどのように実行されるかを理解するために特有の理解が必要です。
