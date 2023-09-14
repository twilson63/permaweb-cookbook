---
locale: id
---

# Membuat dan Mengunggah PST

### **Prasyarat**

---

Sebelum Anda mulai membuat PST Anda, Anda akan memerlukan **NodeJS/NPM** yang terinstal.

### **Memulai**

---

Kontrak SmartWeave dapat dibagi menjadi dua bagian:

- **Kontrak** (logika sebenarnya di balik token)
- **Status Awal** (beberapa pengaturan atau konfigurasi yang ingin kita miliki pada token kita)

Dalam panduan ini, kita akan membuat keduanya.

**Menyiapkan Lingkungan Lokal**

Jalankan `npm install arweave arlocal warp-contracts`.

Ini akan memberikan fungsi untuk membuat dan mendeploy PST.

### **Mengonfigurasi Kontrak**

---

PST memerlukan beberapa pengaturan status awal sebelum dideploy, misalnya nama token dan jumlah token.

Buat file konfigurasi yang terlihat seperti ini:

```json
// initial-state.json
{
  "ticker": "TEST_PST",
  "name": "Test PST",
  "owner": "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo",
  "balances": {
      "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo": 1000,
      "Jo9BZOaIVBDIhyKDiSnJ1bIU4usT1ZZJ5Kl6M-rBFdI": 1000,
  }
}
```

Ini mengatur beberapa opsi awal untuk PST. Simpan sebagai `initial-state.json`.

- **`ticker`** - simbol token (misalnya, BTC, ETH)
- **`name`** - nama token
- **`owner`** - alamat pemilik kontrak
- **`balances`** - alamat untuk mendistribusikan token awal

### Menulis Kontrak

Kontrak PST harus memiliki satu fungsi, yaitu `handle`, yang mengambil dua argumen:

`state`, yang merupakan status saat ini dari kontrak, dan `action`, yang merupakan tindakan yang ingin Anda lakukan (misalnya, mentransfer token).

Ketika melakukan panggilan ke kontrak PST, itu harus mengembalikan salah satu dari dua hal ini:
- **`state`** - jika panggilan ke kontrak mengubah status (misalnya, membuat transfer).
- **`result`** - jika panggilan **tidak** mengubah status (misalnya, melihat saldo).

Selain itu, itu harus melempar **`error`** jika panggilan tidak valid atau gagal.

Pertama, mari tentukan fungsi `handle` utama.

```js
//contract.js
export function handle(state, action) {
  let balances = state.balances;
  let input = action.input;
  let caller = action.caller;
}
```

Ini mengatur beberapa variabel untuk interaksi umum yang digunakan oleh kontrak pintar.

Sekarang mari tambahkan jenis input pertama yang akan mengubah status. Ini memungkinkan pemilik kontrak untuk mencetak token PST baru ke alamat dompet mereka.

```js
  if (input.function == 'mint') {
    let qty = input.qty;

  if (qty <= 0) {
    throw new ContractError('Pencetakan token tidak valid');
  }

  if (!Number.isInteger(qty)) {
    throw a ContractError('Nilai "qty" tidak valid. Harus berupa bilangan bulat');
  }

  if(caller != state.owner) {
    throw new ContractError('Hanya pemilik kontrak yang dapat mencetak token baru.');
  }

  balances[caller] ? (balances[caller] += qty) : (balances[caller] = qty);
  return { state };
  }
```

Fungsi berikutnya akan menangani transfer PST antara dompet.

```js
if (input.function == 'transfer') {

    let target = input.target;
    let qty = input.qty;

    if (!Number.isInteger(qty)) {
      throw new ContractError(`Nilai "qty" tidak valid. Harus berupa bilangan bulat`);
    }

    if (!target) {
      throw new ContractError(`Tidak ada target yang ditentukan`);
    }

    if (qty <= 0 || caller == target) {
      throw new ContractError('Transfer token tidak valid');
    }

    if (balances[caller] < qty) {
      throw new ContractError(`Saldo pemanggil tidak cukup untuk mengirim ${qty} token!`);
    }

    // Mengurangi saldo token pemanggil
    balances[caller] -= qty;
    if (target in balances) {
      // Dompet sudah ada dalam status, tambahkan token baru
      balances[target] += qty;
    } else {
      // Dompet baru, set saldo awal
      balances[target] = qty;
    }

    return { state };
  }
```

Mari juga tambahkan cara melihat saldo PST dari dompet target.

```js
if (input.function == 'balance') {

    let target = input.target;
    let ticker = state.ticker;
    
    if (typeof target !== 'string') {
      throw new ContractError(`Harus menentukan target untuk mendapatkan saldo`);
    }

    if (typeof balances[target] !== 'number') {
      throw new ContractError(`Tidak dapat mendapatkan saldo, target tidak ada`);
    }

    return { result: { target, ticker, balance: balances[target] } };
  }
```

Dan terakhir, mari lemparkan kesalahan jika input yang diberikan bukan fungsi `mint`, `transfer`, atau `balance`.

```js
throw new ContractError(`Tidak ada fungsi yang diberikan atau fungsi tidak dikenali: "${input.function}"`);
```

### **Mendeploy Kontrak**

Untuk mendeploy kontrak, kita perlu menulis skrip NodeJS yang akan bekerja dengan Warp untuk mendeploy kontrak kita.

Buat file bernama `deploy-contract.js`, dan mulailah dengan mengimpor `WarpFactory`.

```js
import { WarpFactory } from 'warp-contracts/mjs'
```

Selanjutnya, inisialisasi instansi Warp.

Anda dapat mengganti `forMainnet()` dengan `forLocal()`, atau `forTestnet()`, tergantung di mana Anda ingin mendeploy kontrak Anda.

```js
const warp = WarpFactory.forMainnet();
```

Sekarang kita sudah menyiapkan Warp, Anda akan memerlukan dompet untuk mendeploy kontrak. Anda dapat menggunakan file kunci lokal Anda sendiri:

```js
const walletAddress = "path/to/wallet.json"
```

atau, buat dompet baru melalui Warp menggunakan kode berikut:

```js
const jwk = await warp.arweave.wallets.generate();
const walletAddress = await warp.arweave.wallets.jwkToAddress(jwk);
```

Transaksi di bawah 100KB gratis, jadi Anda bahkan tidak perlu mendanai dompet!

---

Sebelum mendeploy kontrak, kita perlu membaca file status awal dan file kontrak.

```js
const contract = fs.readFileSync(path.join(__dirname, 'contract.js'), 'utf8');
const state = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'initial-state.json'), 'utf8')
);
```

Jika Anda telah membuat dompet baru untuk dideploy, Anda perlu mengganti `owner` dalam status awal. Anda dapat melakukannya dengan kode berikut:

```js
const initialState = {
  ...stateFromFile,
  ...{
    owner: walletAddress,
  },
};
```

Jika Anda menggunakan dompet, Anda dapat mengedit file `initial-state.json` secara langsung untuk menggunakan alamat dompet Anda.

Kode berikut menangani pendeployan kontrak:

```js
const contractTxId = await warp.createContract.deploy({
  wallet,
  initState: JSON.stringify(initialState),
  src: contractSrc,
});

console.log('Pendeployan selesai: ', {
  ...result,
  sonar: `https://sonar.warp.cc/#/app/contract/${result.contractTxId}`
});
```

Jalankan skrip dengan `node deploy-contract.js` yang akan mendeploy kontrak Anda dan mencatat ID transaksi kontrak dalam terminal untuk digunakan.

---

**Sumber dan Bacaan Lanjutan**: [Dokumentasi Warp](https://academy.warp.cc/tutorials/pst/introduction/intro)