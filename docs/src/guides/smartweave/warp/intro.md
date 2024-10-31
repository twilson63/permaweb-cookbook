# Warp (SmartWeave) SDK Intro

> **⚠️ Deprecation Notice**
>
> This document is deprecated and may contain outdated information.

Warp is a popular SmartWeave Protocol SDK. With Warp and Irys your SmartWeave deployments and interactions can be extremely fast.

## Introduction

This guide is a short introduction to the Warp SDK and some of its API methods, if you want to learn more about SmartWeave Contracts in general visit [Core Concepts: SmartWeave](/concepts/smartweave.html).

::: tip
You can find the Warp SDK on [github](https://github.com/warp-contracts). For a deeper dive on Warp SmartWeave visit [Warp Website](https://warp.cc)
:::

To use the SDK on the server, you will need access to a wallet.json file, to use the SDK in the browser you will need to connect to an arweave supported wallet.

## Install

To install warp in your project you can use `npm` or `yarn` or other npm clients.

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

## Import

When using Warp with your project there are several ways to import the sdk depending on your project setup.

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

## Connecting to an environment

There are several environments that you may want to interact with, you can connect to those environments using the `forXXXX` helpers.

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
  <CodeGroupItem title="Custom">

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
When using local environment, you will need to have arLocal running on port 1984.
:::

## Summary

This intro guide is to help you get setup with Warp, the following guides will show you how to deploy SmartWeave contracts using the Warp SDK, how to interact with those contracts and finally, how to evolve SmartWeave contracts.
