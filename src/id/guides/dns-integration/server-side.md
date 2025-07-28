---
locale: id
---

# Integrasi DNS ServerSide

Jadi, Anda memiliki aplikasi Permaweb dan itu ada di Permaweb, tetapi Anda juga memiliki domain tertentu yang ingin digunakan pengguna untuk mengakses aplikasi ini. mydomain.com, untuk menghubungkan domain Anda ke aplikasi Permaweb, Anda memiliki beberapa opsi, opsi yang akan kami tunjukkan di sini disebut sebagai pengalihan server-side. Pengalihan ini terjadi sebagai proxy terbalik sehingga pengguna tetap berada di mydomain.com di peramban mereka, sementara di balik layar aplikasi disajikan dari Permaweb.

::: tip
Anda dapat menggunakan proxy terbalik apa pun untuk mengatur pengalihan server-side, dalam panduan ini kami akan menggunakan deno dan deno.com, layanan hosting tepi ringan.
:::

## Yang Anda Butuhkan untuk Mengatur Proxy Terbalik Menggunakan deno.com

* Akun deno.com, yang saat penulisan ini gratis.
* Domain dengan akses ke Pengaturan DNS.
* Pengidentifikasi aplikasi Permaweb dan sudah diunggah di Permaweb.

## Membuat Proxy di Deno.com

Deno Deploy adalah sistem terdistribusi yang berjalan di tepi. 35 wilayah di seluruh dunia. Buka peramban Anda ke [https://deno.com](https://deno.com) dan klik masuk atau daftar jika Anda belum memiliki akun.

Klik `Proyek Baru` dan Klik `Mainkan`

Deno playground akan memungkinkan kita membuat proxy tanpa harus meninggalkan peramban.

Salin kode berikut:

```ts
import { serve } from "https://deno.land/std/http/mod.ts";

const APP_ID = "IDENTIFIER ANDA AREWEAVE"

const fileService = `https://arweave.net/${APP_ID}`;

// menangani permintaan
async function reqHandler(req: Request) {
  const path = new URL(req.url).pathname;
  // proxy ke arweave.net
  return await fetch(fileService + path).then(res => {
    const headers = new Headers(res.headers)
    // memberi tahu server untuk memanfaatkan cache tepi
    headers.set('cache-control', 's-max-age=600, stale-while-revalidate=6000')

    // mengembalikan respons dari arweave.net
    return new Response(res.body, {
      status: res.status,
      headers
    })
  });
}

// mendengarkan permintaan
serve(reqHandler, { port: 8100 });
```

Server proxy ini akan menerima permintaan dari mydomain.com dan memproksikan permintaan ke arweave.net/APP_ID dan kemudian mengembalikan respons sebagai mydomain.com. APP_ID Anda adalah identifikasi TX_ID untuk aplikasi Permaweb Anda.

Klik `Simpan dan Terapkan`

## Menghubungkan ke DNS

Pergi ke bagian Pengaturan Proyek dan masuk ke bagian domain dan klik untuk menambahkan domain.

Masukkan domain `mydomain.com` dan ikuti petunjuk untuk mengubah pengaturan DNS Anda untuk menunjuk ke jaringan tepi deno deploy.

Mungkin butuh beberapa menit untuk diselesaikan dns, tetapi setelah diselesaikan aplikasi Anda sekarang akan dirender dari mydomain.com.

:tada: Selamat, Anda telah menerbitkan pengalihan server-side untuk aplikasi Permaweb Anda.

::: warning
Perhatikan bahwa setiap perubahan pada aplikasi Anda akan menghasilkan TX_ID baru dan Anda perlu memodifikasi TX_ID tersebut untuk menerbitkan perubahan baru ke domain Anda.
:::

## Automatisasi Pengunggahan

Jika Anda ingin mengotomatiskan pengunggahan baru aplikasi Permaweb Anda, lihat tindakan github dan menggunakan tindakan github deno deploy: [https://github.com/denoland/deployctl/blob/main/action/README.md](https://github.com/denoland/deployctl/blob/main/action/README.md)

## Ringkasan

Pengalihan Sisi Server bagus untuk memberikan pengguna Anda URL Sistem Nama Domain untuk mengakses aplikasi Permaweb Anda. Kami harap Anda menemukan panduan ini berguna dalam perjalanan pengembangan Permaweb Anda!