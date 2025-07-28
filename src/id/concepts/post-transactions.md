---
locale: id
---

# Posting Transaksi

Ada beberapa cara untuk memposting transaksi ke Arweave. Setiap cara memiliki kelebihan dan kendala uniknya sendiri. Diagram di bawah ini mengilustrasikan empat pendekatan utama untuk memposting transaksi.

`Langsung ke Peer`, `Langsung ke Gateway`, `Dibundel`, dan `Dikirimkan`.

<img src="https://arweave.net/Z1eDDnz4kqxAkkzy6p5elMz-jKnlaVIletp-Tm6W8kQ" width="550">

::: tip <img src="https://arweave.net/blzzObMx8QvyrPTdLPGV3m-NsnJ-QqBzvQIQzzZEfIk" width="20"> Transaksi Terjamin
Ketika memposting sejumlah besar transaksi atau ketika waktu penyelesaian cepat diinginkan, pertimbangkan untuk menggunakan layanan bundling. Bundler menyelesaikan sejumlah besar transaksi segera dan membuat data transaksi tersedia dalam beberapa milidetik. Layanan bundling menyimpan transaksi yang diposting hingga transaksi tersebut terkonfirmasi di chain. Jika transaksi tidak disertakan dalam blok terbaru, layanan bundling akan mem-postingnya kembali setiap kali ada blok baru hingga direkam di chain dengan jumlah konfirmasi yang cukup.
:::

## Transaksi Langsung

Transaksi yang diposting langsung ke Arweave terdiri dari dua jenis, yaitu transaksi **dompet-ke-dompet** dan transaksi **data**. Yang pertama mentransfer token **AR** antara alamat dompet. Yang kedua memposting data ke Arweave dan membayar biaya penyimpanan yang terkait.

Menariknya, transaksi **data** juga dapat mentransfer token **AR** ke alamat dompet sambil membayar biaya penyimpanan pada saat yang bersamaan.

Semua transaksi memungkinkan pengguna untuk menentukan hingga 2KB metadata dalam bentuk [tag kustom](./tags.md).

### Langsung ke Peer

Transaksi dapat diposting langsung ke peer Arweave (node penambangan). Ini mungkin adalah cara paling terdesentralisasi untuk memposting transaksi karena klien dapat memilih peer mana yang ingin mereka posting.

Pendekatan ini tidak tanpa kelemahan. Peers dapat datang dan pergi sehingga sulit untuk dapat memposting transaksi dari aplikasi dengan andal. Meskipun memungkinkan untuk mengambil daftar peers aktif dan memilih satu sebelum memposting, ini menambahkan overhead dan gesekan dalam prosesnya. Selain itu, transaksi yang diposting ke peer hanya dapat dikenali di gateway setelah ditambang dalam blok. Ini memperkenalkan penundaan 1-2 menit antara pemostingan transaksi ke peer dan ketersediaannya untuk dibaca di browser dari gateway.

Dengan alasan di atas, pengembang cenderung mengonfigurasi `arweave-js` untuk mengarahkan ke gateway saat memposting transaksi langsung karena cache optimis di gateway membuat transaksi tersedia hampir seketika.

### Langsung ke Gateway

Gateway berada di antara klien dan jaringan peer Arweave. Salah satu fungsi utama gateway adalah mengindeks transaksi dan menyimpan data yang diposting ke jaringan secara optimis saat menunggu data tersebut dimasukkan dalam blok. Ini membuat transaksi dapat diquery dalam keadaan "Pending" hampir seketika, yang memungkinkan aplikasi yang dibangun di atas gateway menjadi lebih responsif. Masih ada risiko transaksi keluar dari cache optimis jika mereka tidak ditambang dalam blok oleh para peer.

Contoh cara memposting transaksi langsung menggunakan `arweave-js` dapat ditemukan [di panduan ini](../guides/posting-transactions/arweave-js.md).

## Transaksi yang Dibundel

Layanan yang dibangun di atas Arweave yang menyediakan utilitas tambahan untuk pembangun Permaweb kadang disebut Layanan Permaweb. Bundler adalah salah satu layanan tersebut. Bundler mengambil beberapa transaksi individu dan menggabungkannya menjadi satu transaksi yang diposting langsung ke Arweave. Dengan cara ini, satu transaksi pada tingkat protokol dapat berisi puluhan ribu transaksi yang digabungkan. Namun, ada satu batasan, hanya transaksi **data** yang dapat dimasukkan dalam bundel. Transaksi **dompet-ke-dompet** (yang mentransfer token **AR** antara alamat dompet) harus dilakukan sebagai transaksi individu yang diposting langsung ke Arweave.

Perbedaan lainnya ketika menggunakan layanan bundling seperti [irys.xyz](https://irys.xyz) adalah Anda harus melakukan deposit kecil pada node bundler yang ingin Anda gunakan sebelum memposting transaksi. Ini memungkinkan layanan bundler untuk mengenakan biaya untuk banyak pengunggahan kecil (atau besar) tanpa overhead penyelesaian transfer token **AR** langsung di Arweave setiap kali.

[irys.xyz](https://irys.xyz) memungkinkan klien untuk melakukan deposit dalam sejumlah [mata uang kripto yang didukung](https://docs.irys.xyz/docs/currencies).

::: info
Ketika transaksi diposting ke irys.xyz, mereka juga muncul dalam cache optimis gateway yang terhubung sehingga mereka dapat diquery dalam hitungan milidetik.
:::

Contoh cara memposting transaksi yang dibundel menggunakan `irys/sdk` dapat ditemukan [di panduan ini](../guides/posting-transactions/irys.md).

## Transaksi yang Dikirimkan

Cara lain untuk memposting transaksi yang dibundel adalah dari browser. Meskipun browser memberlakukan beberapa kendala seputar ukuran data yang dapat diunggah, dompet berbasis browser mampu memposting transaksi ke bundler. Dompet browser Arweave mengimplementasikan metode API `dispatch()`. Jika Anda memposting transaksi kecil (100KB atau kurang), Anda dapat menggunakan metode `dispatch()` dompet untuk memanfaatkan transaksi yang dibundel bahkan jika `irys/sdk` tidak diikutkan dalam aplikasi Anda.

Contoh cara memposting transaksi yang dibundel sebesar 100KB atau kurang dengan metode `dispatch()` dompet Arweave dapat ditemukan [di panduan ini](../guides/posting-transactions/dispatch.md).

## Sumber Daya

-   Contoh [arweave-js](../guides/posting-transactions/arweave-js.md)
-   Contoh [irys.xyz](../guides/posting-transactions/irys.md)
-   Contoh [dispatch](../guides/posting-transactions/dispatch.md)
