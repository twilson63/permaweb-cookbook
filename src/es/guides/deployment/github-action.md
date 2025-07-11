---
locale: es
---

# Acción de Github

::: danger
Esta guía es solo para fines educativos, y debes usarla para aprender las opciones de cómo puedes implementar tu aplicación. En esta guía, confiamos en un recurso de terceros `github` propiedad de `microsoft` para proteger nuestra información secreta, en su documentación cifran los secretos en su almacenamiento utilizando `libsodium sealed box`, puedes encontrar más información sobre sus prácticas de seguridad aquí. https://docs.github.com/es/actions/security-guides/encrypted-secrets
:::

Las Acciones de Github son tuberías de CI/CD que permiten a los desarrolladores disparar tareas automatizadas a través de eventos generados desde el sistema de flujo de trabajo de github. Estas tareas pueden ser casi cualquier cosa, en esta guía mostraremos cómo puedes usar las acciones de github para implementar tu aplicación en la permaweb utilizando Irys y ArNS.

::: tip
Esta guía requiere un entendimiento de las acciones de github, y debes tener algunos tokens de prueba de ArNS, ve a https://ar.io/arns/ para más detalles.
:::

::: warning
Esta guía no incluye pruebas u otras verificaciones que desees agregar a tu flujo de trabajo de producción.
:::

## Crear script de implementación

Un script de implementación es un script que realiza el trabajo pesado de implementar tu aplicación, utilizaremos `@irys/sdk` y `warp-contracts` para publicar nuestra aplicación y registrar la aplicación recién publicada en ArNS.

Instalar las dependencias de implementación

```console
npm install --save-dev @irys/sdk
npm install --save-dev warp-contracts
npm install --save-dev arweave
```

Crear archivo `deploy.mjs`

```js
import Irys from '@irys/sdk'
import { WarpFactory, defaultCacheOptions } from 'warp-contracts'
import Arweave from 'arweave'

const ANT = '[TU CONTRATO ANT]'
const DEPLOY_FOLDER = './dist'
const IRYS_NODE = 'https://node2.irys.xyz'

const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
const jwk = JSON.parse(Buffer.from(process.env.PERMAWEB_KEY, 'base64').toString('utf-8'))

const irys = new Irys({ IRYS_NODE, 'arweave', jwk })
const warp = WarpFactory.custom(
  arweave,
  defaultCacheOptions,
  'mainnet'
).useArweaveGateway().build()

const contract = warp.contract(ANT).connect(jwk)
// cargar carpeta
const result = await irys.uploadFolder(DEPLOY_FOLDER, {
  indexFile: 'index.html'
})


// actualizar ANT
await contract.writeInteraction({
  function: 'setRecord',
  subDomain: '@',
  transactionId: result.id
})

console.log('Implementado Cookbook, por favor espera 20 - 30 minutos para que ArNS se actualice!')
```

## Agregar script a package.json

Crear una nueva propiedad de script llamada `deploy`, llamar al script de construcción, luego llamar a `node deploy.mjs` en el valor de la propiedad de scripts deploy.

package.json

```json
  ...
  "scripts": {
    "dev": "vitepress dev src",
    "build": "vitepress build src",
    "deploy": "yarn build && node deploy.mjs"
  },
  ...
```

## Crear acción de github

Crear un archivo `deploy.yml` en la carpeta `.github/workflows`, este archivo indica a las acciones de github que implementen cuando se desencadena un evento de empuje en la rama `main`.

```yml
name: publicar

on:
    push:
        branches:
            - "main"

jobs:
    publicar:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-node@v1
              with:
                  node-version: 18.x
            - run: yarn
            - run: yarn deploy
              env:
                  KEY: ${{ secrets.PERMAWEB_KEY }}
```

## Resumen

En el repositorio del proyecto, ve a la configuración y secretos, agrega un nuevo secreto al repositorio, este secreto se llamará PERMAWEB_KEY para este proyecto. El valor del secreto debe ser la cadena codificada en base64 de la billetera de implementación.

```console
base64 -i wallet.json | pbcopy
```

Para que esta implementación funcione, deberás financiar la cuenta de Irys de esta billetera, asegúrate de tener algunos $AR en la billetera que vayas a usar, no mucho, tal vez .5 AR, luego usa la interfaz de línea de comandos de Irys para financiarla.

```console
irys fund 250000000000 -h https://node2.irys.xyz -w wallet.json -t arweave
```

::: warning
Mantén esta billetera con pocos fondos y úsala solo para este proyecto.
:::

:tada: ¡Has configurado una acción de github para automatizar por completo tu implementación en la permaweb!
