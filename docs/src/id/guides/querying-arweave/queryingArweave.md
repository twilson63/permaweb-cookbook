---
locale: id
---

# Menggunakan GraphQL untuk Mengambil Data dari Arweave
Arweave menyediakan cara sederhana untuk mengambil transaksi dan menyaringnya berdasarkan [tag](../concepts/tags.md). Layanan indeks kompatibel dengan GraphQL dari Arweave menyediakan titik akhir yang dapat digunakan pengguna untuk mengirim kueri GraphQL, dan juga menyediakan playground untuk mencoba kueri.

[GraphQL](https://graphql.org) adalah bahasa kueri yang fleksibel yang dapat digunakan oleh layanan untuk membangun skema data yang disesuaikan untuk diakses oleh klien. GraphQL juga memungkinkan klien untuk menentukan elemen mana dari struktur data yang tersedia yang ingin mereka lihat dalam hasil.

## Layanan Indeks Publik

- [graphql arweave.net](https://arweave.net/graphql) adalah titik akhir GraphQL asli, dikelola oleh [ar.io](https://ar.io).
- [Layanan pencarian goldsky](https://arweave-search.goldsky.com/graphql) adalah layanan publik yang dioptimalkan khusus untuk pencarian menggunakan sintaks graphql yang merupakan superset, dikelola oleh [goldsky](https://goldsky.com).
- [Pencarian indeks terdesentralisasi ar.io](https://ar-io.dev/graphql) Sebuah jaringan terdesentralisasi untuk layanan indeks. Saat ini dalam pengujian dengan transaksi L1 yang tersedia.

## Menjalankan Kueri GraphQL
Untuk mengambil data dari Arweave, kita perlu mengaksesnya melalui layanan indeks yang mendukung GraphQL. Gunakan salah satu playground GraphQL yang tercantum di atas untuk memulai!

Salin dan tempel kueri berikut ini
```graphql:no-line-numbers
query {
  transactions(tags: [{
    name: "App-Name",
    values: ["PublicSquare"]
  }]) 
  {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}
```

Jika Anda tidak terbiasa dengan GraphQL, pada awalnya mungkin terasa agak rumit, tetapi begitu Anda mengenal strukturnya, itu cukup mudah dibaca dan dipahami.

```text:no-line-numbers
query { <tipe skema> ( <kriteria filter> ) { <struktur data hasil> } }
```
Dalam kueri contoh yang kami salin, `<tipe skema>` kami adalah `transactions`, tetapi kami juga dapat mengkueri `blocks`. Deskripsi lengkap skema GraphQL Arweave ditulis dalam [Panduan GraphQL Arweave](https://gql-guide.arweave.dev). Panduan ini mengacu pada `kriteria filter` sebagai "Struktur Kueri" dan definisi struktur data lengkap dari `transactions` dan `blocks` sebagai "Struktur Data".

Ketika sampai pada `<struktur data hasil>`, hal yang perlu diperhatikan adalah bahwa Anda dapat menentukan subset dari struktur data lengkap yang Anda minati. Sebagai contoh, struktur data lengkap untuk skema transaksi [tercantum di sini](https://gql-guide.arweave.dev/#full-data).

Tekan tombol "Play" besar di tengah playground untuk menjalankan kueri.

![image](https://arweave.net/rYfVvFVKLFmmtXmf8KeTvsG8avUXMQ4qOBBTZRHqVU0)

Anda akan melihat bahwa Anda mendapatkan daftar transaksi dalam struktur data hasil yang Anda tentukan dalam kueri awal kami.

Jika Anda baru mengenal blockchain, ini tidak terduga, kami belum membangun apa pun, mengapa hasil ini ada? Ternyata, tag `"PublicSquare": "App-Name"` yang kami saring telah digunakan selama beberapa waktu.

Pendiri protokol Arweave, Sam Williams, mengusulkan format transaksi beberapa tahun yang lalu dalam [potongan kode github](https://gist.github.com/samcamwilliams/811537f0a52b39057af1def9e61756b2). Sejak itu, para pembangun dalam ekosistem ini telah membangun di sekitarnya, bereksperimen, dan mengirimkan transaksi dengan tag tersebut.

Kembali ke pengambilan data dari Arweave. Anda akan melihat dalam hasil GraphQL bahwa tidak ada pesan post yang dapat dibaca, hanya tag dan informasi tentang posting.

Hal ini karena layanan indeks GraphQL hanya berfokus pada pengindeksan dan pengambilan data header untuk transaksi dan blok tetapi tidak pada data yang terkait.

Untuk mendapatkan data dari transaksi, kita perlu mencarinya menggunakan titik akhir HTTP lainnya.
```text:no-line-numbers
https://arweave.net/<id transaksi>
```

Salin dan tempel salah satu ID dari hasil kueri Anda dan modifikasi tautan di atas dengan menambahkan `id`. Itu seharusnya terlihat seperti ini…

https://arweave.net/eaUAvulzZPrdh6_cHwUYV473OhvCumqT3K7eWI8tArk

Hasil dari membuka URL tersebut di browser (HTTP GET) akan mengambil konten dari posting (disimpan dalam data transaksi). Dalam contoh ini, itu adalah…
```text:no-line-numbers
Woah that's pretty cool 😎
```
(Untuk daftar lengkap titik akhir HTTP arweave, kunjungi dokumentasi [API HTTP](https://docs.arweave.org/developers/server/http-api).)

## Mengirim Kueri dari JavaScript
Mengirim kueri GraphQL dari JavaScript tidak jauh berbeda dengan mengirimkannya di playground.

Pertama, instal paket `arweave-js` untuk mengakses dengan mudah titik akhir GraphQL.
```console:no-line-numbers
npm install --save arweave
```

Kemudian masukkan versi kueri contoh yang sedikit lebih canggih dari contoh di atas dan `await` hasilnya dari pengiriman kueri.

```js:no-line-numbers
import Arweave from 'arweave';

// inisialisasi instans arweave
const arweave = Arweave.init({});

// membuat kueri yang memilih data transaksi 100 transaksi pertama dengan tag tertentu
const queryObject = {
	query:
	`{
		transactions(
			first:100,
			tags: [
				{
					name: "App-Name",
					values: ["PublicSquare"]
				},
				{
					name: "Content-Type",
					values: ["text/plain"]
				}
			]
		) 
		{
			edges {
				node {
					id
					tags {
						name
						value
					}
				}
			}
		}
	}`
};
const results = await arweave.api.post('/graphql', queryObject);
```

## Kueri Multipel
Anda dapat mengirimkan beberapa kueri dalam satu perjalanan ke titik akhir GraphQL. Contoh ini mengkueri transaksi `name` (masing-masing sebagai kueri terpisah) untuk dua alamat dompet menggunakan protokol `arweave-id` yang sekarang sudah usang (digantikan oleh `ar-profile`) tetapi masih permanen.
```graphql:no-line-numbers
query {
	account1: transactions(first: 1, owners:["89tR0-C1m3_sCWCoVCChg4gFYKdiH5_ZDyZpdJ2DDRw"],
		tags: [
			{
				name: "App-Name",
				values: ["arweave-id"]
			},
			{
				name: "Type",
				values: ["name"]
			}
		]
	) {
		edges {
			node {
				id
					owner {
					address
				}
			}
		}
	}
	account2: transactions(first: 1, owners:["kLx41ALBpTVpCAgymxPaooBgMyk9hsdijSF2T-lZ_Bg"],
		tags: [
			{
				name: "App-Name",
				values: ["arweave-id"]
			},
			{
				name: "Type",
				values: ["name"]
			}
		]
	) {
		edges {
			node {
				id
					owner {
					address
				}
			}
		}
	}
}
```


## Sumber Daya
* [Referensi GQL Arweave](../../references/gql.md)
* [Paket ArDB](./ardb.md)
* [Paket ar-gql](./ar-gql.md)
* [Layanan Indeks Pencarian](./search-indexing-service.md)

