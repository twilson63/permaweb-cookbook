---
locale: id
---

# Bundle Transaksi

### Apa Itu Bundle?

---

Bundle transaksi adalah jenis khusus dari transaksi Arweave. Ini memungkinkan beberapa transaksi dan/atau item data lainnya untuk dibundle di dalamnya. Karena bundle transaksi mengandung banyak transaksi bersarang, mereka merupakan kunci dari kemampuan Arweave untuk melakukan ribuan transaksi per detik.

Pengguna mengirimkan transaksi ke layanan bundling, seperti [irys.xyz](https://irys.xyz), yang menggabungkannya ke dalam 'bundle' dengan transaksi lainnya dan mengirimkannya ke jaringan.

### Bagaimana Bundle Membantu Arweave?

---

#### Ketersediaan

Layanan bundling menjamin bahwa transaksi yang dibundle diposting dengan andal ke Arweave tanpa kegagalan.

ID transaksi dari transaksi yang dibundle segera dibuat tersedia, artinya data dapat langsung diakses seolah-olah sudah ada di jaringan Arweave.

#### Keandalan

Transaksi yang diposting ke Arweave kadang-kadang dapat gagal untuk dikonfirmasi (menyebabkan transaksi terhapus) karena beberapa alasan, seperti aktivitas jaringan yang tinggi. Dalam situasi ini, transaksi dapat menjadi **terlantar**, yaitu terjebak di mempool dan akhirnya dihapus.

Bundler mengatasi masalah ini dengan terus-menerus mencoba untuk mengirimkan data yang dibundle ke Arweave, memastikan bahwa tidak ada kegagalan atau terjebak di mempool.

#### Skalabilitas

Bundle dapat menyimpan hingga 2<sup>256</sup> transaksi, masing-masing dari mereka diselesaikan sebagai satu transaksi tunggal di Arweave. Ini membuat ruang blok Arweave dapat berkembang untuk mendukung hampir semua kasus penggunaan.

#### Fleksibilitas

Karena bundling ditangani oleh layanan bundling yang dibangun di atas Arweave, itu membuka kemungkinan untuk membayar penyimpanan dengan mata uang yang berbeda. [irys.xyz](https://irys.xyz) mendukung pembayaran dalam berbagai token (seperti ETH, MATIC, dan SOL) untuk mengunggah data ke Arweave.

### Apa Itu Nested Bundle?

---

Bundle dapat mencakup item data untuk diunggah ke Arweave dan item data tersebut juga bisa menjadi bundle.

Ini berarti memungkinkan untuk mengunggah bundle dari bundle, atau dengan kata lain **nested bundle**.

Bundle bersarang tidak memiliki batasan teoritis pada kedalaman pengepakan, yang berarti bahwa throughput transaksi dapat ditingkatkan secara drastis.

Bundle bersarang mungkin berguna ketika Anda memiliki kelompok data yang dibundle yang ingin Anda pastikan mencapai Arweave secara bersamaan, dan pada saat yang sama.

Sumber dan Bacaan Lanjutan:

[Dokumentasi Irys](https://docs.irys.xyz)

[Standar ANS-104](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md)
