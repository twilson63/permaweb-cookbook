---
locale: id
---

# Metadata Transaksi (Tag)

Arweave dapat dianggap sebagai hard drive permanen yang hanya dapat di-append, di mana setiap entri di drive tersebut adalah transaksi uniknya sendiri. Transaksi memiliki ID, tanda tangan, dan alamat pemilik yang melakukan tanda tangan dan membayar untuk transaksi tersebut diposting. Bersama dengan nilai-nilai header tersebut, protokol Arweave memungkinkan pengguna untuk menandai transaksi dengan tag kustom. Tag ini dijelaskan sebagai pasangan nama dan nilai yang ditambahkan ke transaksi. Tag ini membuatnya memungkinkan untuk mengkueri Arweave dan menemukan semua Transaksi yang termasuk tag atau tag tertentu. Kemampuan untuk mengkueri dan menyaring transaksi sangat penting untuk mendukung aplikasi yang dibangun di atas Arweave.

## Apa itu Tag Transaksi?

Tag transaksi adalah pasangan kunci-nilai, di mana kombinasi kunci dan nilai base64URL harus kurang dari maksimum 2048 byte untuk transaksi asli arweave.

::: tip
Transaksi yang dibundle memiliki dukungan untuk lebih banyak ruang tag. Transaksi yang diposting melalui bundler.network memiliki hingga 4096 byte ruang tag.
:::

Beberapa contoh umum dari tag transaksi termasuk:

-   `Content-Type`: Digunakan untuk menentukan tipe MIME dari konten untuk ditampilkan di permaweb.
-   `App-Name`: Tag ini menggambarkan aplikasi yang menulis data tersebut.
-   `App-Version`: Tag ini adalah versi aplikasi, dipasangkan dengan App-Name.
-   `Unix-Time`: Tag ini adalah penanda waktu Unix, **detik** sejak epoch.
-   `Title`: Digunakan untuk memberi nama atau deskripsi singkat dari konten yang disimpan dalam transaksi.
-   `Description`: Digunakan untuk memberikan deskripsi yang lebih panjang tentang kontennya.

Tag transaksi dapat digunakan untuk berbagai tujuan, seperti mengindeks transaksi untuk pencarian, mengorganisir transaksi ke dalam kategori, atau memberikan metadata tentang konten yang disimpan dalam transaksi.

## Beberapa hal penting tentang Tag Transaksi

Tag transaksi dienkripsi sebagai string yang dienkripsi Base64URL baik untuk kunci maupun nilai. Hal ini memungkinkan untuk mengirimkan array byte sebagai kunci atau nilai dan mentransfernya dengan aman melalui http. Meskipun tidak bisa dibaca oleh manusia tanpa dekripsi, hal ini seharusnya tidak dianggap sebagai enkripsi.

Ukuran total maksimum Tag Transaksi untuk transaksi yang diposting langsung ke Arweave adalah 2048 byte. Ukuran ini ditentukan oleh penggabungan semua kunci dan semua nilai dari tag transaksi.

Tag transaksi dapat digunakan dalam kueri GraphQL untuk mengembalikan seperangkat item transaksi yang difilter.

## Tag Umum yang Digunakan dalam Komunitas

| Nama Tag     | Deskripsi                                                                      | Kasus Penggunaan                                                                     |
| ------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| App-Name     | Paling sering digunakan untuk Identifier SmartWeave                            | Nilai umum adalah SmartWeaveContract, SmartWeaveAction, dan SmartWeaveContractSource |
| App-Version  | Versi data ini, bisa merepresentasikan aplikasi yang mengonsumsi informasi ini | 0.3.0 adalah Versi SmartWeave saat ini                                               |
| Content-Type | Tipe MIME untuk mengidentifikasi data yang terkandung dalam transaksi          | text/html, application/json, image/png                                               |
| Unix-Time    | Tag ini adalah penanda waktu Unix, **detik** sejak epoch                       | Waktu transaksi dikirimkan                                                           |
| Title        | Standar ANS-110 untuk mendeskripsikan konten                                   | Memberikan nama untuk Aset Atomic                                                    |
| Type         | Standar ANS-110 untuk kategorisasi data                                        | tipe dapat mengelompokkan aset permaweb                                              |

## Contoh

<CodeGroup>
  <CodeGroupItem title="arweave">

```ts
const tx = await arweave.createTransaction({ data: mydata });
tx.addTag("Content-Type", "text/html");
tx.addTag("Title", "Posting luar biasa saya tentang Tag Transaksi");
tx.addTag("Description", "Ini adalah satu posting yang tidak boleh Anda lewatkan!");
tx.addTag("Topic:Amazing", "Luar Biasa");
tx.addTag("Type", "blog-post");

await arweave.transactions.sign(tx, jwk);
await arweave.transactions.post(tx);
```

  </CodeGroupItem>
  <CodeGroupItem title="@irys/sdk">

```js
await irys.upload(mydata, [
	{ name: "Content-Type", value: "text/html" },
	{ name: "Title", value: "Posting luar biasa saya tentang Tag Transaksi" },
	{ name: "Description", value: "Ini adalah satu posting yang tidak boleh Anda lewatkan!" },
	{ name: "Topic:Amazing", value: "Luar Biasa" },
	{ name: "Type", value: "blog-post" },
]);
```

  </CodeGroupItem>
</CodeGroup>

## Ringkasan

Memahami bagaimana Tag Transaksi berperan dalam tumpukan teknologi Arweave dapat memberikan konteks tentang cara memecahkan masalah menggunakan Permaweb sebagai platform aplikasi. Tag memberikan alat untuk mengonsumsi dan menciptakan standar data umum dan pola untuk mendorong pengalaman data yang tidak bersaing di Permaweb. Hasilnya memberikan pengguna ekosistem pilihan aplikasi untuk mengonsumsi dan membuat konten karena data selalu bersama pengguna bukan aplikasi.
