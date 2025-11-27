# 伺服器端 DNS 整合

假設您已有一個部署在 permaweb 的應用程式，但您也希望使用特定網域來讓使用者存取該應用（例如 mydomain.com）。要將您的網域連接到 permaweb 應用，有幾種選項；本篇示範的方式稱為伺服器端重新導向（server-side redirect）。此重新導向以反向代理（reverse proxy）方式運作，使用者在瀏覽器中仍會停留於 mydomain.com，但背後實際由 permaweb 來提供應用內容。

::: tip
您可以使用任何反向代理來設定伺服器端重新導向；本指南示範使用 deno 與 deno.com —— 一個輕量的邊緣託管服務。
:::

## 使用 deno.com 設定反向代理所需項目

- 一組 deno.com 帳號（撰寫本文時為免費）
- 可管理 DNS 設定的網域
- 已部署在 permaweb 且有識別碼的 permaweb 應用

## 在 Deno.com 建立代理

Deno Deploy 是一個在邊緣（edge）執行的分散式系統，在全球 35 個區域運行。打開瀏覽器並前往 [https://deno.com](https://deno.com)，若尚無帳號請點選註冊或登入。

點選 `New Project`，然後點選 `Play`

deno 的 playground 允許我們在瀏覽器內直接建立代理，無需離開頁面。

複製以下程式碼：

```ts
import { serve } from "https://deno.land/std/http/mod.ts";

const APP_ID = "YOUR AREWEAVE IDENTIFIER";

const fileService = `https://arweave.net/${APP_ID}`;

// handle requests
async function reqHandler(req: Request) {
  const path = new URL(req.url).pathname;
  // proxy to arweave.net
  return await fetch(fileService + path).then((res) => {
    const headers = new Headers(res.headers);
    // instruct server to leverage the edge cache
    headers.set("cache-control", "s-max-age=600, stale-while-revalidate=6000");

    // return response from arweave.net
    return new Response(res.body, {
      status: res.status,
      headers,
    });
  });
}

// listen for requests
serve(reqHandler, { port: 8100 });
```

此代理伺服器會接收來自 mydomain.com 的請求，將請求代理轉送到 arweave.net/APP_ID，然後以 mydomain.com 的形式回傳響應。您的 APP_ID 即為您 permaweb 應用的 TX_ID 識別碼。

點選 `Save and Deploy`

## 連接到 DNS

在 Project Settings 中前往 domains 區段，點選新增網域。

輸入 `mydomain.com`，並依照指示修改您的 DNS 設定，使其指向 deno deploy 的邊緣網路。

DNS 解析可能需要幾分鐘，但解析完成後，您的應用將開始以 mydomain.com 呈現。

:tada: 恭喜 — 您已將 permaweb 應用發佈為伺服器端重新導向。

::: warning
請注意：任何對應用的變更都會產生新的 TX_ID，因此您需修改對應的 TX_ID 才能將新版本發佈到您的網域上。
:::

## 自動化部署

若您希望自動化 permaweb 應用的新版部署，可參考 GitHub Actions 並使用 deno deploy 的 GitHub Action： [https://github.com/denoland/deployctl/blob/main/action/README.md](https://github.com/denoland/deployctl/blob/main/action/README.md)

## 總結

伺服器端重新導向（反向代理）是為使用者提供可透過網域名稱存取 permaweb 應用的絕佳方案。希望本指南能在您的 permaweb 開發歷程中有所助益！
