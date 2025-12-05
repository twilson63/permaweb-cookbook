# Minimal Svelte Starter Kit

이 가이드는 permaweb 애플리케이션을 빌드하고 배포하기 위해 개발 환경을 단계별로 구성하는 방법을 안내합니다.

## 전제 조건

- TypeScript를 알고 있어야 합니다
- NodeJS v18 이상
- Svelte를 알고 있어야 합니다 - [https://svelte.dev](https://svelte.dev)
- git 및 일반 터미널 명령어를 알고 있어야 합니다

## 개발 의존성

- TypeScript
- esbuild
- w3

## 단계

### 프로젝트 생성

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
mkdir myproject
cd myproject
npm init -y
npm install -D svelte esbuild typescript esbuild-svelte tinro svelte-preprocess
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
mkdir myproject
cd myproject
yarn init -y
yarn add -D svelte esbuild typescript esbuild-svelte tinro svelte-preprocess
```

  </CodeGroupItem>
</CodeGroup>

## buildscript.js 생성

```js
import fs from "fs";
import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

//make sure the directoy exists before stuff gets put into it
if (!fs.existsSync("./dist/")) {
  fs.mkdirSync("./dist/");
}
esbuild
  .build({
    entryPoints: [`./src/main.ts`],
    bundle: true,
    outdir: `./dist`,
    mainFields: ["svelte", "browser", "module", "main"],
    // logLevel: `info`,
    splitting: true,
    write: true,
    format: `esm`,
    plugins: [
      esbuildSvelte({
        preprocess: sveltePreprocess(),
      }),
    ],
  })
  .catch((error, location) => {
    console.warn(`Errors: `, error, location);
    process.exit(1);
  });

//use a basic html file to test with
fs.copyFileSync("./index.html", "./dist/index.html");
```

## package.json 수정

`type`을 `module`로 설정하고 build 스크립트를 추가하세요

```json
{
  "type": "module"
  ...
  "scripts": {
    "build": "node buildscript.js"
  }
}
```

## `src` 디렉터리 및 소스 파일 생성

```sh
mkdir src
touch src/main.ts
touch src/app.svelte
touch src/counter.svelte
touch src/about.svelte
```

### Main.ts

```ts
import App from "./app.svelte";

new App({
  target: document.body,
});
```

### app.svelte

```html
<script lang="ts">
  import { Route, router } from "tinro";
  import Counter from "./counter.svelte";
  import About from "./about.svelte";

  // add hash routing for permaweb support
  router.mode.hash();
</script>
<nav><a href="/">Home</a> | <a href="/about">About</a></nav>
<Route path="/"><Counter /></Route>
<Route path="/about"><About /></Route>
```

::: info Hash Routing
스크립트 섹션에서 `router.mode.hash()` 설정을 볼 수 있습니다. 이는 해시 기반 라우팅을 사용하도록 애플리케이션을 구성하는 데 중요하며, `https://[gateway]/[TX]`와 같은 경로에서 애플리케이션을 실행할 때 URL 지원을 가능하게 합니다.
:::

### counter.svelte

```html
<script lang="ts">
  let count = 0;

  function inc() {
    count += 1;
  }
</script>
<h1>Hello Permaweb</h1>
<button on:click="{inc}">Inc</button>
<p>Count: {count}</p>
```

### about.svelte

```html
<h1>About Page</h1>
<p>Minimal About Page</p>
<a href="/">Home</a>
```

## index.html 추가

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Svelte + TS</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

## 영구 배포 (Deploy Permanently)

### 지갑 생성

지갑을 생성하려면 `arweave` 패키지가 필요합니다

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add arweave -D
```

  </CodeGroupItem>
</CodeGroup>

그런 다음 터미널에서 다음 명령을 실행하세요

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 지갑 충전 (Fund Wallet)

지갑에 ArDrive Turbo 크레딧을 충전해야 합니다. 이를 위해 [ArDrive](https://app.ardrive.io)에 접속해 지갑을 가져오세요.
그런 다음 지갑에 대한 turbo 크레딧을 구매할 수 있습니다.

### Permaweb-Deploy 설정

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install --global permaweb-deploy
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn global add permaweb-deploy
```

  </CodeGroupItem>
</CodeGroup>

### vite.config.ts 업데이트

```ts
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  base: "./",
});
```

### package.json 업데이트

```json
{
  ...
  "scripts": {
    ...
    "deploy": "DEPLOY_KEY=$(base64 -i wallet.json) permaweb-deploy --ant-process << ANT-PROCESS >> --deploy-folder build"
  }
  ...
}
```

::: info
<< ANT-PROCESS >> 를 실제 ANT 프로세스 ID로 교체하세요.
:::

### 빌드 실행

이제 빌드를 생성할 시간입니다, 다음을 실행하세요

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm run build
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn build
```

  </CodeGroupItem>
</CodeGroup>

### 배포 실행

마지막으로 첫 번째 Permaweb 애플리케이션을 배포합니다

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm run deploy
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn deploy
```

  </CodeGroupItem>
</CodeGroup>

::: info ERROR
만약 `Insufficient funds` 오류가 발생하면, 배포 지갑에 ArDrive Turbo 크레딧을 충전했는지 확인하세요.
:::

### 응답

다음과 유사한 응답을 볼 수 있습니다:

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

Svelte 앱은 `https://arweave.net/<< tx-id >>`에서 확인할 수 있습니다.

::: tip SUCCESS
이제 Permaweb에 Svelte 애플리케이션이 게시되었습니다! 잘하셨습니다!
:::

## 요약

이는 permaweb에 Svelte 애플리케이션을 게시하는 최소한의 방법입니다. 핫 리로딩, Tailwind 등 더 많은 기능이 필요할 수 있습니다. 즉시 사용 가능한 스타터 킷을 원하면 `hypar`를 확인하세요. [HypAR](https://github.com/twilson63/hypar)
