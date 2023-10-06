---
locale: id
---

# SDK Warp (SmartWeave) - Penyelenggaraan Kontrak

Kontrak SmartWeave dibuat dengan mengirimkan dua transaksi ke jaringan, yaitu Transaksi Sumber (Source Transaction) dan Transaksi Awal Status (Initial State Transaction). Transaksi sumber berisi kode sumber yang akan digunakan oleh kontrak untuk menentukan status saat ini. Transaksi awal status menyediakan pengidentifikasi kontrak sebagai referensi serta data benih awal yang akan digunakan oleh kontrak sebagai titik awal untuk mengevaluasi status saat ini. Status saat ini dihitung dengan mengakses tindakan-tindakan yang merupakan transaksi yang ditulis ke jaringan dan berisi parameter masukan untuk dieksekusi menggunakan kode sumber yang dievaluasi dan diinisialisasi. Kontrak Warp dapat dibuat menggunakan banyak bahasa yang berbeda dan dapat dievaluasi menggunakan SDK Warp. Panduan ini akan menunjukkan berbagai cara yang dapat Anda gunakan untuk menyelenggarakan Kontrak Warp.

::: tip
Jika Anda ingin mempelajari lebih lanjut tentang penulisan Warp SmartWeaveContracts, cek Warp Academy! [https://academy.warp.cc/](https://academy.warp.cc/)
:::

Mulai dari versi Warp 1.3.0, Anda akan memerlukan plugin untuk menyelenggarakan kontrak dengan Warp. Plugin ini akan memungkinkan Anda untuk menambahkan tanda tangan dompet yang berbeda.

```js
import { DeployPlugin, InjectedArweaveSigner } from 'warp-contracts-plugin-deploy'
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet().use(new DeployPlugin())

...

async function deploy(initState, src) {
  if (window.arweaveWallet) {
    await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'ACCESS_PUBLIC_KEY', 'SIGNATURE']);
  }
  const userSigner = new InjectedArweaveSigner(window.arweaveWallet);
  await userSigner.setPublicKey();

  return warp.deploy({
    wallet: userSigner,
    src,
    initState: JSON.stringify(initState)
  })
}
```

## Empat Cara untuk Menyelenggarakan Kontrak SmartWeave Warp

Ada 4 cara Anda dapat menyelenggarakan Kontrak SmartWeave menggunakan SDK Warp, pilihan-pilihan ini menangani berbagai kasus penggunaan yang mungkin dihadapi oleh pengembang.

-   Perlu menyelenggarakan kontrak dengan sumber kode pada saat yang sama.
-   Perlu menyelenggarakan kontrak di mana sumber kode sudah ada di Permaweb.
-   Perlu menyelenggarakan kontrak melalui pengurutan (sequencer) dan mengarahkannya ke beberapa data menggunakan manifes jalur (path manifest).
-   Perlu menyelenggarakan kontrak melalui Irys dan mendaftarkan kontrak tersebut pada pengurutan (sequencer).

::: tip
Untuk informasi lebih lanjut tentang penyelenggaraan Warp, lihat Readme di GitHub untuk proyek ini. [https://github.com/warp-contracts/warp#deployment](https://github.com/warp-contracts/warp#deployment).
:::

::: warning
Proyek ini dalam pengembangan cepat, sehingga dokumentasi di sini bisa menjadi usang dengan cepat. Jika Anda menemukan bahwa informasinya sudah usang, tolong beri tahu kami di [Permaweb Cookbook Discord Channel](https://discord.gg/Y3DJuFb3qE).
:::

## Contoh

::: tip
Secara default, semua fungsi penyelenggaraan akan dipublikasikan ke Arweave melalui Irys. Setiap opsi memiliki flag yang dapat diatur untuk tidak menggunakan Irys, tetapi mungkin memerlukan banyak konfirmasi untuk jaringan untuk sepenuhnya mengonfirmasi transaksi.
:::

**deploy**

Menyelenggarakan kontrak beserta kode sumber ke Warp Sequencer, ke Irys (L2), ke Arweave.

```ts
const { contractTxId, srcTxId } = await warp.deploy({
	wallet,
	initState,
	data: { "Content-Type": "text/html", body: "<h1>Hello World</h1>" },
	src: contractSrc,
	tags: [{ name: "AppName", value: "HelloWorld" }],
});
```

-   wallet - seharusnya berupa keyfile Arweave (wallet.json) yang diurai sebagai objek JSON yang mengimplementasikan [JWK Interface](https://rfc-editor.org/rfc/rfc7517) atau string 'use_wallet'.
-   initState - adalah objek JSON yang telah diubah menjadi string.
-   data - opsional jika Anda ingin menulis data sebagai bagian dari penyelenggaraan Anda.
-   src - adalah nilai string atau Uint8Array dari kode sumber kontrak.
-   tags - adalah array dari objek nama/nilai `{name: string, value: string}[]`, [Pelajari lebih lanjut tentang tags](../../../concepts/tags.md).

**deployFromSourceTx**

Sudah memiliki sumber kode di Permaweb? Maka deployFromSourceTx adalah alat pilihan Anda! Dengan Permaweb, Anda tidak perlu khawatir tentang perubahan data, sehingga penggunaan ulang kode sumber untuk kontrak adalah pilihan yang bijak.

```ts
const { contractTxId, srcTxId } = await warp.deployFromSourceTx({
	wallet,
	initState,
	srcTxId: "SRC_TX_ID",
});
```

**deployBundled**

Menggunakan endpoint Sequencer Warp Gateway untuk mengunggah item data mentah ke Irys dan mengindekskannya.

```ts
import { createData } from "arbundles";

const dataItem = createData(
	JSON.stringify({
		manifest: "arweave/paths",
		version: "0.1.0",
		index: {
			path: "index.html",
		},
		paths: {
			"index.html": {
				id: "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI",
			},
		},
	}),
	{ tags: [{ "Content-Type": "application/x.arweave-manifest+json" }] },
);
const { contractTxId } = await warp.deployBundled(dataItem.getRaw());
```

**register**

Menggunakan endpoint Sequencer Warp Gateway untuk mengindekskan kontrak yang telah diunggah dengan Irys.

```ts
import Irys from '@irys/sdk'

const irys = new Irys({ 'https://node2.irys.xyz', 'arweave', wallet })
const { id } = await irys.upload('Some Awesome Atomic Asset',  {
  tags: [{'Content-Type': 'text/plain' }]
})
const {
 contractTxId } = await warp.register(id, 'node2')
```

## Ringkasan

Mengapa ada begitu banyak opsi untuk menyelenggarakan kontrak? Metode-metode ini ada untuk mengurangi duplikasi, memungkinkan interaksi kontrak yang lebih canggih, dan memungkinkan fleksibilitas untuk pengujian dan penggunaan protokol smartweave. Permaweb sangat unik dalam arsitekturnya, ia memberikan fitur di mana Anda dapat menyelenggarakan data digital dan kontrak untuk mengelola data tersebut menghasilkan identifikasi transaksi yang sama. Hasilnya adalah data dinamis yang dipasangkan dengan kumpulan data yang tidak berubah. Menyelenggarakan kontrak hanya satu bagian dari SDK Warp, untuk belajar lebih lanjut, teruslah membaca panduan ini!
