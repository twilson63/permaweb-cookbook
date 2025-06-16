---
locale: ja
---
# サーバーサイドDNS統合

あなたのパーマウェブアプリケーションはパーマウェブ上にありますが、ユーザーがこのアプリにアクセスするために使用したい特定のドメイン（mydomain.com）を持っています。このドメインをパーマウェブアプリに接続するためのオプションはいくつかありますが、ここで示すオプションはサーバーサイドリダイレクトと呼ばれます。リダイレクトはリバースプロキシとして行われ、ユーザーはブラウザでmydomain.comのままで、背後ではアプリケーションがパーマウェブから提供されています。

::: tip
任意のリバースプロキシを使用してサーバーサイドリダイレクトを設定できます。このガイドでは、軽量のエッジホスティングサービスであるdenoとdeno.comを使用します。
:::

## deno.comを使用したリバースプロキシの設定に必要なもの

* Deno.comアカウント（この時点では無料です）。
* DNS設定にアクセスできるドメイン。
* パーマウェブにデプロイされたパーマウェブアプリケーションの識別子。

## Deno.comでプロキシを作成する

Deno Deployは、エッジで動作する分散システムです。世界中に35の地域があります。ブラウザを開いて[https://deno.com](https://deno.com)にアクセスし、サインインするか、アカウントを持っていない場合はサインアップします。

`New Project`をクリックし、`Play`をクリックします。

Denoプレイグラウンドでは、ブラウザを離れることなくプロキシを作成できます。

以下のコードをコピーしてください：

```ts
import { serve } from "https://deno.land/std/http/mod.ts";

const APP_ID = "YOUR AREWEAVE IDENTIFIER"

const fileService = `https://arweave.net/${APP_ID}`;

// handle requests
async function reqHandler(req: Request) {
  const path = new URL(req.url).pathname;
  // proxy to arweave.net
  return await fetch(fileService + path).then(res => {
    const headers = new Headers(res.headers)
    // instruct server to leverage the edge cache
    headers.set('cache-control', 's-max-age=600, stale-while-revalidate=6000')

    // return response from arweave.net
    return new Response(res.body, {
      status: res.status,
      headers
    })
  });
}

// listen for requests
serve(reqHandler, { port: 8100 });
```

このプロキシサーバーは、mydomain.comからのリクエストを受信し、そのリクエストをarweave.net/APP_IDにプロキシし、レスポンスをmydomain.comとして返します。あなたのAPP_IDは、パーマウェブアプリケーションのTX_ID識別子です。

`Save and Deploy`をクリックします。

## DNSへの接続

プロジェクト設定でドメインセクションに移動し、ドメインを追加するためのクリックします。

`mydomain.com`ドメインを入力し、DNS設定を変更してdeno deployエッジネットワークを指すようにする手順に従います。

DNSが解決されるまで数分かかることがありますが、一旦解決されれば、アプリはmydomain.comからレンダリングされます。

:tada: おめでとうございます！あなたのパーマウェブアプリケーションへのサーバーサイドリダイレクトを公開しました。

::: warning
アプリケーションの変更は新しいTX_IDを生成し、そのTX_IDを変更して新しい変更をドメインに公開する必要があることに注意してください。
:::

## デプロイの自動化

パーマウェブアプリの新しいデプロイを自動化したい場合は、GitHub Actionsとdeno deploy GitHub Actionの使用を検討してください: [https://github.com/denoland/deployctl/blob/main/action/README.md](https://github.com/denoland/deployctl/blob/main/action/README.md)

## まとめ

サーバーサイドリダイレクトは、ユーザーにドメイン名システムのURLを提供してパーマウェブアプリケーションにアクセスさせるのに優れています。このガイドがあなたのパーマウェブ開発の旅に役立つことを願っています！