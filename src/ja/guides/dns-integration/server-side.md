# サーバーサイド DNS 統合

permaweb アプリケーションが permaweb 上にあり、ユーザーに特定のドメイン（例: mydomain.com）でこのアプリにアクセスさせたい場合、ドメインを permaweb アプリに接続するためのいくつかのオプションがあります。本ガイドで示すオプションは「サーバーサイドリダイレクト」と呼ばれるものです。リダイレクトはリバースプロキシとして動作するため、ユーザーのブラウザは mydomain.com のままで、裏側ではアプリケーションが permaweb から配信されます。

::: tip
任意のリバースプロキシを使用してサーバーサイドリダイレクトを設定できます。本ガイドでは deno と deno.com を使用します。deno.com は軽量なエッジホスティングサービスです。
:::

## deno.com を使用してリバースプロキシを設定するために必要なもの

- 無料で利用できる deno.com アカウント（執筆時点で無料）
- DNS 設定にアクセスできるドメイン
- permaweb アプリケーションの識別子（permaweb にデプロイされていること）

## Deno.com でプロキシを作成する

Deno Deploy はエッジで動作する分散システムです。世界中に 35 のリージョンがあります。ブラウザで [https://deno.com](https://deno.com) を開き、アカウントをお持ちでなければサインインまたはサインアップしてください。

`New Project` をクリックし、`Play` をクリックします。

deno のプレイグラウンドでは、ブラウザを離れることなくプロキシを作成できます。

以下のコードをコピーしてください：

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

このプロキシサーバーは mydomain.com からのリクエストを受け取り、arweave.net/APP_ID にプロキシし、そのレスポンスを mydomain.com として返します。Your APP_ID はあなたの permaweb アプリケーションの TX_ID 識別子です。

`Save and Deploy` をクリックしてください。

## DNS の接続

Project Settings の domains セクションに移動し、ドメインを追加してください。

`mydomain.com` を入力し、deno deploy のエッジネットワークを指すように DNS 設定を変更する手順に従ってください。

DNS に反映されるまで数分かかる場合があります。反映されると、あなたのアプリは mydomain.com からレンダリングされます。

:tada: おめでとうございます。permaweb アプリケーションへのサーバーサイドリダイレクトを公開できました。

::: warning
アプリケーションに変更を加えると新しい TX_ID が生成されます。その場合、ドメインに公開するためにその TX_ID を更新する必要があることに注意してください。
:::

## デプロイの自動化

permaweb アプリの新しいデプロイを自動化したい場合は、GitHub Actions と deno deploy 用の GitHub Action を検討してください: [https://github.com/denoland/deployctl/blob/main/action/README.md](https://github.com/denoland/deployctl/blob/main/action/README.md)

## まとめ

サーバーサイドリダイレクトは、ユーザーに対してドメイン名（DNS）経由で permaweb アプリケーションへアクセスさせるのに最適な方法です。本ガイドがあなたの permaweb 開発の旅に役立つことを願っています！
