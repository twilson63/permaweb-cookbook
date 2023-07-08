---
locale: pt
---
# Warp (SmartWeave) SDK - Ler Estado  

O estado do contrato SmartWeave é calculado por meio de avaliação preguiçosa, o que significa que a avaliação do estado ocorre em leituras e não em escritas. Ao ler contratos, o SDK reúne todas as interações de estado, as classifica e as executa no contrato de origem usando um padrão de redução ou dobragem.

## Leitura básica do estado

```ts
const warp = WarpFactory.forMainnet()
const CONTRACT_ID = '_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk'

const result = await warp.contract(CONTRACT_ID).readState()

// registrar estado atual
console.log(result.cachedValue.state)
```

## Leitura avançada do estado

Alguns contratos leem o estado de outros contratos, ou invocam ou escrevem em outros contratos. Ao solicitar o estado desses contratos, é necessário definir opções de avaliação.

```ts
const warp = WarpFactory.forMainnet()
const CONTRACT_ID = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

const result = await warp.contract(CONTRACT_ID)
  .setEvaluationOptions({
    internalWrites: true,
    allowBigInt: true
  })
  .readState()

// registrar estado atual
console.log(result.cachedValue.state)
```

### Opções de Avaliação Comuns

| Nome | Descrição |
| ---- | ----------- |
| internalWrites | Avalia contratos que contêm gravações internas em outros contratos |
| allowBigInt | Avalia contratos que usam o primitivo BigInt, você pode saber mais sobre BigInt [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) |
| unsafeClient | Esse valor pode ser `allow` ou `skip` ou `throw`. Evite usar unsafeClient em seus contratos, pois pode levar a resultados não determinísticos. |

## Ler estado a partir de uma altura de bloco específica ou chave de classificação

Você pode querer visualizar um estado anterior, não o estado atual, fornecendo uma altura de bloco para ler o estado de um contrato em uma altura de bloco específica

```ts
const { sortKey, cachedValue } = await contract.readState(1090111)
```

## Resumo

Ler o estado atual dos contratos SmartWeave realiza a avaliação do estado, reunindo todas as interações e processando cada interação por meio de um método de dobragem. Esse método é único para a permaweb e requer uma compreensão única de como o código do seu contrato SmartWeave é executado.