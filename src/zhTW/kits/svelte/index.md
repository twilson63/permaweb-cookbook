# Svelte 起始套件

Svelte 是一個將原始碼編譯為 JavaScript 捆綁檔的框架，並在此過程中將框架自身從應用程式的發佈檔中移除。這使得其相較於其他框架具有更小的體積。Svelte 是打造 Permaweb 應用程式的理想框架。Permaweb 應用程式建立在單頁應用程式（Single Page Application, SPA）的原則上，但部署於 Arweave 網路，並由 Permaweb gateways 分發。

Svelte 起始套件指南：

- [Minimal](./minimal.md) - 建置 Svelte Permaweb 應用程式所需的最小內容
- [Vite](./vite.md) - Svelte、Typescript 與 Vite

::: info Permaweb 應用程式 限制

- 100% 前端應用程式（不含伺服器端後端）
- 應用程式會從子路徑提供（https://[gateway]/[TX_ID]）
  :::
