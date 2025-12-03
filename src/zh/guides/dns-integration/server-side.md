# 服务器端 DNS 集成

假设您已有一个部署在 permaweb 的应用，但您也希望使用特定域名让用户访问该应用（例如 mydomain.com）。要将您的域名连接到 permaweb 应用，有几种选项；本文示范的方式称为服务器端重定向（server-side redirect）。此重定向以反向代理（reverse proxy）方式运作，用户在浏览器中仍会停留于 mydomain.com，但背后实际由 permaweb 提供应用内容。

::: tip
您可以使用任何反向代理来设置服务器端重定向；本指南示范使用 deno 与 deno.com —— 一个轻量的边缘托管服务。
:::

## 使用 deno.com 设置反向代理所需项

- 一组 deno.com 帐号（撰写本文时为免费）
- 可管理 DNS 设置的域名
- 已部署在 permaweb 且有识别码的 permaweb 应用

## 在 Deno.com 建立代理

Deno Deploy 是一个在边缘（edge）执行的分布式系统，在全球 35 个区域运行。打开浏览器并前往 [https://deno.com](https://deno.com)，若尚无帐号请点击注册或登入。

点击 `New Project`，然后点击 `Play`

Deno 的 playground 允许我们在浏览器内直接创建代理，无需离开页面。

复制以下程式码：

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

此代理服务器会接收来自 mydomain.com 的请求，将请求代理转发到 arweave.net/APP_ID，然后以 mydomain.com 的形式返回响应。您的 APP_ID 即为您 permaweb 应用的 TX_ID 识别码。

点击 `Save and Deploy`

## 连接到 DNS

在 Project Settings 中前往 domains 区段，点击新增域名。

输入 `mydomain.com`，并按照指示修改您的 DNS 设置，使其指向 deno deploy 的边缘网络。

DNS 解析可能需要几分钟，但解析完成后，您的应用将开始以 mydomain.com 呈现。

:tada: 恭喜 — 您已将 permaweb 应用发布为服务器端重定向。

::: warning
请注意：任何对应用的更改都会产生新的 TX_ID，因此您需修改对应的 TX_ID 才能将新版本发布到您的域名上。
:::

## 自动化部署

如果您希望自动化 permaweb 应用的新版本部署，可参考 GitHub Actions 并使用 deno deploy 的 GitHub Action： [https://github.com/denoland/deployctl/blob/main/action/README.md](https://github.com/denoland/deployctl/blob/main/action/README.md)

## 总结

服务器端重定向（反向代理）是为用户提供通过域名访问 permaweb 应用的绝佳方案。希望本指南能在您的 permaweb 开发过程中有所帮助！
