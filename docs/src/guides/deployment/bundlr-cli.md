# Bundlr CLI

## Requirements
An Arweave wallet is required to deploy. If the size of the directory is greater than 100kb, a <a href="#fund-bundlr">funded Bundlr instance is required</a>.

## Installation

To install the Bundlr CLI run 
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


## Static Build
Permaweb applications are statically generated, meaning that the code and content are generated ahead of time and stored on the network.

Below is an example of a static site. To deploy this to the Permaweb, the `build` directory will be passed in as the argument for the `upload-dir` flag.

```js
|- build
    |- index.html
    |- styles.css
    |- index.js
```

## Deploying

```console
bundlr upload-dir [path to folder] -w [path to wallet] --index-file [index.html] -c [currency] -h [bundlr node]
```

<br/>
<img src="https://arweave.net/XfcrDTZsBn-rNwPuIiftHsLCyYczxgIZeIcr10l1-AM" />

## Other Commands

#### Fund Bundlr

```console
bundlr fund [amount] -h [bundlr node] -w [path to wallet] -c [currency]
```
<sub style="float:right">\* Funding a Bundlr instance can take up to 30 minutes to process</sub>

#### Check Bundlr Balance
```console
bundlr balance [wallet address] -h [bundlr node] -c arweave
```