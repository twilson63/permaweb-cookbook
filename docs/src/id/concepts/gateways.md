---
locale: id
---

# Gateway

---

Data yang diunggah ke jaringan Arweave (atau [permaweb](https://cookbook.arweave.dev/concepts/permaweb.html)) tidak selalu mudah untuk digunakan secara langsung.

### Apa Itu Gateway?

Gateway kadang-kadang disebut sebagai "pintu depan menuju permaweb". Mereka berfungsi sebagai antarmuka antara Arweave dan pengguna akhir, sehingga mudah untuk mengakses data atau menggunakan aplikasi permaweb dari peramban web Anda.

Sebagai contoh, mengakses file HTML yang disimpan di Arweave akan ditampilkan sebagai halaman web di peramban Anda. Hal yang sama berlaku untuk melihat gambar, mengunduh file, melihat data JSON, atau file lain yang disimpan di Arweave. Hal ini membuat interaksi dengan permaweb sangat mirip dengan menggunakan web tradisional.

### Peran Lain dari Gateway

Selain melayani data agar dapat diakses oleh pengguna, gateway juga menawarkan layanan lain seperti:

- Penyimpanan data dan transaksi yang sering diakses dalam cache
- Pengindeksan dan pencarian transaksi (melalui tag Arweave dan antarmuka GraphQl)
- Penyebaran transaksi ke seluruh jaringan Arweave
- Moderasi konten (kebijakan konten untuk memilih data mana yang disajikan atau tidak disajikan)

### Gateway dan Protokol Arweave

Meskipun gateway memainkan peran besar dalam memungkinkan konten dapat diakses di Arweave, mereka **bukan** bagian dari protokol inti.

Ini berarti hosting dan menjalankan gateway terpisah dari menjalankan node yang mengamankan jaringan Arweave (meskipun seringkali dilakukan bersama).

Karena gateway bukan bagian dari protokol inti, tidak ada struktur insentif bawaan seperti hadiah atau insentif untuk pertambangan. Hal ini memungkinkan operator gateway atau layanan eksternal untuk memilih bagaimana mereka ingin mengatur sistem insentif mereka, yang mengarah pada model yang lebih terdesentralisasi dan demokratis. Aplikasi individu bahkan dapat mengoperasikan gateway mereka sendiri untuk memungkinkan caching dan kinerja yang lebih baik dari aplikasi permaweb mereka.

Beberapa gateway populer termasuk [arweave.net](https://arweave.net/) yang dikelola oleh tim Arweave, dan lainnya seperti [arweave.live](https://arweave.live/), dan [g8way.io](https://g8way.io). Namun, pengoperasian gateway semakin mudah dan dapat diakses melalui tim seperti [AR.IO](https://ar.io/).

### Sumber dan Bacaan Lanjutan

- [ArWiki](https://arwiki.wiki/#/en/gateways)
- [AR.IO](https://ar.io/)