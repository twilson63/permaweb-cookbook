---
locale: zh
---

# Irys CLI (Previously Bundlr)

## 要求

部署需要一个 Arweave 钱包。如果目录的大小超过 100kb，则需要一个<a href="#fund-irys">资助的 Irys 实例</a>。

## 安装

要安装 Irys CLI，请运行以下命令
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install -g @irys/sdk
```

 </CodeGroupItem>
 <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn global add @irys/sdk
```

  </CodeGroupItem>
</CodeGroup>

## 静态构建

Permaweb 应用程序是静态生成的，这意味着代码和内容是预先生成并存储在网络上的。

下面是一个静态网站的示例。要将其部署到 Permaweb 上，将`build`目录作为`upload-dir`标志的参数传递进去。

```js
|- build
    |- index.html
    |- styles.css
    |- index.js
```

## 部署

```console
irys upload-dir [文件夹路径] -w [钱包路径] --index-file [index.html] -c [货币] -h [Irys]
```

<br/>
<img src="https://arweave.net/XfcrDTZsBn-rNwPuIiftHsLCyYczxgIZeIcr10l1-AM" />

## 其他命令

#### 资助 Irys

```console
irys fund [金额] -h [Irys节点] -w [钱包路径] -c [货币]
```

<sub style="float:right">\* 资助 Irys 实例可能需要最多 30 分钟的处理时间</sub>

#### 检查 Irys 余额

```console
irys balance [钱包地址] -h [Irys节点] -c arweave
```
