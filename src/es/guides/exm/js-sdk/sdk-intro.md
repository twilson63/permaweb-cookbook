---
locale: es
---
# SDK de la Máquina de Ejecución

El SDK de JavaScript permite el uso de la Máquina de Ejecución (EXM) en aplicaciones JavaScript y TypeScript. Para utilizar el SDK, se necesitan realizar los siguientes pasos de configuración.

## Instalación

Para instalar EXM en tu proyecto, puedes utilizar `npm` o `yarn`.

<CodeGroup>
  <CodeGroupItem title="npm">

```bash
npm install @execution-machine/sdk
```
  </CodeGroupItem>
  <CodeGroupItem title="yarn">

```bash
yarn add @execution-machine/sdk
```
  </CodeGroupItem>
</CodeGroup>

## Importación

Cuando utilizas EXM con tu proyecto, el paquete debe ser importado de la siguiente manera.

<CodeGroup>
  <CodeGroupItem title="JavaScript">

```js
import { Exm } from '@execution-machine/sdk';
```
  </CodeGroupItem>
</CodeGroup>

## Creación de una instancia

Para interactuar con EXM después de la instalación y la importación, se debe crear una instancia.

<CodeGroup>
  <CodeGroupItem title="JavaScript">

```js
const exmInstance = new Exm({ token: 'MI_TOKEN_EXM' });
```
  </CodeGroupItem>
</CodeGroup>

## Resumen

Las siguientes guías mostrarán cómo desplegar funciones sin servidor utilizando el SDK de EXM JS y cómo interactuar con ellas.