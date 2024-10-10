---
locale: ja
---
### Arseeding JS SDK 

---

*Arseedingのマニフェスト機能を簡単に使用するためのガイドです。*

## Getting Started

### SDKのインストール
```bash
npm i arseeding-js
```

`demo.js`というファイルを作成し、以下のコードをコピーします。

```jsx
import {uploadFolderAndPay} from "arseeding-js/cjs/uploadFolder";

const run = async () => {
  const path = 'Your Folder path'
  const priv = 'YOUR PRIVATE KEY'
  const arseedUrl = 'https://arseed.web3infra.dev'
  const tag = '<chaintype-symbol-id>' // everpay supported all token tag (chainType-symbol-id)
  const indexFile = ''

  const res = await uploadFolderAndPay(path,priv,arseedUrl,tag, indexFile)
  console.log(res)
}

// review manifest Data
curl --location --request GET 'https://arseed.web3infra.dev/{res.maniId}'
```


#### 設定メモ:

- `YOUR PRIVATE KEY` を使用してECCキーを設定します。プライベートキーに対応するウォレットにeverPayの資産があることを確認してください。
- `arseedUrl` はArseedingバックエンドサービスのURLです。ここでは、permadaoによって提供される公開のArseedingサービス（https://arseed.web3infra.dev）を使用します。
- `payUrl` は設定が必要なeverPayサービスのURLです: [https://api.everpay.io](https://api.everpay.io/)
- `path` はアップロードしたいフォルダーのパスです。例えば、静的ウェブサイトをデプロイする場合、フロントエンドプロジェクトはプロジェクトがコンパイルされた後にビルドまたはdistフォルダーを生成しますので、そのフォルダーのパスを選択します。
- `tag` は選択する支払い `トークンタグ` です。MetaMaskアドレスがeverPayに保有している場合、usdcの場合、[getTokenTagByEver('usdc')](https://web3infra.dev/docs/arseeding/sdk/arseeding-js/getTokenTag)を介してusdcタグを取得できます。別のトークンで支払いを希望する場合は、トークン名を入力して指定されたタグを取得してください。
- `indexFile` はオプションです。指定しない場合、`index.html`（存在する場合）またはnullがデフォルト値として使用されます。フォルダーがフロントエンドプロジェクトのビルドフォルダーである場合、indexFileを指定する必要はありません。

設定を準備した後、`uploadFolderAndPay(path,priv,url,payCurrency)`を呼び出して、マニフェストを介してフォルダー内のすべてのファイルをweb3infraのArseedingノードにアップロードします。

```bash
node demo.js
```

return:

```tsx
{
  fee: '0.004218',
  maniId: 'EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE',
	everHash:[
			'0x46744320be6529c48bf18c348fa181facef3d9d6d920a24687dc9964ba3ead0a'
	]
}
```

## Download data-## データアクセスページのダウンロード

`maniId` は戻り値の中に見つけることができます。上記のmaniIdは `EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE` です。

このチュートリアルでは、Docusaurusフロントエンドプロジェクトをアップロードしており、そのプロジェクト内で `yarn build` を実行すると、アップロードしたビルドフォルダーが生成されます。今、`maniId`を介してサイトにアクセスできます！

ブラウザに次のように入力します:


```bash
https://arseed.web3infra.dev/EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE
```
このウェブサイトにアクセスできるようになり、永久に利用可能です！

---

参考文献とさらなる学習:
* [Arseeding Documentation](https://web3infra.dev/docs/arseeding/introduction/lightNode)
* Arseedingのアップロードマニフェストチュートリアルは[こちら](https://web3infra.dev/docs/arseeding/sdk/arseeding-js/manifest/)を参照してください。