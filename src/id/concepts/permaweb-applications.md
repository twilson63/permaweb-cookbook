---
locale: id
---

# Aplikasi Permaweb

Sebuah aplikasi permaweb adalah jenis halaman web atau aplikasi web yang berjalan di peramban Anda. Yang membuatnya menjadi aplikasi permaweb adalah bahwa ia diimplementasikan di Arweave dan disimpan selamanya. Bahkan jika tim yang mengembangkannya berpindah, pengguna dapat yakin bahwa aplikasi permaweb akan tetap online dan tersedia. Keuntungan besar dari aplikasi permaweb adalah bahwa mereka menyimpan data mereka di Arweave, yang berarti data tersebut dengan mudah dapat diimpor ke aplikasi lain yang mungkin lebih baik dari yang Anda gunakan saat ini.

## Apa itu permaweb?

::: info INFORMASI
Untuk informasi lebih lanjut tentang permaweb, lihat artikel ini tentang [Permaweb](./permaweb.md)
:::

Permaweb adalah kumpulan situs, aplikasi, dan SmartContracts yang dibangun di atas [Layanan Permaweb Arweave](./permaweb.md). Bagian inti dari Permaweb adalah sebagai berikut:

-   Layanan Gateway (contoh: arweave.net, arweave.live, ar.io)
-   Layanan Bundling (contoh: irys.xyz)
-   Layanan Sequencer (contoh: warp.cc)
-   Layanan Indexing (contoh: goldsky)

<img src="https://arweave.net/ycQzutVToTtVT_vT4811ByswtZ-KjqmifNSehSb1-eg" width="700">

### Layanan Gateway

Layanan gateway adalah jembatan antara data di Arweave dan penampilan data di peramban. Gateways sering menyediakan layanan indeks bersama dengan menyajikan data transaksi, dengan mengekspos titik akhir GraphQL untuk melakukan kueri transaksi Arweave.

### Layanan Bundling

Layanan bundling menggabungkan transaksi menjadi bundel transaksi dan memastikan bahwa bundel-bundel tersebut diposting langsung ke Arweave. Dengan menggunakan layanan bundling seperti irys.xyz, Anda dapat mengirimkan ratusan ribu transaksi dalam satu blok Arweave.

### Layanan Sequencing

Sequencers memungkinkan kinerja tinggi untuk SmartWeave Contracts untuk menghitung logika bisnis yang disimpan di jaringan Arweave.

### Layanan Indeks

Layanan indeks mendengarkan semua transaksi di Arweave dan mengimpornya ke dalam database yang diindeks yang cocok untuk kueri cepat. Mereka kemudian mengekspos titik akhir GraphQL sehingga aplikasi permaweb dapat membuat kueri yang dioptimalkan untuk data Arweave.

Layanan-layanan ini bekerja sama untuk membentuk Lapisan Layanan Permaweb dan memberikan kepada pengembang kekuatan untuk membangun aplikasi sepenuhnya terdesentralisasi di permaweb.

## Pengembangan Aplikasi

Pendekatan pengembangan aplikasi dengan permaweb mirip dengan pengembangan `Single Page Application`, di mana aplikasi terdiri dari fungsionalitas frontend yang dieksekusi di peramban web, dan menggunakan GraphQL (Baca/Kueri), Irys (Tulis), dan SmartWeave (Perhitungan Terdesentralisasi) untuk membentuk lapisan bisnis dan lapisan persistensi aplikasi.

![aplikasi permaweb umum](https://arweave.net/UjbgAk8duudDc97lOYIt7rBVtRHp2Z9F6Ua5OcvwNCk/)

Dengan memanfaatkan kerangka aplikasi web modern dan spesifikasi [Path Manifest](./manifests.md), pengembang dapat mendeploy situs web dan aplikasi ke permaweb.

Untuk informasi lebih lanjut tentang membuat dan mendeploy Aplikasi Permaweb, lihat starter kit kami dalam kerangka kerja favorit Anda:

-   [React](../kits/react/index.md)
-   [Svelte](../kits/svelte/index.md)
-   [Vue](../kits/vue/index.md)

::: tip Framework saya tidak terdaftar?
Tidak dapat menemukan kerangka kerja Anda? Mengapa Anda tidak berkontribusi? [Cara berkontribusi ke cookbook](../getting-started/contributing.md)
:::
