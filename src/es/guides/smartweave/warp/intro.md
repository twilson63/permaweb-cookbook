---
locale: es
---

# Introducción al SDK de Warp (SmartWeave)

Warp es un popular SDK del Protocolo SmartWeave. Con Warp y Irys tus implementaciones e interacciones de SmartWeave pueden ser extremadamente rápidas.

## Introducción

Esta guía es una breve introducción al SDK de Warp y algunos de sus métodos de API. Si deseas aprender más sobre los Contratos SmartWeave en general, visita [Conceptos básicos: SmartWeave](/concepts/smartweave.html).

::: tip
Puedes encontrar el SDK de Warp en [github](https://github.com/warp-contracts). Para profundizar en Warp SmartWeave, visita [el sitio web de Warp](https://warp.cc).
:::

Para usar el SDK en el servidor, necesitarás acceso a un archivo wallet.json, y para usar el SDK en el navegador deberás conectarte a una billetera compatible con arweave.

## Instalación

Para instalar Warp en tu proyecto, puedes usar `npm`, `yarn` u otros clientes de npm.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install warp-contracts
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add warp-contracts
```

  </CodeGroupItem>
</CodeGroup>

## Importación

Cuando uses Warp con tu proyecto, hay varias formas de importar el SDK dependiendo de la configuración de tu proyecto.

<CodeGroup>
  <CodeGroupItem title="Typescript">

```ts
import { WarpFactory } from "warp-contracts";
```

  </CodeGroupItem>
  <CodeGroupItem title="ESM">

```js
import { WarpFactory } from "warp-contracts/mjs";
```

  </CodeGroupItem>
  <CodeGroupItem title="CommonJS">

```js
const { WarpFactory } = require("warp-contracts");
```

  </CodeGroupItem>
</CodeGroup>

## Conexión a un entorno

Existen varios entornos con los que puedes interactuar. Puedes conectarte a estos entornos utilizando los ayudantes `forXXXX`.

<CodeGroup>
  <CodeGroupItem title="Mainnet">

```ts
const warp = WarpFactory.forMainnet();
```

  </CodeGroupItem>
  <CodeGroupItem title="Testnet">

```js
const warp = WarpFactory.forTestnet();
```

  </CodeGroupItem>
  <CodeGroupItem title="Local">

```js
const warp = WarpFactory.forLocal();
```

  </CodeGroupItem>
  <CodeGroupItem title="Personalizado">

```js
const warp = WarpFactory.custom(
	arweave, // arweave-js
	cacheOptions, // { ...defaultCacheOptions, inMemory: true}
	environment, // 'local', 'testnet', 'mainnet'
);
```

  </CodeGroupItem>
</CodeGroup>

::: warning
Cuando uses el entorno local, necesitarás tener arLocal ejecutándose en el puerto 1984.
:::

## Resumen

Esta guía introductoria te ayudará a configurar Warp. Las siguientes guías te mostrarán cómo implementar contratos SmartWeave utilizando el SDK de Warp, cómo interactuar con esos contratos y, finalmente, cómo evolucionar los contratos SmartWeave.
