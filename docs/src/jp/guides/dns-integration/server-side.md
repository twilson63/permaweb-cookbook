---
locale: jp
---
# サーバーサイドDNS統合

あなたはパーマウェブアプリケーションを持っており、それがパーマウェブ上にありますが、特定のドメインを使用してこのアプリにアクセスすることをユーザーに求めたい場合があります。mydomain.comを、ドメインをパーマウェブアプリケーションに接続するためのいくつかのオプションがあります。ここでは、リバースプロキシと呼ばれるオプションを紹介します。このリダイレクトは、ユーザーがブラウザ上でmydomain.comに残りながら、裏側ではアプリケーションがパーマウェブから提供されるようになります。

::: tip
リバースプロキシを設定するためには、どのリバースプロキシでも使用できます。このガイドでは、軽量なエッジホスティングサービスであるdenoとdeno.comを使用します。
:::

## deno.comを使用してリバースプロキシを設定するために必要なもの

* 無料であるこの執筆時点でのdeno.comのアカウント
* DNS設定にアクセスできるドメイン
* パーマウェブアプリケーションの識別子とパーマウェブに展開されているもの

## Deno.comでプロキシを作成する

Deno Deployは、エッジで実行される分散システムです。世界中の35か所に展開されています。ブラウザを[https://deno.com](https://deno.com)に開き、アカウントがない場合はサインインまたはサインアップをクリックしてください。

「新しいプロジェクト」をクリックし、「実行」をクリックします。

Denoプレイグラウンドを使用してブラウザを離れずにプロキシを作成できます。

以下のコードをコピーしてください：

```ts
import { serve } from "https://deno.land/std/http/mod.ts";

const APP_ID = "YOUR AREWEAVE IDENTIFIER";

const fileService = `https://arweave.net/${APP_ID}`;

// handle requests
async function reqHandler(req: Request) {
  const path = new URL(req.url).pathname;
  // proxy to arweave.net
  return await fetch(fileService + path).then(res => {
    const headers = new Headers(res.headers);
    // instruct server to leverage the edge cache
    headers.set('cache-control', 's-max-age=600, stale-while-revalidate=6000')

    // return response from arweave.net
    return new Response(res.body, {
      status: res.status,
      headers
    });
  });
}

// listen for requests
serve(reqHandler, { port: 8100 });
```

このプロキシサーバーは、mydomain.comからのリクエストを受け取り、リクエストをarweave.net/APP_IDにプロキシし、その応答をmydomain.comから返します。ここでのAPP_IDはパーマウェブアプリケーションのTX_ID識別子です。

「保存して展開」をクリックしてください。

## DNSへの接続

プロジェクトの設定で、ドメインセクションに移動し、ドメインを追加するためにクリックしてください。

`mydomain.com`ドメインを入力し、DNS設定を変更してdenoデプロイエッジネットワークに向けるための手順に従ってください。

DNSに解決するまで数分かかる場合がありますが、解決されたらアプリはmydomain.comからレンダリングされるようになります。

:tada: おめでとうございます！ サーバーサイドリダイレクトをパーマウェブアプリケーションに公開しました。

::: warning
アプリケーションの変更は新しいTX_IDを生成し、そのTX_IDをドメインに公開する必要があることに注意してください。
:::

## デプロイの自動化

Permawebアプリの新しいデプロイを自動化したい場合は、githubのアクションを調べて、deno deploy githubアクションの使用を検討してください：[https://github.com/denoland/deployctl/blob/main/action/README.md](https://github.com/denoland/deployctl/blob/main/action/README.md)

## 要約

サーバーサイドリダイレクトは、ユーザーにパーマウェブアプリケーションにアクセスするためのドメイン名システムURLを提供するために非常に便利です。このガイドがパーマウェブ開発の旅で役立つことを願っています！