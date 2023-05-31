# Execution Machine SDK

The JavaScript SDK enables the usage of Execution Machine (EXM) in JavaScript and TypeScript applications. To use the SDK the following setup steps are needed.

## Install

To install EXM in your project you can use `npm` or `yarn`.

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

## Import

When using EXM with your project the package must be imported as follows.

<CodeGroup>
  <CodeGroupItem title="JavaScript">

```js
import { Exm } from '@execution-machine/sdk';
```
  </CodeGroupItem>
</CodeGroup>

## Creating an instance

To interact with EXM after installation and importing, an instance must be created.

<CodeGroup>
  <CodeGroupItem title="JavaScript">

```js
const exmInstance = new Exm({ token: 'MY_EXM_TOKEN' });
```
  </CodeGroupItem>
</CodeGroup>

## Summary

The following guides will show how to deploy serverless functions using the EXM JS SDK, and how to interact with them.