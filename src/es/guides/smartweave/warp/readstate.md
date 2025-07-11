---
locale: es
---
# Warp (SmartWeave) SDK - LeerEstado

El estado del contrato SmartWeave se calcula mediante una evaluación perezosa, lo que significa que la evaluación del estado ocurre al leer, no al escribir. Al leer contratos, el SDK recopila todas las interacciones del estado, las ordena y las ejecuta en el contrato fuente utilizando un patrón de reducción o plegado.

## Lectura básica del estado

```ts
const warp = WarpFactory.forMainnet()
const CONTRACT_ID = '_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk'

const result = await warp.contract(CONTRACT_ID).readState()

// registrar estado actual
console.log(result.cachedValue.state)
```

## Lectura avanzada del estado

Algunos contratos leen el estado de otros contratos, o invocan o escriben en otros contratos. Cuando se solicita el estado de estos contratos, es necesario establecer opciones de evaluación.

```ts
const warp = WarpFactory.forMainnet()
const CONTRACT_ID = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

const result = await warp.contract(CONTRACT_ID)
  .setEvaluationOptions({
    internalWrites: true,
    allowBigInt: true
  })
  .readState()

// registrar estado actual
console.log(result.cachedValue.state)
```

### Opciones comunes de evaluación

| Nombre | Descripción |
| ---- | ----------- |
| internalWrites | Evalúa contratos que contienen escrituras internas en otros contratos |
| allowBigInt | Evalúa contratos que utilizan el primitivo BigInt puede obtener más información sobre BigInt en [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) |
| unsafeClient | Este valor puede ser `allow` or `skip` or `throw`. Debe evitar usar unsafeClient en sus contratos, ya que puede producir resultados no determinísticos. |

## Leer estado desde una altura específica de bloque o clave de ordenación

Es posible que desee ver un estado anterior, no el estado actual, proporcionando una altura de bloque  puede leer el estado de un contrato en una altura de bloque específica.

```ts
const { sortKey, cachedValue } = await contract.readState(1090111)
```

## Resumen

La lectura del estado actual de los contratos SmartWeave realiza una evaluación del estado mediante la recopilación de todas las interacciones y el procesamiento de cada interacción mediante un método de plegado. Este enfoque es único en la permaweb y requiere una comprensión única de cómo se ejecuta el código de su contrato SmartWeave.