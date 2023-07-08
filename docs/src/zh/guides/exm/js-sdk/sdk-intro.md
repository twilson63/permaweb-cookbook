---
locale: zh
---
# 执行机器 SDK

JavaScript SDK允许在JavaScript和TypeScript应用程序中使用执行机器（EXM）。要使用SDK，需要执行以下设置步骤。

## 安装

要在项目中安装EXM，可以使用`npm`或`yarn`。

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

## 导入

当在项目中使用EXM时，必须按以下方式导入该包。

<CodeGroup>
  <CodeGroupItem title="JavaScript">

```js
import { Exm } from '@execution-machine/sdk';
```
  </CodeGroupItem>
</CodeGroup>

## 创建实例

在安装并导入EXM后，必须创建一个实例才能与其进行交互。

<CodeGroup>
  <CodeGroupItem title="JavaScript">

```js
const exmInstance = new Exm({ token: 'MY_EXM_TOKEN' });
```
  </CodeGroupItem>
</CodeGroup>

## 摘要

以下指南将展示如何使用EXM JS SDK部署无服务器函数以及如何与它们进行交互。