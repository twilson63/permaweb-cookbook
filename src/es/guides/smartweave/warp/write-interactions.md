---
locale: es
---
# Warp WriteInteractions

Para llamar a una función en un contrato de SmartWeave, puedes crear una transacción conocida como una acción de SmartWeave. Esta acción incluye el nombre de la función y los parámetros de entrada necesarios para la función en el contrato de SmartWeave. Puedes crear una acción de SmartWeave utilizando la función contract.writeInteraction.

## Código

```ts
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet()
const STAMP_PROTOCOL = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

async function doStamp() {
  const result = await warp.contract(STAMP_PROTOCOL)
    .connect('use_wallet')
    .writeInteraction({
      function: 'stamp',
      timestamp: Date.now(),
      transactionId: 'zQhANphTO0DOsaWXhExylUD5cBN3a6xWvfn5ZCpmCVY'
    })
  console.log(result)
}
```

Al llamar a writeInteraction, debes pasar tus parámetros de entrada, que son los parámetros que el contrato espera recibir.

::: warning
Dado que los contratos de SmartWeave se evalúan en un flujo perezoso, no sabes si tu interacción se ejecutó correctamente hasta que evalúes el contrato hasta el estado actual. Usa [Warp readState](./readstate.md) para acceder al contrato y determinar si la interacción se aplicó correctamente.
:::

## Escrito en Seco

`DryWrite` te permite probar y verificar una interacción en el estado actual sin ejecutarla realmente en la permaweb. Esta función te permite simular la interacción localmente y asegurarte de que será exitosa antes de aplicarla.

```ts
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet()
const STAMP_PROTOCOL = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

async function doStamp() {
  const result = await warp.contract(STAMP_PROTOCOL)
    .connect('use_wallet')
    .dryWrite({
      function: 'stamp',
      timestamp: Date.now(),
      transactionId: 'zQhANphTO0DOsaWXhExylUD5cBN3a6xWvfn5ZCpmCVY'
    })
  console.log(result)
}
```

::: warning
Al usar escrituras en seco, ten en cuenta que se debe evaluar localmente todo el estado de los contratos que utilizan readState o internalWrites. Esto puede resultar en un proceso de ejecución lento.
:::

## Optimizado para velocidad

Por defecto, las writeInteractions se envían al Warp Sequencer y se agrupan y publican en Arweave. Puedes publicar directamente en Arweave desactivando el agrupamiento.

```ts
const result = await contract.writeInteraction({
  function: 'NOMBRE_DE_TU_FUNCION',
  ...
}, { disableBundling: true })
```

## Resumen

El Protocolo SmartWeave permite la modificación de datos dinámicos en un sistema de almacenamiento inmutable y solo de añadido utilizando writeInteractions. Estas interacciones permiten la comunicación sin confianza y sin permisos con los contratos de SmartWeave. El SDK Warp proporciona a los desarrolladores una API fácil de usar para interactuar con el Protocolo SmartWeave y su función writeInteractions.

Recursos adicionales:

* SDK Warp [https://github.com/warp-contracts/warp](https://github.com/warp-contracts/warp)
* Documentación de Warp [https://warp.cc](https://warp.cc)