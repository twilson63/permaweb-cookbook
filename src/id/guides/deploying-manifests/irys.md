---
locale: id
---

### Irys CLI

---

`irys upload-dir <folder>` mengunggah direktori lokal ke Arweave dan secara otomatis menghasilkan manifest untuk file-file tersebut.

Jika Anda ingin mengunggah file manifest sendiri secara manual, menggunakan flag `--content-type "application/x.arweave-manifest+json"` pada transaksi apa pun akan menunjukkannya sebagai transaksi manifest.

### Klien Irys JS

---

Menggunakan potongan kode berikut mengunggah direktori lokal ke Arweave dan secara otomatis menghasilkan manifest untuk file-file tersebut:

```js
await irys.uploadFolder("./path/to/folder", {
	indexFile: "./optionalIndex.html", // file indeks opsional (file yang akan dimuat oleh pengguna saat mengakses manifest)
	batchSize: 50, // jumlah item yang akan diunggah sekaligus
	keepDeleted: false, // apakah akan menyimpan item yang sudah dihapus dari unggahan sebelumnya
}); // mengembalikan ID manifest
```

Jika Anda ingin mengunggah file manifest sendiri secara manual, `await irys.upload(data, { tags: [{ name: "Content-type", value: "application/x.arweave-manifest+json" }] } )` akan menunjukkannya sebagai transaksi manifest.

---

Sumber dan Bacaan Lebih Lanjut: [Dokumentasi Irys](http://docs.irys.xyz/developer-docs/irys-sdk)
