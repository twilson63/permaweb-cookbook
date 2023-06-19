---
locale: es
---
# Warp (SmartWeave) SDK - Evolve

Evolve es una función que permite a los desarrolladores actualizar el código fuente de un contrato inteligente sin desplegar un nuevo contrato. Para usar esta función, primero debes enviar el nuevo código fuente utilizando la función save. Una vez que el código actualizado ha sido confirmado en la Permaweb, puedes usar la función evolve para apuntar el contrato al nuevo identificador del código fuente. Esto te permite actualizar el comportamiento del contrato sin crear una nueva instancia de contrato.

## ¿Por qué?

Escribir contratos SmartWeave puede ser difícil y algunas veces requiere de actualizaciones o nuevas características que se deben añadir con el tiempo. Evolve te permite realizar cambios en tu contrato sin tener que crear una nueva instancia de contrato desde cero. Para usar esta función, el objeto de estado de tu contrato debe incluir una propiedad "evolve" que esté configurada con el identificador de transacción del nuevo código fuente del contrato. Esto te permite modificar y mejorar tu contrato existente sin empezar desde cero.

```json
{
  ...
  "evolve": "TU IDENTIFICADOR DE TRANSACCIÓN DEL CÓDIGO FUENTE"
}
```

## Publica tu nuevo código fuente en la Permaweb

Antes de poder evolucionar tu contrato existente, necesitas publicar el nuevo código fuente en la Permaweb, esto lo puedes hacer utilizando la función "save".

```ts
import { WarpFactory } from 'warp-contracts'
import fs from 'fs'

const src = fs.readFileSync('./dist/contract.js', 'utf-8')
const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
const TX_ID = 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA'
const warp = WarpFactory.forMainnet()

async function main() {
  const newSrcTxId = await warp.contract(TX_ID).connect(jwk).save({src })
  console.log('NUEVO ID DEL CÓDIGO FUENTE', newSrcTxId)
}

main()
```

## Evoluciona tu contrato

::: warning
**Verifica** que tu nuevo identificador de la transacción del código fuente haya sido confirmado, ve a [Sonar](https://sonar.warp.cc) para asegurarte de que el identificador de transacción haya sido confirmado.
:::

```ts
import { WarpFactory } from 'warp-contracts'
import fs from 'fs'

const src = fs.readFileSync('./dist/contract.js', 'utf-8')
const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
const TX_ID = 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA'
const warp = WarpFactory.forMainnet()

async function main() {
  const newSrcTxId = await warp.contract(TX_ID).connect(jwk).evolve('IDENTIFICADOR DE TRANSACCIÓN DEL CÓDIGO FUENTE')
  console.log(result)
}

main()
```

::: tip
Es importante tener en cuenta que la función evolve solo se aplica a acciones futuras, lo que significa que no puedes usarla para aplicar nuevo código fuente a acciones que ocurrieron antes de que el contrato fuera evolucionado.
:::

## Resumen

Evolve es una función poderosa y puede proporcionar flexibilidad para tus contratos, pero también puede ser un vector de **ataque**, así que asegúrate de comprender completamente lo que estás haciendo al usarla. A continuación se muestra un ejemplo común de cómo puede verse una función evolve en tu contrato.

```js

export async function handle(state, action) {
  ...
  if (action.input.function === 'evolve') {
    if (action.caller === state.creator) {
      state.evolve = action.input.value 
    }
    return { state }
  }
  ...
}
```