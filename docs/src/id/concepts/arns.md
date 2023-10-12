---
locale: id
---

# ArNS - Arweave Name System
## Gambaran
Sistem Nama Arweave (ArNS) adalah buku telepon yang didukung oleh Smartweave dari PermaWeb.

Ini adalah sistem penamaan terdesentralisasi dan tahan sensor yang diaktifkan oleh AR.IO Gateways dan digunakan untuk menghubungkan nama-nama yang ramah dengan aplikasi, halaman, dan data PermaWeb.

Sistem ini bekerja secara mirip dengan DNS tradisional, di mana seorang pengguna dapat membeli nama dalam registri dan server Nama DNS mengonversi nama-nama ini menjadi alamat IP.

Dengan ArNS, registrinya terdesentralisasi, permanen, dan disimpan di Arweave (dengan Smartweave), dan setiap gateway AR.IO berfungsi sebagai cache dan pemecah nama. Pengguna dapat mendaftarkan nama dalam ArNS Registry, seperti "nama-saya" dan mengatur penunjuk ke ID Transaksi Arweave apa pun. Gateway AR.IO akan mengonversi nama tersebut sebagai salah satu subdomain mereka sendiri, misalnya https://laserilla.arweave.net, dan meneruskan semua permintaan ke ID Transaksi Arweave yang terkait. Setiap nama yang terdaftar juga dapat memiliki nama-nama bawah yang terkait dengan itu, yang masing-masing mengarah ke ID Transaksi Arweave, seperti https://v1_laserilla.arweave.net, memberikan fleksibilitas dan kontrol yang lebih besar kepada pemiliknya.

## Registri ArNS
<!-- // TODO: tautan ke konsep Smartweave // -->

ArNS menggunakan protokol Smartweave untuk mengelola catatan nama-nama. Setiap catatan, atau nama, disewakan oleh seorang pengguna dan terkait dengan token ANT. Anda dapat mendaftarkan beberapa nama ArNS ke satu ANT, tetapi Anda tidak dapat mendaftarkan beberapa ANT ke satu nama ArNS - gateway tidak akan tahu ke mana mengarahkan ID routing.

Nama-nama ArNS dapat mencapai 32 karakter, termasuk angka [0-9], huruf [a-z], dan tanda hubung [-]. Tanda hubung tidak boleh menjadi tanda hubung penutup, misalnya -namasaya.

## ANTs (Arweave Name Tokens)

ANTs adalah bagian penting dari ekosistem ArNS - mereka adalah kunci sebenarnya untuk memiliki nama ArNS. Ketika Anda mendaftarkan nama ArNS ke ANT, ANT tersebut kemudian menjadi metode transfer untuk nama tersebut. Registri ArNS tidak peduli siapa yang memiliki ANT, ia hanya tahu nama ANT apa yang dimilikinya.

Dalam ANT, Anda dapat membangun fungsionalitas apa pun yang Anda inginkan, dalam lingkup daftar transaksi kode sumber yang disetujui oleh registri ArNS. Mulai dari NFT, PST, DAO, hingga aplikasi penuh.

## Nama_Bawah (Under_Names)

Nama-nama bawah adalah catatan yang dipegang dan dikelola oleh ANT Anda (Token Nama Arweave). Catatan-catatan ini dapat dibuat dan dikelola tanpa harus memiliki nama ARNS, dan akan ditransfer bersama dengan ANT ketika dikirim ke pemilik baru. Demikian pula, jika nama ArNS Anda berakhir, dan Anda mendaftarkan ANT Anda ke nama ArNS baru, semua nama bawah Anda akan tetap utuh.

Contoh: Anda memiliki namaLama.arweave.net.

lalu: Anda membuat nama bawah "saya" - saya_namaLama.arweave.net.

lalu: namaLama.arweave.net berakhir, dan Anda mendaftarkan namaBaru.arweave.net ke ANT Anda.

sekarang: nama bawah saya dapat diakses di namaBaru - saya_namaBaru.arweave.net.

Berikut contoh dari Status kontrak ANT:

```json
{
  balances:{ QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ : 1 },
  controller: "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  evolve: null,
  name: "ArDrive OG Logo",
  owner: "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  records:{
    @:{ transactionId: "xWQ7UmbP0ZHDY7OLCxJsuPCN3wSUk0jCTJvOG1etCRo" },
    undername1:{ transactionId: "usOLUmbP0ZHDY7OLCxJsuPCN3wSUk0jkdlvOG1etCRo" }
  },
  ticker:"ANT-ARDRIVE-OG-LOGO"
}
```
catatan "@" adalah id routing awal untuk ANT. jika Anda mendaftarkan 'nama-saya' ke ANT ini, dan mencoba mengaksesnya melalui nama-saya.arweave.net, Anda akan diarahkan ke idTransaksi catatan @.

jika Anda mencoba mengakses undername1_nama-saya.arweave.net, Anda akan mendapatkan idTransaksi 'undername1'.

ANT, dalam teori, memiliki jumlah nama bawah yang TIDAK TERBATAS. Namun, berapa banyak yang akan dilayani tergantung pada tier mana yang digunakan dengan nama ArNS Anda.