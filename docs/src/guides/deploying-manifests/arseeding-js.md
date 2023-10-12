### Arseeding  JS SDK 

---

*The guide of how to easily use the Manifest feature in Arseeding.*
## Getting Started

### Installing the SDK
```bash
npm i arseeding-js
```

Create a `demo.js`, and copy the following code into it.

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


Configuration Notes:

- Populate your ECC key with `YOUR PRIVATE KEY`. Make sure that the wallet corresponding to the private key has assets in everPay.
- `arseedUrl` is the URL of the Arseeding backend service, here we use the public Arseeding service provided by permadao: https://arseed.web3infra.dev.
- `payUrl` is the URL of the everPay service that needs to be configured: [https://api.everpay.io](https://api.everpay.io/)
- `path` is the path to the folder you want to upload, for example, to deploy a static website, the front-end project will generate a build or dist folder after the project is compiled, just choose the path to that folder.
- `tag` is the payment `token tag` you need to select, if your MetaMask address held in everPay is usdc, you can get the usdc tag via [getTokenTagByEver('usdc')](https://web3infra.dev/docs/arseeding/sdk/arseeding-js/getTokenTag),If you want to pay with another token, just fill in the token name to get the specified tag.
- `indexFile` is optional,if you don't pass it, `index.html`(if exist) or null will be default value, if the folder is a front-end project build folder you don't need pass indexFile.

After preparing the configuration, call `uploadFolderAndPay`(path,priv,url,payCurrency) to upload all the files under your folder to web3infra's Arseeding node by means of manifest.

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

## Download data-Access page

The `maniId` can be found in the returned result, the maniId above is EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE

In this tutorial, we are uploading a Docusaurus front-end project, and running `yarn build` under that project will generate a build folder, which is the one we uploaded. Now, we can access the site via `maniId`!

In your browser, enter:

```bash
https://arseed.web3infra.dev/EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE
```
You can now access this website, and it will be permanently available!

---

References and Further Reading:
* [Arseeding Documentation](https://web3infra.dev/docs/arseeding/introduction/lightNode)
* Follow the Arseeding Upload Manifest tutorial [here](https://web3infra.dev/docs/arseeding/sdk/arseeding-js/manifest/)。