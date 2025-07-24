---
locale: zh
---

### Arseeding  JS SDK 

---

*下面将为大家介绍如何便捷的在 Arseeding 中使用 Manifest 功能。*
## 使用

### 安装 SDK
```bash
npm i arseeding-js
```

创建一个 demo.js, 将以下代码复制进去。

```jsx
import {uploadFolderAndPay} from "arseeding-js/cjs/uploadFolder";

const run = async () => {
  const path = 'Your Folder path'
  const priv = 'YOUR PRIVATE KEY'
  const arseedUrl = 'https://arseed.web3infra.dev'
  const tag = '<chaintype-symbol-id>' // everPay 支持的 token tag (chainType-symbol-id)
  const indexFile = ''

  const res = await uploadFolderAndPay(path,priv,arseedUrl,tag, indexFile)
  console.log(res)
}

// review manifest Data
curl --location --request GET 'https://arseed.web3infra.dev/{res.maniId}'
```


配置说明：

- 将你的 ECC 密钥填充到`YOUR PRIVATE KEY`。确保 private key 对应的钱包在 everPay 拥有资产。
- `arseedUrl` 是 Arseeding 后端服务地址，这里我们使用 permadao 提供的 public  Arseeding 服务：https://arseed.web3infra.dev。
- `payUrl`是需要配置的 everPay 服务的 URL:[https://api.everpay.io](https://api.everpay.io/)
- path 为你想要上传的文件夹的路径，例如，部署静态网站，前端项目编译后会生成 build 或 dist 文件夹，选择该文件夹的路径即可。
- `tag` 是需要选择的支付 `token tag`，如果你的 MetaMask 地址在 everPay 持有的是 usdc，可通过 [getTokenTagByEver('usdc')](./9.getTokenTag.md) 来获取 usdc tag。如果想通过其他代币支付，填入代币名称获取 指定 tag 即可。
- `indexFile` 是可选参数，你可以传入一个该文件夹下最重要的文件名（e.g main.txt)，如果你上传的是一个前端项目的 build 文件夹，则不需要传入此参数。

在准备好配置后，调用 uploadFolderAndPay(path,priv,url,payCurrency) 就可以将你的文件夹下的所有文件通过 manifest 的方式上传到 web3infra 的 Arseeding 节点。

```bash
node demo.js
```

正确执行后终端将返回：

```tsx
{
  fee: '0.004218',
  maniId: 'EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE',
	everHash:[
			'0x46744320be6529c48bf18c348fa181facef3d9d6d920a24687dc9964ba3ead0a'
	]
}
```

## 下载数据-页面访问

在返回的结果中可以找到`maniId`，上文中 maniId 为:EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE 。

在本教程中，我们上传的是一个 docusaurus 前端项目，在该项目下运行 `yarn build` 会生成一个build 文件夹，我们上传的正是这个文件夹。现在，我们可以通过 maniId 来访问这个站点了！

在你的浏览器中输入：

```bash
https://arseed.web3infra.dev/EHeDa8b428L38b972qyHI87YELuZKue1jDI_JWC-aGE
```

就可以访问到这个网站了，并且是永久可用的！
---

参考资料和阅读更多内容：
* [Arseeding 文档](https://web3infra.dev/docs/arseeding/introduction/lightNode)
* 使用 Arseeding 上传 Manifest 教程[在此处](https://web3infra.dev/docs/arseeding/sdk/arseeding-js/manifest/)。