# Svelte スターターキット

Svelte は JavaScript バンドルにコンパイルされ、その過程でアプリの配布物からフレームワーク自体を取り除きます。これにより、他のフレームワークよりもはるかに小さなフットプリントになります。Svelte は Permaweb アプリケーションに最適なフレームワークです。Permaweb アプリケーションはシングルページアプリケーション（Single Page Application, SPA）の原則に基づいて構築されますが、Arweave ネットワーク上にホストされ、Permaweb ゲートウェイによって配信されます。

Svelte スターターキット ガイド:

- [Minimal](./minimal.md) - Svelte Permaweb アプリを構築するために必要な最小限のセットアップ
- [Vite](./vite.md) - Svelte、TypeScript、Vite

::: info Permaweb アプリケーションの制約

- 100% フロントエンドアプリケーション（サーバーサイドのバックエンドは使用しない）
- アプリケーションはサブパスから配信される (https://[gateway]/[TX_ID])
  :::
