# 서버사이드 DNS 통합

당신의 permaweb 애플리케이션이 퍼마웹에 배포되어 있지만, 사용자가 이 앱에 접속할 때 특정 도메인(예: mydomain.com)을 사용하도록 연결하고 싶을 수 있습니다. 도메인을 permaweb 애플리케이션에 연결하는 방법은 여러 가지가 있으며, 이 가이드에서 보여드리는 방법은 서버 측 리디렉션(server-side redirect)이라고 하는 방식입니다. 이 리디렉션은 리버스 프록시로 동작하므로 사용자는 브라우저에서 mydomain.com에 머물게 되고, 백엔드에서는 permaweb에서 애플리케이션이 제공됩니다.

::: tip
어떤 리버스 프록시든 서버 측 리디렉션 설정에 사용할 수 있습니다. 이 가이드에서는 가볍고 엣지 호스팅 서비스인 deno와 deno.com을 사용합니다.
:::

## deno.com을 사용해 리버스 프록시를 설정하는 데 필요한 것

- 작성 시점 기준으로 무료인 deno.com 계정
- DNS 설정에 접근 가능한 도메인
- permaweb 애플리케이션 식별자(배포된 상태)

## Deno.com에 프록시 생성

Deno Deploy는 엣지에서 실행되는 분산 시스템입니다. 전 세계 35개 리전에서 동작합니다. 브라우저에서 [https://deno.com](https://deno.com)을 열고 계정이 없다면 로그인 또는 가입을 진행하세요.

`New Project`를 클릭하고 `Play`를 클릭하세요.

deno 플레이그라운드는 브라우저를 떠나지 않고도 프록시를 생성할 수 있게 해줍니다.

다음 코드를 복사하세요:

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

이 프록시 서버는 mydomain.com으로 들어오는 요청을 수신하여 arweave.net/APP_ID로 프록시하고, 그 응답을 mydomain.com으로 반환합니다. 당신의 APP_ID는 당신의 permaweb 애플리케이션에 대한 TX_ID 식별자입니다.

`Save and Deploy`를 클릭하세요.

## DNS 연결

프로젝트 설정(Project Settings)에서 도메인 섹션으로 이동해 도메인을 추가하세요.

도메인으로 `mydomain.com`을 입력하고 deno 배포 엣지 네트워크를 가리키도록 DNS 설정을 수정하라는 안내를 따르세요.

DNS가 해결(resolution)되는 데 몇 분 정도 걸릴 수 있지만, 완료되면 이제 당신의 앱이 mydomain.com에서 렌더링됩니다.

:tada: 축하합니다 — permaweb 애플리케이션에 대해 서버 측 리디렉션을 퍼블리시했습니다.

::: warning
애플리케이션에 대한 변경사항이 발생하면 새로운 TX_ID가 생성되며, 도메인에 변경 사항을 반영하려면 해당 TX_ID를 업데이트해야 합니다.
:::

## 배포 자동화

permaweb 앱의 신규 배포를 자동화하려면 GitHub Actions와 deno deploy GitHub 액션을 살펴보세요: [https://github.com/denoland/deployctl/blob/main/action/README.md](https://github.com/denoland/deployctl/blob/main/action/README.md)

## 요약

서버 측 리디렉션은 사용자가 도메인 이름(URL)을 통해 permaweb 애플리케이션에 접근하도록 제공하기에 적합합니다. 본 가이드가 여러분의 permaweb 개발 여정에 도움이 되었기를 바랍니다!
