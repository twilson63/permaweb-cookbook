---
locale: zh
---
# arkb

## 要求
使用`arkb`进行部署时需要一个Arweave钱包以支付数据交易费用。

## 安装

要安装`arkb`，请运行
<CodeGroup>
 <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install -g arkb
```
 </CodeGroupItem>
 <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add ar-gql
```
  </CodeGroupItem>
</CodeGroup>

## 部署

当上传文件目录或Permaweb应用程序时，默认情况下`arkb`将每个文件单独部署为L1交易，并提供使用Bundlr捆绑交易的选项。

## 静态构建
Permaweb应用程序是静态生成的，这意味着代码和内容是提前生成并存储在网络上的。

下面是一个静态网站的示例。要将其部署到Permaweb，将`build`目录作为`deploy`标志的参数传入。

```js
|- build
    |- index.html
    |- styles.css
    |- index.js
```

#### 默认部署

作为L1交易部署可能需要更长时间来确认，因为它直接上传到Arweave网络。

```console
arkb deploy [folder] --wallet [钱包路径]
```
<br/>
<img src="https://arweave.net/_itbo7y4H0kDm4mrPViDlc6bt85-0yLU2pO2KoSA0eM" />

#### 捆绑部署
要使用Bundlr进行部署，您需要<a href="#fund-bundlr">为Bundlr节点提供资金</a>。

Bundlr node2允许在100kb以下的免费交易。

您可以使用`tag-name/tag-value`语法为部署添加自定义标识标签。

```console
arkb deploy [folder] --use-bundler [bundlr节点] --wallet [钱包路径] --tag-name [标签名称] --tag-value [标签值]
```
<br/>
<img src="https://arweave.net/jXP0mQvLiRaUNYWl1clpB1G2hZeO07i5T5Lzxi3Kesk" />

## 其他命令

#### 为Bundlr提供资金

```console
arkb fund-bundler [金额] --use-bundler [bundlr节点]
```

<sub style="float:right">\* 为Bundlr实例提供资金可能需要多达30分钟的处理时间</sub>
#### 保存密钥文件

```console
arkb wallet-save [钱包路径]
```

保存密钥后，您现在可以像这样运行没有--wallet-file选项的命令

```console
arkb deploy [目录路径]
```

#### 检查钱包余额
```console
arkb balance
```