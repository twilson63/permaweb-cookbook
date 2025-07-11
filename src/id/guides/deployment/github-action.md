---
locale: id
---

# Github Action

::: danger
Panduan ini hanya untuk tujuan pendidikan, dan Anda harus menggunakannya untuk mempelajari opsi tentang bagaimana Anda mungkin ingin mendistribusikan aplikasi Anda. Dalam panduan ini, kami mempercayai sumber daya pihak ketiga `github` yang dimiliki oleh `microsoft` untuk melindungi informasi rahasia kita, dalam dokumentasi mereka, mereka mengenkripsi rahasia dalam penyimpanan mereka menggunakan `libsodium sealed box`, Anda dapat menemukan informasi lebih lanjut tentang praktik keamanan mereka di sini. https://docs.github.com/en/actions/security-guides/encrypted-secrets
:::

Github Actions adalah pipeline CI/CD yang memungkinkan pengembang memicu tugas-tugas otomatis melalui peristiwa yang dihasilkan dari sistem alur kerja github. Tugas-tugas ini dapat berupa apa saja, dalam panduan ini kami akan menunjukkan bagaimana Anda dapat menggunakan github action untuk mendistribusikan aplikasi Permaweb Anda ke Permaweb menggunakan Irys dan ArNS.

::: tip
Panduan ini memerlukan pemahaman tentang github action, dan Anda harus memiliki beberapa ArNS Test Tokens, kunjungi https://ar.io/arns/ untuk lebih banyak detail.
:::

::: warning
Panduan ini tidak termasuk pengujian atau pemeriksaan lain yang mungkin ingin Anda tambahkan ke alur kerja produksi Anda.
:::

## Buat Skrip Penyebaran

Skrip penyebaran adalah skrip yang melakukan pekerjaan berat dalam mendistribusikan aplikasi Anda, kami akan menggunakan `@irys/sdk` dan `warp-contracts` untuk mempublikasikan aplikasi kami dan mendaftarkan aplikasi yang baru dipublikasikan di ArNS.

Instalasi dependensi penyebaran

```console
npm install --save-dev @irys/sdk
npm install --save-dev warp-contracts
npm install --save-dev arweave
```

Buat file `deploy.mjs`

```js
import Irys from "@irys/sdk";
import { WarpFactory, defaultCacheOptions } from "warp-contracts";
import Arweave from "arweave";

const ANT = "[ANT CONTRACT ANDA]";
const DEPLOY_FOLDER = "./dist";
const IRYS_NODE = "https://node2.irys.xyz";

const arweave = Arweave.init({ host: "arweave.net", port: 443, protocol: "https" });
const jwk = JSON.parse(Buffer.from(process.env.PERMAWEB_KEY, "base64").toString("utf-8"));

const irys = new Irys({ IRYS_NODE, "arweave", jwk });
const warp = WarpFactory.custom(arweave, defaultCacheOptions, "mainnet").useArweaveGateway().build();

const contract = warp.contract(ANT).connect(jwk);
// upload folder
const result = await irys.uploadFolder(DEPLOY_FOLDER, {
	indexFile: "index.html",
});

// update ANT
await contract.writeInteraction({
	function: "setRecord",
	subDomain: "@",
	transactionId: result.id,
});

console.log("Cookbook Tersebar, harap tunggu 20 - 30 menit untuk ArNS memperbarui!");
```

## Tambahkan skrip ke package.json

Buat properti skrip baru bernama `deploy`, panggil skrip build, kemudian panggil `node deploy.mjs` pada nilai properti deploy skrip.

package.json

```json
  ...
  "scripts": {
    "dev": "vitepress dev src",
    "build": "vitepress build src",
    "deploy": "yarn build && node deploy.mjs"
  },
  ...
```

## Buat github action

Buat file `deploy.yml` di folder `.github/workflows`, file ini menginstruksikan github action untuk mendistribusikan ketika peristiwa dorong dipicu di cabang `main`.

```yml
name: publish

on:
    push:
        branches:
            - "main"

jobs:
    publish:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-node@v1
              with:
                  node-version: 18.x
            - run: yarn
            - run: yarn deploy
              env:
                  KEY: ${{ secrets.PERMAWEB_KEY }}
```

## Ringkasan

Di repositori proyek, masuk ke pengaturan dan rahasia, tambahkan rahasia baru ke repositori, rahasia ini akan disebut PERMAWEB_KEY untuk proyek ini. Nilai rahasia harus berupa string yang dienkripsi dalam base64 dari dompet penyebaran.

```console
base64 -i wallet.json | pbcopy
```

Agar penyebaran ini berfungsi, Anda perlu mendanai akun Irys dompet ini, pastikan ada beberapa $AR di dompet yang akan Anda gunakan, tidak banyak, mungkin .5 AR, kemudian gunakan Irys cli untuk mendanai.

```console
irys fund 250000000000 -h https://node2.irys.xyz -w wallet.json -t arweave
```

::: warning
Jaga dompet ini tetap minim dana dan hanya gunakan untuk proyek ini.
:::

:tada: Anda telah mengatur github action untuk sepenuhnya mengotomatisasi penyebaran Anda ke Permaweb!
