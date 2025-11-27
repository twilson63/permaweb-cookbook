# Hello World (코드)

이 가이드는 몇 줄의 코드와 명령줄 인터페이스(CLI)를 사용하여 정적 HTML, CSS, JavaScript 웹페이지를 Permaweb에 빠르게 올리는 방법을 안내합니다.

## 요구 사항

- [NodeJS](https://nodejs.org) LTS 이상
- HTML, CSS, JavaScript에 대한 기본 지식
- 텍스트 편집기(VS Code, Sublime 또는 이와 유사한 것)

## 설정

터미널을 열고 `hello-world`라는 새 폴더를 만듭니다.

새 디렉터리 내부에서 다음 명령을 실행하세요:

```sh
npm init -y
mkdir src && cd src
touch index.js index.html style.css
```

이 작업은 Node 프로젝트를 설정하고 웹사이트를 만들기 위한 기본 파일들을 생성합니다.

## 지갑 생성

파일을 Arweave에 업로드하려면 Arweave 월렛이 필요합니다.

`hello-world` 디렉터리에서 다음 명령을 실행하여 월렛을 생성하세요:

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

:::info
`wallet.json` 파일은 `hello-world` 폴더의 루트에 있어야 하며 `src` 폴더 안에 있으면 안 됩니다.
:::

## 웹페이지 생성

다음으로, 기본 HTML, CSS, JavaScript를 사용하여 스타일이 적용된 버튼을 만들고 버튼을 클릭하면 헤더 텍스트 색상이 변경되는 간단한 웹페이지를 만들어 보겠습니다.

완성되면 `permaweb-deploy`와 앞서 생성한 월렛을 사용하여 완전한 정적 웹페이지를 Arweave에 배포할 것입니다.

다음 코드 블록의 내용을 해당 파일에 붙여넣으세요:

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script src="index.js"></script>
    <title>Cookbook Hello World!</title>
  </head>

  <body>
    <button onclick="changeColor()" class="button">Click Me!</button>
    <h1 id="main">Hello World!</h1>
  </body>
</html>
```

<hr />

### style.css

```css
.button {
  padding: "10px";
  background-color: #4caf50;
}
```

<hr />

### index.js

```javascript
function changeColor() {
  const header = document.getElementById("main");
  header.style.color === ""
    ? (header.style.color = "red")
    : (header.style.color = "");
}
```

<hr />

이제 배포할 정적 사이트가 준비되었으므로, 터미널에서 `open src/index.html`을 입력하여 정상적으로 동작하는지 확인할 수 있습니다.

정상 작동하면 Arweave에 배포할 차례입니다!

## permaweb-deploy를 사용한 업로드

배포를 위해 `permaweb-deploy`를 설치하고 구성합니다:

```bash
npm install --save-dev permaweb-deploy
```

`package.json`에 배포 스크립트를 추가하세요:

```json
{
  "scripts": {
    "deploy": "permaweb-deploy --arns-name my-hello-world --deploy-folder src"
  }
}
```

애플리케이션을 배포합니다:

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npm run deploy
```

자세한 배포 지침은 [Permaweb Deploy](/guides/deployment/permaweb-deploy)를 참조하십시오.

## 축하합니다!

몇 개의 명령과 몇 줄의 코드로 Arweave에 정적 사이트를 성공적으로 게시했습니다!
