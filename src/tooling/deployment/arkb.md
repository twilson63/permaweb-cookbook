# arkb

## Requirements

An Arweave wallet is required to deploy using `arkb` for covering the data transaction costs.

## Installation

To install `arkb` run
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

## Deploying

When uploading a directory of files or a Permaweb application, by default `arkb` deploys each file separately as an L1 transaction, with the option to bundle the transactions using Bundlr.

## Static Build

Permaweb applications are statically generated, meaning that the code and content are generated ahead of time and stored on the network.

Below is an example of a static site. To deploy this to the Permaweb, the `build` directory will be passed in as the argument for the `deploy` flag.

```js
|- build
    |- index.html
    |- styles.css
    |- index.js
```

#### Default Deployment

Deploying as an L1 transaction can take longer to confirm as it is directly uploaded to the Arweave network.

```console
arkb deploy [folder] --wallet [path to wallet]
```

<br/>
<img src="https://arweave.net/_itbo7y4H0kDm4mrPViDlc6bt85-0yLU2pO2KoSA0eM" />

#### Bundled Deployment

To deploy using Bundlr you will need to <a href="#fund-bundlr">fund a Bundlr node</a>.

Bundlr node2 allows free transactions under 100kb.

You can add custom identifiable tags to the deployment using `tag-name/tag-value` syntax.

```console
arkb deploy [folder] --use-bundler [bundlr node] --wallet [path to wallet] --tag-name [tag name] --tag-value [tag value]
```

<br/>
<img src="https://arweave.net/jXP0mQvLiRaUNYWl1clpB1G2hZeO07i5T5Lzxi3Kesk" />

## Other Commands

#### Fund Bundlr

```console
arkb fund-bundler [amount] --use-bundler [bundlr node]
```

<sub style="float:right">\* Funding a Bundlr instance can take up to 30 minutes to process</sub>

#### Saving Keyfile

```console
arkb wallet-save [path to wallet]
```

After saving your key you can now run commands without the --wallet-file option, like this

```console
arkb deploy [path to directory]
```

#### Check Wallet Balance

```console
arkb balance
```
