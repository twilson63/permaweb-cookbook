---
locale: zh
---
# 服务器端DNS集成

所以你有一个永久网(permaweb)应用，并且它在永久网(permaweb)上，但你也有一个特定的域名，你希望用户使用该域名来访问此应用。mydomain.com，为了将你的域名连接到永久网(permaweb)应用，你有几个选择，我们将在这里展示的选项被称为服务器端重定向。重定向发生在反向代理中，以便用户在他们的浏览器中仍然停留在mydomain.com，而应用则是从永久网(permaweb)上提供服务。

::: tip
您可以使用任何反向代理来设置服务器端重定向，在本指南中，我们将使用Deno和deno.com作为一个轻量级的边缘托管服务。
:::

## 设置反向代理的所需材料使用Deno.com

* 一个Deno.com帐户，在写作本文时是免费的。
* 一个具有访问DNS设置的域名
* 一个永久网(permaweb)应用的标识符并且已经部署在永久网(permaweb)上

## 在Deno.com上创建代理

Deno Deploy是一个分布式系统，在全球有35个地区。将浏览器打开到[https://deno.com](https://deno.com)，然后点击登录或注册，如果您没有帐户。

点击`新项目`，然后点击`Play`

Deno Playground将允许我们在不离开浏览器的情况下创建一个代理。

复制以下代码：

```ts
import { serve } from "https://deno.land/std/http/mod.ts";

const APP_ID = "你的Arweave应用标识符"

const fileService = `https://arweave.net/${APP_ID}`;

// 处理请求
async function reqHandler(req: Request) {
  const path = new URL(req.url).pathname;
  // 代理到arweave.net
  return await fetch(fileService + path).then(res => {
    const headers = new Headers(res.headers)
    // 指示服务器利用边缘缓存
    headers.set('cache-control', 's-max-age=600, stale-while-revalidate=6000')

    // 返回arweave.net的响应
    return new Response(res.body, {
      status: res.status,
      headers
    })
  });
}

// 监听请求
serve(reqHandler, { port: 8100 });
```

该代理服务器将接收来自mydomain.com的请求，并将请求代理到arweave.net/APP_ID，然后将响应作为mydomain.com返回。你的APP_ID是你永久网(permaweb)应用的TX_ID标识符。

点击`保存并部署`

## 连接到DNS

在项目设置中，进入域部分，然后点击添加域。

输入`mydomain.com`域名，然后根据说明修改你的DNS设置，将其指向Deno Deploy边缘网络。

可能需要几分钟才能解析到DNS，但一旦解析成功，你的应用将从mydomain.com渲染。

:tada: 祝贺你已经发布了一个服务器端重定向到你的永久网(permaweb)应用。

::: warning
请注意，对应用的任何更改将生成一个新的TX_ID，您需要修改该TX_ID以将新更改发布到您的域名。
:::

## 自动化部署

如果你想要自动部署你的永久网(permaweb)应用的新版本，请查看GitHub Actions，并使用Deno Deploy GitHub Action：[https://github.com/denoland/deployctl/blob/main/action/README.md](https://github.com/denoland/deployctl/blob/main/action/README.md)


## 总结

服务器端重定向非常适合为用户提供域名系统 URL 以访问你的永久网(permaweb)应用。我们希望你在永久网(permaweb)开发之旅中找到这个指南有用！