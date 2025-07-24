---
locale: es
---

# Tokens Atómicos

## ¿Qué es un Token Atómico?

[Consulta el concepto](../../concepts/atomic-tokens.md)

## Creación de un Token Atómico

::: info INFORMACIÓN
Para este ejemplo, estamos utilizando una fuente de contrato SWT que ya está publicada en la red. [x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs](https://sonar.warp.cc/#/app/source/x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs#) -
:::

example.ts

```ts
import Irys from '@irys/sdk'
import { WarpFactory } from 'warp-contracts'

async function main() {
  const wallet = JSON.parse(await import('fs')
    .then(fs => fs.readFileSync('./wallet.json', 'utf-8')))

  const irys = new Irys({'https://node2.irys.xyz', 'arweave', wallet})
  const warp = WarpFactory.forMainnet()

  const data = `<h1>¡Hola Permaweb!</h1>`
  const tags = [
    { name: 'Content-Type', value: 'text/html' },
    // Etiquetas ANS-110
    { name: 'Type', value: 'página-web' },
    { name: 'Title', value: 'Mi primera página de Permaweb' },
    { name: 'Description', value: 'Primera página de Permaweb por Anon' },
    { name: 'Topic:Noob', value: 'Noob' },
    // Contrato SmartWeave
    { name: 'App-Name', value: 'SmartWeaveContract' },
    { name: 'App-Version', value: '0.3.0' },
    { name: 'Contract-Src', value: 'x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs' },
    {
      name: 'Init-State', value: JSON.stringify({
        balances: {
          'cHB6D8oNeXxbQCsKcmOyjUX3UkL8cc3FbJmzbaj3-Nc': 1000000
        },
        name: 'AtomicToken',
        ticker: 'ATOMIC-TOKEN',
        pairs: [],
        creator: 'cHB6D8oNeXxbQCsKcmOyjUX3UkL8cc3FbJmzbaj3-Nc',
        settings: [['isTradeable', true]]
      })
    }
  ]

  const { id } = await irys.upload(data, { tags })
  await warp.createContract.register(id, 'node2')
  console.log('Token Atómico: ', id)
}

main()
```

En este ejemplo, estamos creando un elemento de datos y subiéndolo al servicio de red de bundler. Luego registramos nuestro contrato con el secuenciador Warp. Al utilizar el bundler para publicar nuestro elemento de datos y registrarnos con el secuenciador Warp, nuestros datos están disponibles de inmediato en el servicio de la puerta de enlace y nuestro contrato está inmediatamente disponible para aceptar interacciones.

Ejecutar Ejemplo

```sh
npm install @irys/sdk warp-contracts
npm install typescript ts-node
npx ts-node example.ts
```

::: info INFORMACIÓN
[ANS-110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) es una Especificación de Descubrimiento de Activos que permite la complementariedad con el ecosistema de aplicaciones de Permaweb.
:::

## Resumen

Este es un ejemplo simple de implementación de un Token Atómico, para ejemplos más detallados consulta: [https://atomic-assets.arweave.dev](https://atomic-assets.arweave.dev)

## Trabajando con Tokens

Los contratos SmartWeave no pueden contener AR, la moneda nativa de la red de Arweave. AR se utiliza para comprar almacenamiento de datos en la red de Arweave y se puede transferir desde una billetera de origen a una billetera de destino en la red de Arweave, pero no se puede retener en un contrato SmartWeave.
