# Svelte 起始套件

Svelte 是一个将源代码编译为 JavaScript 捆绑文件的框架，并在此过程中将框架自身从应用程序的发布产物中移除。这样与其他框架相比，它具有更小的体积。Svelte 是构建 Permaweb 应用程序的理想框架。Permaweb 应用程序建立在单页应用（Single Page Application, SPA）的原则上，但部署于 Arweave 网络，并由 Permaweb 网关分发。

Svelte 起始套件指南：

- [Minimal](./minimal.md) - 构建 Svelte Permaweb 应用程序所需的最小内容
- [Vite](./vite.md) - Svelte、Typescript 与 Vite

::: info Permaweb 应用程序 限制

- 100% 前端应用程序（不含服务器端后端）
- 应用程序将从子路径提供（https://[gateway]/[TX_ID]）
  :::
