---
locale: id
---

# Menulis ke Fungsi Tanpa Server dengan SDK Execution Machine

Setelah suatu fungsi dideploy, statusnya dapat diperbarui dengan bantuan interaksi tulis. Karena arsitektur unik fungsi tanpa server EXM, logika untuk memperbarui status disimpan bersama dengan status itu sendiri, dan keduanya dapat dirujuk menggunakan `functionId` yang sama. Fungsi dapat memiliki satu operasi atau beberapa operasi untuk memperbarui status sesuai dengan kebutuhan aplikasi, dan argumen untuk panggilan tulis berbeda sesuai dengan itu.

<details>
<summary><strong>Logika Fungsi dan Contoh Tulis yang Sesuai</strong></summary>

- <strong>Contoh fungsi dengan operasi tunggal untuk memperbarui status:</strong>

Fungsi berikut menambahkan nama ke array pengguna:

```js
export async function handle(state, action) {
    state.users.push(action.input.name);
    return { state };
}
```

Status diperbarui oleh baris berikut:

```js
state.users.push(action.input.name);
```

Dalam kasus ini, panggilan tulis hanya memerlukan pasangan nilai kunci `name` sebagai input:

```js
const inputs = [{ name: 'Open Sourcerer' }];
```

- <strong>Contoh fungsi dengan beberapa operasi untuk memperbarui status:</strong>

Fungsi berikut membuat posting tetapi juga memiliki kemampuan untuk memperbarui atau menghapus posting ini:

```js
export async function handle(state, action) {
  const { input } = action
  if (input.type === 'createPost' || input.type === 'updatePost') {
    state.posts[input.post.id] = input.post
  }
  if (input.type === 'deletePost') {
    delete state.posts[input.postId]
  }
  return { state }
}
```

Posting adalah objek dengan format berikut:

```js
post: {
  id: string
  title: string
  content: string
  author: string
}
```

Kami memberikan setiap posting sebuah `id` yang unik sehingga kami dapat merujuk kepadanya untuk memperbarui atau menghapus. Jika tidak ada `id` yang sesuai, maka posting baru akan dibuat.

Namun, seperti yang dapat dilihat dalam fungsi di atas, logika fungsi ini memiliki kemampuan untuk melakukan beberapa operasi dan oleh karena itu `type` untuk masing-masing telah diberi nama. Nama ini harus dilewatkan sebagai input bersama dengan posting atau id untuk melakukan panggilan tulis yang sesuai. Untuk memperbarui suatu posting, input untuk panggilan tulis akan terlihat seperti berikut:

```js
const inputs = [{
  type: 'updatePost',
  post: {
    id,
    title: "My Post",
    content: "My updated post",
    author: "Open Sourcerer"
  }
}];
```
</details>
<br/>

Transaksi tulis mengambil dua argumen. `functionId` dari fungsi untuk berinteraksi dan semua `inputs` yang diperlukan oleh fungsi untuk memproses permintaan tulis dan memperbarui status.

<CodeGroup>
  <CodeGroupItem title="write.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// init new EXM instance
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// inputs is an array of objects
const inputs = [{ name: 'Open Sourcerer' }];

// read from cached layer
const writeResult = await exm.functions.write(functionId, inputs);
console.log(writeResult);
```

  </CodeGroupItem>
</CodeGroup>

Permintaan tulis yang berhasil mengembalikan objek dengan status sebagai SUCCESS.

```bash
{
  status: 'SUCCESS',
  data: {
    pseudoId: 'txnId',
    execution: {
      state: [Object],
      result: null,
      validity: [Object],
      exmContext: [Object],
      updated: false
    }
  }
}
```