---
locale: id
---

# Meminta Data Transaksi
Tidak cukup hanya menyimpan data secara permanen, untuk membuat Arweave berguna, data juga perlu dapat ditemukan dan diambil. Panduan ini merangkum berbagai pendekatan dalam meminta data di Arweave.

## GraphQL
Seiring berjalannya waktu, layanan indeks yang mengimplementasikan antarmuka GraphQL telah menjadi metode yang disukai untuk meminta data transaksi di Arweave. Layanan indeks membaca informasi transaksi dan blok saat mereka ditambahkan ke jaringan (biasanya dari node Arweave penuh yang dioperasikan oleh layanan tersebut). Setelah dibaca, informasi header dimasukkan ke dalam database di mana dapat diindeks dan diperoleh secara efisien. Layanan indeks menggunakan database ini untuk menyediakan titik akhir GraphQL bagi klien untuk meminta.

GraphQL memiliki beberapa keunggulan yang menjadikannya ideal untuk mengambil kumpulan data permintaan. Ini memungkinkan layanan indeks untuk membuat titik akhir tunggal yang kemudian dapat digunakan untuk meminta semua jenis data. Layanan ini dapat mengembalikan sumber daya ganda dalam satu permintaan, tidak seperti membuat permintaan HTTP untuk setiap sumber daya (seperti yang akan dilakukan dengan REST API). Dengan GraphQL, klien dapat menggabungkan beberapa permintaan dalam satu perjalanan dan menentukan dengan tepat data apa yang dibutuhkan, yang meningkatkan kinerja.

Berikut contoh GraphQL yang mengambil semua ID transaksi dari alamat dompet pemilik yang diberikan yang memiliki tag "Type" dengan nilai "manifest". Untuk informasi lebih lanjut tentang tag, baca panduan tentang [Tag Transaksi](tags.md).

```js:no-line-numbers
const queryObject = {
	query:
	`{
		transactions (
			owners:["${address}"],
			tags: [
			  {
					name: "Type",
					values: ["manifest"]
				}
			]
		) {
			edges {
				node {
					id
				}
			}
		}
	}`
};
const results = await arweave.api.post('/graphql', queryObject);
```

### Layanan Indeks Publik
[https://arweave.net/graphql](https://arweave.net/graphql)

[https://arweave-search.goldsky.com/graphql](https://arweave-search.goldsky.com/graphql)

## Memeriksa Blok
Setiap data yang diunggah ke Arweave memiliki ID transaksi uniknya sendiri dan termasuk dalam blok unik yang kemudian ditambahkan ke blockchain. Data yang terkait dengan setiap transaksi dibagi menjadi bagian-bagian sebesar 256KB dan ditambahkan secara berurutan ke kumpulan data Arweave. Anda dapat mundur, blok per blok, dari [blok saat ini](https://arweave.net/block/current) dan memeriksa masing-masing untuk ID transaksi yang dimaksud. Begitu ditemukan, offset bagian dapat diperoleh dari blok dan digunakan untuk meminta bagian-bagian langsung dari node Arweave. Ini adalah cara paling dasar untuk menemukan dan membaca data di jaringan. Untungnya, pendekatan yang memerlukan lebih sedikit tenaga [seperti GraphQL](#graphql) juga tersedia.

## ARQL
::: warning
ARQL sudah tidak digunakan dan digantikan oleh permintaan GraphQL di gateway atau layanan indeks. Beberapa node mungkin masih memenuhi permintaan ARQL, tetapi ketersediaan dan akurasi hasilnya tidak dijamin.
:::
Bahasa Permintaan Arweave (ARQL) digunakan pada awal perkembangan Arweave. Selain blok dan bagian, node juga menjaga database SQL yang mengindeks transaksi individu. Klien dapat menghubungi node menggunakan ARQL dan mendapatkan data transaksi. Berikut adalah contoh sintaksis permintaan ARQL.

```js:no-line-numbers
let get_mail_query =
	{
		op: 'and',
		expr1: {
			op: 'equals',
			expr1: 'to',
			expr2: address
		},
		expr2: {
			op: 'equals',
			expr1: 'App-Name',
			expr2: 'permamail'
		}
	}

const res = await this.arweave.api.post(`arql`, get_mail_query)
```
Pendekatan ini untuk meminta cukup memadai saat kumpulan data benang masih kecil dan mudah diindeks. Saat adopsi Arweave meningkat, indeks kumpulan data dan merespons permintaan ARQL menghasilkan biaya komputasi yang meningkat. Seiring berjalannya waktu, ketika pertambangan menjadi semakin kompetitif, node menjadi semakin tidak mungkin mampu untuk menawarkan layanan ARQL. Akhirnya, inilah yang menjadi dorongan untuk layanan indeks dan [permintaan GraphQL](#graphql) yang umum digunakan di Arweave saat ini.

Namun, masih ada jalan untuk dapat meminta data langsung dari node. Protokol Pembayaran Permaweb (P3) adalah spesifikasi yang dikembangkan oleh komunitas untuk memungkinkan klien membayar layanan. Dengan menggunakan P3, node yang ingin menawarkan layanan indeks dapat membiayai operasinya dengan mengenakan biaya untuk layanan tersebut.

## Sumber Daya
* [Panduan Meminta Arweave](../guides/querying-arweave/queryingArweave.md)
* [Paket ArDB](../guides/querying-arweave/ardb.md)
* [Paket ar-gql](../guides/querying-arweave/ar-gql.md)
* [Referensi GraphQL](../references/gql.md)