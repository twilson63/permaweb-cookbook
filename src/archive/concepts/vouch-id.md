---
locale: id
---

# Vouch
## Ikhtisar
#### Protokol Vouch
Arweave memperkenalkan konsep ANS-109 Vouch (Assertion of Identity). Ini adalah standar yang menggunakan format transaksi tertentu bersama dengan beberapa tag untuk memungkinkan siapa saja di permaweb untuk "memberi jaminan" atas identitas dan kemanusiaan alamat Arweave apa pun.

Penambahan standar seperti ANS-109 ke permaweb akan membantu mengurangi serangan Sybil dan pelaku buruk, sehingga membuat pengalaman permaweb lebih aman bagi penggunanya.

#### VouchDAO
VouchDAO adalah lapisan verifikasi terdesentralisasi yang dipimpin oleh komunitas dan dibangun di atas standar Vouch. Para pengembang membuat layanan vouch dan anggota komunitas VouchDAO memberikan suara untuk menentukan layanan verifikasi mana yang dianggap dapat dipercaya.

Setelah layanan baru dibuat, alamatnya akan dipilih melalui antarmuka [komunitas VouchDAO](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk). Jika suara itu diterima, maka layanan tersebut akan ditambahkan sebagai Voucher yang terverifikasi.

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## Cara Kerja
Pengembang memiliki kemampuan untuk membuat berbagai layanan Vouch untuk memberikan jaminan kepada dompet Arweave pengguna berdasarkan serangkaian persyaratan tertentu. Contoh saat ini adalah layanan Twitter yang merupakan layanan vouch pertama, yang telah memberi jaminan kepada lebih dari 180 alamat Arweave sejauh ini.

Status kontrak pintar VouchDAO memiliki atribut `vouched`. Status ini diperbarui setiap kali seorang pengguna diverifikasi. Objek `vouched` menyimpan daftar alamat yang divouche dalam format berikut:
```
ALAMAT_PENGGUNA_VOUCH:[
  {
    service:"ALAMAT_LAYANAN_1"
    transaction:"ID_TX"
  },
   {
    service:"ALAMAT_LAYANAN_2"
    transaction:"ID_TX"
  }
]
```

Pengguna yang diverifikasi akan menerima token ANS-109 yang dikirimkan ke dompet mereka untuk menunjukkan bahwa dompet itu telah divouche oleh layanan tersebut.

## Format Transaksi ANS-109 
| Nama Tag | _Opsional?_ | Nilai Tag |
|---|---|---|
|App-Name|Tidak|`Vouch`|
|Vouch-For|Tidak|Alamat Arweave yang sedang divouche dalam transaksi ini|
|App-Version|Ya|`0.1`|
|Verification-Method|Ya| Metode verifikasi identitas seseorang. Contoh - `Twitter`/`Secara Langsung`/`Gmail`/`Facebook`|
|User-Identifier|Ya|Identifier untuk pengguna berdasarkan Metode Verifikasi. Contoh - `abhav@arweave.org`|

## Sumber Daya
* [VouchDAO](https://vouch-dao.arweave.dev)
* [Kontrak VouchDAO](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)