---
locale: zh
---
# Bundlr CLI

## 要求
部署需要一个Arweave钱包。如果目录的大小超过100kb，则需要一个<a href="#fund-bundlr">资助的Bundlr实例</a>。

## 安装

要安装Bundlr CLI，请运行以下命令
<CodeGroup>
 <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install -g @bundlr-network/client
```
 </CodeGroupItem>
 <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn global add @bundlr-network/client
```
  </CodeGroupItem>
</CodeGroup>


## 静态构建
Permaweb应用程序是静态生成的，这意味着代码和内容是预先生成并存储在网络上的。

下面是一个静态网站的示例。要将其部署到Permaweb上，将`build`目录作为`upload-dir`标志的参数传递进去。

```js
|- build
    |- index.html
    |- styles.css
    |- index.js
```

## 部署

```console
bundlr upload-dir [文件夹路径] -w [钱包路径] --index-file [index.html] -c [货币] -h [Bundlr节点]
```

<br/>
<img src="https://arweave.net/XfcrDTZsBn-rNwPuIiftHsLCyYczxgIZeIcr10l1-AM" />

## 其他命令

#### 资助Bundlr

```console
bundlr fund [金额] -h [Bundlr节点] -w [钱包路径] -c [货币]
```
<sub style="float:right">\* 资助Bundlr实例可能需要最多30分钟的处理时间</sub>

#### 检查Bundlr余额
```console
bundlr balance [钱包地址] -h [Bundlr节点] -c arweave
```