---
locale: id
---

# SDK Execution Machine

SDK JavaScript memungkinkan penggunaan Execution Machine (EXM) dalam aplikasi JavaScript dan TypeScript. Untuk menggunakan SDK, langkah-langkah pengaturan berikut diperlukan.

## Instalasi

Untuk menginstal EXM dalam proyek Anda, Anda dapat menggunakan `npm` atau `yarn`.

<CodeGroup>
  <CodeGroupItem title="npm">

```bash
npm install @execution-machine/sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="yarn">

```bash
yarn add @execution-machine/sdk
```

  </CodeGroupItem>
</CodeGroup>

## Impor

Saat menggunakan EXM dengan proyek Anda, paket harus diimpor sebagai berikut.

<CodeGroup>
  <CodeGroupItem title="JavaScript">

```js
import { Exm } from '@execution-machine/sdk';
```
  </CodeGroupItem>
</CodeGroup>

## Membuat Instance

Untuk berinteraksi dengan EXM setelah instalasi dan impor, sebuah instance harus dibuat.

<CodeGroup>
  <CodeGroupItem title="JavaScript">

```js
const exmInstance = new Exm({ token: 'MY_EXM_TOKEN' });
```
  </CodeGroupItem>
</CodeGroup>

## Ringkasan

Panduan-panduan berikut akan menunjukkan cara mendeploy fungsi tanpa server menggunakan EXM JS SDK, dan bagaimana berinteraksi dengan mereka.