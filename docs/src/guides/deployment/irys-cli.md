# Irys CLI

## Requirements

An Arweave wallet is required to deploy. If the size of the directory is greater than 100kb, a <a href="#fund-irys">funded Irys instance is required</a>.

## Installation

To install the Irys CLI run
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
irys upload-dir [path to folder] -w [path to wallet] --index-file [index.html] -c [currency] -h [irys node]
```

<br/>
<img src="https://arweave.net/XfcrDTZsBn-rNwPuIiftHsLCyYczxgIZeIcr10l1-AM" />

## Other Commands

#### Fund Irys

```console
irys fund [amount] -h [Irys node] -w [path to wallet] -c [currency]
```

<sub style="float:right">\* Funding an Irys instance can take up to 30 minutes to process</sub>

#### Check Irys Balance

```console
irys balance [wallet address] -h [Irys node] -c arweave
```
