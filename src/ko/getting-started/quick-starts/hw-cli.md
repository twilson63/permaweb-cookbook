# 헬로 월드 (CLI)

이 가이드는 명령줄 인터페이스(CLI)를 사용하여 Permaweb에 데이터를 올리는 가장 간단한 방법을 안내합니다.

## 요구사항

- [NodeJS](https://nodejs.org) LTS 이상

## 설정

컴퓨터에서 터미널을 열고 `hello-permaweb`이라는 새 폴더를 만드세요.

그런 다음 `hello-permaweb` 디렉터리로 `cd`한 후 다음으로 새 프로젝트를 설정하세요:

```sh
npm init -y
npm install arweave ardrive-cli
```

## 지갑 생성

```sh
npx -y @permaweb/wallet > ~/.demo-arweave-wallet.json
```

## 웹페이지 생성

```sh
echo "<h1>Hello Permaweb</h1>" > index.html
```

## ArDrive CLI로 업로드

```sh
# Create a Drive
FOLDER_ID=$(npx ardrive create-drive -n public -w ~/.demo-arweave-wallet.json --turbo | jq -r '.created[] | select(.type == "folder") | .entityId')
# Upload file
TX_ID=$(npx ardrive upload-file -l index.html --content-type text/html -w ~/.demo-arweave-wallet.json --turbo -F ${FOLDER_ID} | jq -r '.created[] | select(.type == "file
") | .dataTxId')
# open file from ar.io gateway
open https://arweave.net/${TX_ID}
```

축하합니다 — 데이터를 Arweave에 업로드했습니다!
