---
locale: id
---

# Konsep dan Prinsip Atomic Token

![https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A](https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A)

Sebuah Atomic Token adalah identifier permanen tunggal yang merujuk pada data dan Kontrak SmartWeave di Permaweb.

## Spesifikasi

Data HARUS disimpan di jaringan arweave dan dapat diakses dengan Menggunakan Identifier Transaksi

Kontrak HARUS mengimplementasikan objek `balances` yang mewakili kepemilikan Atomic Token

Kontrak HARUS mengimplementasikan fungsi `transfer` yang mengambil argumen berikut:
- target {Alamat Wallet atau Kontrak}
- qty {Jumlah}

> Fungsi transfer seharusnya mentransfer kepemilikan dari pemanggil ke target

## Opsi

_Opsi implementasi yang dapat membuat Atomic Token ditemukan dan diperdagangkan di Permaweb_

[Verto Flex](https://github.com/useverto/flex) - Pustaka Flex memberikan Atomic token Anda untuk dijual atau dibeli tanpa harus percaya kepada bursa.

[Tanda Temuan - ANS 110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) - Tag tambahan ini dapat membantu aplikasi dan layanan Permaweb menemukan token Anda.

[Periksa Panduan Ini](../guides/atomic-tokens/intro.md)