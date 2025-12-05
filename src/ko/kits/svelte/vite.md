# Svelte/Vite 스타터 키트

Svelte는 빌드 후 런타임에 코드가 남지 않는 컴파일러 기반 프레임워크로, 결과물이 작은 패키지로 나와 permaweb에 매우 적합합니다. 개발자로서 우리는 사용자 경험(UX)만큼이나 개발자 경험(DX)을 중요하게 생각합니다. 이 킷은 `vite` 번들 시스템을 사용하여 개발자에게 우수한 DX 경험을 제공합니다.

## Svelte와 TypeScript로 vite 설치하기

<CodeGroup>
  <CodeGroupItem title="NPM v6">

```console
npm create vite@latest my-perma-app --template svelte-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="NPM v7">

```console
npm create vite@latest my-perma-app -- --template svelte-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn create vite my-perma-app --template svelte-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="PNPM">

```console
pnpm create vite my-perma-app --template svelte-ts
```

  </CodeGroupItem>
</CodeGroup>

## 프로젝트 정보

vite 빌드 시스템은 프로젝트 루트에 index.html 파일을 배치합니다. 필요하다면 이 파일에 CSS나 전역 스크립트 의존성을 포함하면 됩니다. vite 프로젝트 레이아웃에 대한 자세한 내용은 [vite 문서](https://vitejs.dev/guide/#index-html-and-project-root)를 참조하세요.

## 해시 라우터 설정하기

해시 라우터를 설정하기 위해 [tinro](https://github.com/AlexxNB/tinro)를 사용합니다. `tinro`는 React Router와 유사한 작고 선언적인 라우팅 라이브러리입니다.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install --save-dev tinro
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add -D tinro
```

  </CodeGroupItem>
</CodeGroup>

## Svelte에 해시 라우팅 사용 지시하기

`src/App.svelte` 파일에서 라우터를 해시 라우팅 모드로 구성해야 합니다.

```html
<script lang="ts">
  import { Route, router } from "tinro";
  router.mode.hash();
  router.subscribe((_) => window.scrollTo(0, 0));
</script>
<main></main>
```

`router.mode.hash` 함수는 해시 라우터 모드를 활성화합니다.
`router.subscribe` 콜백은 페이지 전환 시 페이지를 맨 위로 리셋하는 데 유용합니다.

## 전환(트랜지션) 컴포넌트 추가하기

이 컴포넌트들은 라우팅 시 한 페이지에서 다른 페이지로 전환할 때 전환 효과를 관리합니다.

`src` 디렉터리 아래에 components라는 디렉터리를 만들고 다음 두 파일을 추가하세요.

### announcer.svelte

```html
<script>
  import { router } from "tinro";
  $: current = $router.path === "/" ? "Home" : $router.path.slice(1);
</script>

<div aria-live="assertive" aria-atomic="true">
  {#key current} Navigated to {current} {/key}
</div>

<style>
  div {
    position: absolute;
    left: 0;
    top: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
    width: 1px;
    height: 1px;
  }
</style>
```

> 이 컴포넌트는 화면 읽기 도구(screen readers)가 페이지 변경을 알릴 때 사용됩니다

### transition.svelte

```html
<script>
  import { router } from "tinro";
  import { fade } from "svelte/transition";
</script>

{#key $router.path}
  <div in:fade={{ duration: 700 }}>
    <slot />
  </div>
{/key}
```

> 이 컴포넌트는 페이지 전환에 페이드 효과를 추가합니다

## 앱에 라우트 추가하기

```html
<script lang="ts">
  ...
  import Announcer from "./components/announcer.svelte";
  import Transition from "./components/transition.svelte";
  ...
</script>
<Announcer />
<Transition>
  <Route path="/">
    <Home />
  </Route>
  <Route path="/about">
    <About />
  </Route>
</Transition>
```

Announcer와 Transition 컴포넌트를 라우팅 시스템에 추가하면 페이지 전환을 알리고 전환 애니메이션을 처리할 수 있습니다.

## 페이지 생성하기

### home.svelte

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
<a href="/about">About</a>
```

### about.svelte

```html
<h1>About Page</h1>
<p>Svelte/Vite About Page</p>
<a href="/">Home</a>
```

### `App.svelte` 수정하기

```html
<script lang="ts">
  ...
  import Home from './home.svelte'
  import About from './about.svelte'
</script>
...
```

## 영구 배포(Deploy)하기

### 지갑 생성

지갑을 생성하려면 `arweave` 패키지가 필요합니다.

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

그런 다음 터미널에서 다음 명령을 실행하세요.

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 지갑에 자금 추가하기 (Fund Wallet)

지갑에는 ArDrive Turbo 크레딧으로 자금을 충전해야 합니다. 이를 위해 [ArDrive](https://app.ardrive.io)에 접속하여 지갑을 가져온 다음, 해당 지갑에 대해 Turbo 크레딧을 구매하세요.

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
<< ANT-PROCESS >>를 실제 ANT 프로세스 ID로 교체하세요.
:::

### 빌드 실행

이제 빌드를 생성할 차례입니다. 다음을 실행하세요.

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

마지막으로 Permaweb 애플리케이션을 배포합니다.

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
`Insufficient funds` 오류가 발생하면 배포용 지갑에 ArDrive Turbo 크레딧을 충전했는지 확인하세요.
:::

### 응답

다음과 유사한 응답을 확인할 수 있습니다:

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

당신의 Svelte 앱은 `https://arweave.net/<< tx-id >>`에서 확인할 수 있습니다.

::: tip SUCCESS
이제 Permaweb에 Svelte 애플리케이션을 배포했습니다! 잘하셨습니다!
:::

## 요약

이는 Svelte 애플리케이션을 permaweb에 게시하는 최소한의 절차입니다. 핫 리로딩, Tailwind 등의 기능을 더 원할 수 있습니다. 턴키 스타터 킷을 원한다면 `hypar`를 확인하세요. [HypAR](https://github.com/twilson63/hypar)
