---
locale: id
---

# Layanan Bundling

---

Dengan layanan bundling, pengguna dapat mengirimkan transaksi data mereka ke layanan bundling untuk "dibundle" bersama dengan transaksi pengguna lain dan dikirimkan sebagai satu transaksi Arweave tunggal dalam blok Arweave yang akan datang.

### Mengirimkan ke layanan bundling

---

Anda dapat membaca lebih lanjut tentang cara mengirimkan transaksi Anda ke layanan bundling [di sini](/guides/posting-transactions/irys.md).

### Apa itu Bundle?

---

Deskripsi bundle transaksi dan manfaatnya dapat ditemukan [di sini](/concepts/bundles.md).

### Apa itu node Bundler?

---

Seorang bundler adalah node yang bertanggung jawab untuk menerima transaksi atau item data dari pengguna, mem-bundlenya, dan mengirimkannya ke jaringan Arweave (dengan jaminan bahwa mereka akan diunggah dengan ID transaksi tertentu).

Pionir layanan bundling dan bundler terbesar saat ini adalah [irys.xyz](https://irys.xyz). Node Irys menjalankan:

-   Proksi terbalik NGINX
-   Proses API HTTP
-   Cache Redis
-   Database SQL (Postgres)
-   Proses pekerja

Semuanya memastikan bahwa data dipertahankan hingga diunggah ke Arweave.

### Mendukung berbagai mata uang

---

Fitur utama dari layanan bundling adalah bahwa karena mereka membayar untuk transaksi dasar Arweave yang akan dikirimkan (menggunakan token AR), mereka dapat memilih untuk mengaktifkan pembayaran biaya penyimpanan dengan berbagai jenis token yang berbeda. Ini adalah titik masuk utama bagi rantai lain untuk mengaktifkan penyimpanan permanen Arweave untuk pengguna mereka.
