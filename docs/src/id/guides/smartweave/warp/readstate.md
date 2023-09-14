---
locale: id
---

# SDK Warp (SmartWeave) - ReadState

Status kontrak SmartWeave dihitung melalui evaluasi malas, yang berarti evaluasi status terjadi saat membaca, bukan saat menulis. Saat membaca kontrak, SDK mengumpulkan semua interaksi status, mengurutkannya, dan menjalankannya terhadap kontrak sumber menggunakan pola reduce atau fold.

## Readstate Dasar

```ts
const warp = WarpFactory.forMainnet()
const CONTRACT_ID = '_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk'

const result = await warp.contract(CONTRACT_ID).readState()

// log current state
console.log(result.cachedValue.state)
```

## Readstate Lanjutan

Beberapa kontrak membaca status kontrak lain atau memanggil atau menulis ke kontrak lain. Saat meminta status kontrak ini, perlu ada pengaturan evaluasi.

```ts
const warp = WarpFactory.forMainnet()
const CONTRACT_ID = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

const result = await warp.contract(CONTRACT_ID)
  .setEvaluationOptions({
    internalWrites: true,
    allowBigInt: true
  })
  .readState()

// log current state
console.log(result.cachedValue.state)
```

### Opsi Evaluasi Umum

| Nama | Deskripsi |
| ---- | ----------- |
| internalWrites | Mengevaluasi kontrak yang berisi tulisan internal ke kontrak lain |
| allowBigInt | Mengevaluasi kontrak yang menggunakan BigInt yang dapat Anda pelajari lebih lanjut tentang bigInt [Dokumentasi MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) |
| unsafeClient | Nilai ini bisa `allow`, `skip`, atau `throw`. Anda sebaiknya menghindari penggunaan unsafeClient dalam kontrak Anda karena dapat menghasilkan hasil yang tidak dapat diprediksi.  |

## Readstate dari BlockHeight atau Sortkey Tertentu

Anda mungkin ingin melihat status sebelumnya, bukan status saat ini, dengan menyediakan blockHeight Anda dapat membaca status kontrak pada block height tertentu.

```ts
const { sortKey, cachedValue } = await contract.readState(1090111)
```

## Ringkasan

Membaca status saat ini dari Kontrak SmartWeave melakukan evaluasi status dengan menarik semua interaksi dan memproses setiap interaksi melalui metode fold. Pendekatan ini unik untuk permaweb dan memerlukan pemahaman unik tentang bagaimana kode Kontrak SmartWeave Anda dieksekusi.