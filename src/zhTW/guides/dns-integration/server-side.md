# 伺服器端 DNS 整合

假設你有一個 permaweb 應用並已部署到 permaweb，但你也有一個希望使用者透過該網域存取此應用的專屬網域（例如 mydomain.com）。要將你的網域連接到 permaweb 應用，有幾種選項；本指南示範的這個選項稱為伺服器端重新導向（server-side redirect）。此重新導向以反向代理的方式運作，使用者在瀏覽器中會停留於 mydomain.com，但幕後的應用程式內容從 permaweb 提供。

::: tip
你可以使用任何反向代理來設定伺服器端重新導向，在本指南我們將使用 deno 與 deno.com — 一個輕量的邊緣託管服務。
:::

## 使用 deno.com 設定反向代理所需項目

- 一個 deno.com 帳號（撰寫本文時為免費）。
- 一個可存取 DNS 設定的網域
- permaweb 應用的識別碼，且該應用已部署到 permaweb

## 在 Deno.com 建立代理

Deno Deploy 是在邊緣運行的分散式系統，遍及 35 個地區。開啟瀏覽器至 [https://deno.com](https://deno.com)，如果沒有帳號請點選登入或註冊。

點選 `New Project`，然後點選 `Play`

deno playground 允許我們在瀏覽器內建立代理，無需離開。

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

這個代理伺服器會接收來自 mydomain.com 的請求，並將請求代理轉發到 arweave.net/APP_ID，然後以 mydomain.com 的名義回傳回應。你的 APP_ID 就是你 permaweb 應用的 TX_ID。

點選 `Save and Deploy`

## 連接到 DNS

在 Project Settings 中前往 domains 區段，然後點選新增網域。

輸入 `mydomain.com`，並依指示修改你的 DNS 設定，使之指向 deno deploy 的邊緣網路。

DNS 生效可能需要幾分鐘，但一旦解析完成，你的應用就會以 mydomain.com 呈現。

:tada: 恭喜，你已將 permaweb 應用透過伺服器端重新導向發佈。

::: warning
請注意，對應用所做的任何變更都會產生新的 TX_ID，你需要更新該 TX_ID 才能將新變更發佈到你的網域。
:::

## 自動化部署

如果你想自動化 permaweb 應用的新部署，可以參考 GitHub Actions 及使用 deno deploy 的 GitHub Action： [https://github.com/denoland/deployctl/blob/main/action/README.md](https://github.com/denoland/deployctl/blob/main/action/README.md)

## 摘要

伺服器端重新導向非常適合提供使用者一個網域名稱（DNS URL）來存取你的 permaweb 應用。希望本指南對你的 permaweb 開發之旅有所助益！
