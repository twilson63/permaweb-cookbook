---
locale: id
---

# Membaca dari Fungsi Tanpa Server dengan SDK Execution Machine

Ada dua cara untuk membaca status dari fungsi tanpa server EXM. Seperti yang dijelaskan dalam [pengantar](../intro.md#serverless-functions-on-arweave), EXM menyimpan salinan fungsi pada lapisan cache untuk melayani aplikasi dengan cepat tetapi juga mengunggah fungsi ke Arweave untuk menjaga desentralisasi dan manfaat yang terkait dengannya. Akibatnya, status fungsi dapat dibaca baik dari lapisan cache EXM maupun langsung dari Arweave.

1. Membaca dari lapisan cache EXM:

Panggilan baca membaca status terbaru seperti yang disimpan pada lapisan cache EXM. Lapisan ini dirancang khusus untuk melayani aplikasi dengan cepat. Ini mengambil pendekatan optimis dan memperbarui status fungsi segera setelah menerima permintaan transaksi.

<CodeGroup>
  <CodeGroupItem title="read.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// init new EXM instance
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// read from cached layer
const readResult = await exm.functions.read(functionId);
console.log(readResult);
```

  </CodeGroupItem>
</CodeGroup>

2. Membaca langsung dari Arweave (Evaluasi):

Panggilan evaluasi mengembalikan status terbaru yang berhasil diproses di Arweave. Status terbaru ini dihitung dengan [evaluasi malas](../intro.md#how-does-it-work-in-the-background), yang mengevaluasi status awal dan interaksi dengan fungsi dalam urutan kejadian untuk sampai pada status terbaru.

<CodeGroup>
  <CodeGroupItem title="evaluate.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// init new EXM instance
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// evaluate from arweave
const evalResult = await exm.functions.evaluate(functionId);
console.log(evalResult);
```

  </CodeGroupItem>
</CodeGroup>

::: tip
Membaca dari Arweave direkomendasikan hanya untuk tujuan verifikasi. Status fungsi yang dikembalikan dari panggilan evaluasi dapat diperiksa dengan informasi yang dikembalikan oleh lapisan cache untuk memastikan keasliannya. Mungkin ada sedikit keterlambatan dalam pengiriman permintaan transaksi dan pembaruan di jaringan.
:::