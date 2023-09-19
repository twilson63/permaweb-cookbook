---
locale: id
---

# Mendeploy Fungsi Tanpa Server dengan Execution Machine SDK

Untuk mendeploy fungsi tanpa server dengan SDK dalam JavaScript, kami membuat script di sini yang memberi tahu komputer kami cara mendeploy fungsi kami ke jaringan.

<details>
<summary><strong>Contoh Logika Fungsi</strong></summary>

Setelah menginstal paket, kami memerlukan file yang mendefinisikan logika fungsi dalam proyek.

<CodeGroup>
  <CodeGroupItem title="function.js">

```js
export async function handle(state, action) {
    state.counter++;
    return { state };
}
```

  </CodeGroupItem>
</CodeGroup>

Sintaks untuk mendefinisikan fungsi didasarkan pada standar yang diimplementasikan oleh SmartWeave untuk kontrak pintar dalam JavaScript. Setiap fungsi memiliki `state` yang merupakan objek JSON dari nilai yang disimpan di dalamnya dan `action` untuk berinteraksi dengan nilai-nilai ini.

Fungsi di atas menambahkan nama-nama ke dalam array pengguna yang dilakukan dengan menggunakan baris berikut:

```js
state.users.push(action.input.name);
```

Saat mendeploy fungsi kami menginisialisasi sebuah array kosong bernama `users` yang kemudian membantu fungsi kami mengidentifikasi variabel keadaan ini (variabel yang disimpan dalam keadaan fungsi) selama panggilan baca dan tulis. Saat inisialisasi, `state` terlihat seperti ini:

```js
{ users: [] }
```

Selain itu, saat menulis ke fungsi, kami menggunakan kunci bernama `name` untuk membantu fungsi mengidentifikasi nilai apa yang kami masukkan ke dalam operasi tulis. Definisi ini mendapatkan arti lebih lanjut saat berurusan dengan beberapa nilai.
</details>
<br/>

Setelah logika fungsi didefinisikan dan Token API diatur dengan benar seperti yang ditunjukkan [di sini](../api.md), buat file deploy sebagai berikut:

<CodeGroup>
  <CodeGroupItem title="deploy.js">

```js
import { Exm, ContractType } from '@execution-machine/sdk';
import { readFileSync, writeFileSync } from 'fs';

// init new EXM instance
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// fetch function source
const functionSource = readFileSync('function.js');

// .deploy(source, initState, contractType)
const data = await exm.functions.deploy(functionSource, { users: [] }, ContractType.JS);

// write the function id to a local file
writeFileSync('./functionId.js', `export const functionId = "${data.id}"`)
```

  </CodeGroupItem>
</CodeGroup>

Saat mendeploy, kami perlu memasukkan logika fungsi, keadaan awal fungsi, dan bahasa pemrograman definisi fungsi sebagai argumen. Untuk mendeploy, jalankan perintah berikut dalam baris perintah di dalam direktori yang sesuai dengan proyek:

```bash
node deploy.js
```

Setelah mendeploy, kami menerima beberapa data dari mana kami menyimpan `functionId` dalam file lokal. `functionId` seperti namanya adalah pengenal unik yang membantu dalam interaksi lebih lanjut dengan fungsi tanpa server seperti operasi baca dan tulis.

Bagian-bagian berikut menjelaskan proses membaca dan menulis dengan fungsi EXM.