## with Akord CLI

You can generate manifests using [Akord CLI](https://github.com/Akord-com/akord-cli).

### Before you get started

> Requires NodeJS - https://nodejs.org

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install -g @akord/akord-cli
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn global add @akord/akord-cli
```

  </CodeGroupItem>
</CodeGroup>

### Login to Akord (you can create an account [here](https://v2.akord.com/signup))
Once you have the CLI installed, log in by following the prompts to authenticate with your Akord username and password.

```console
akord login {your_email_address}
```

### Choose your vault
You'll need a vault id of your public vault to generate the manifest. To list your vaults:

```console
akord vault:list
```

### Generate manifest
Now that you are logged in and you have a vault id, you can generate the manifest for your files and contents. \
If you do not have "index.html" file in your vault, you can provide a custom index:

```console
akord manifest:generate {vaultId} --index "my-custom-index.html"
```

After generating the manifest, a file named manifest.json will appear in your vault. Once it's confirmed on the Arweave blockchain and propagated by the gateways, your public vault will be available on the permaweb under following link: https://arweave.net/{uri}

## with AkordJS

Alternatively, you can generate your manifests using [AkordJS](https://github.com/Akord-com/akord-js) package.

### Before you get started

> Requires NodeJS - https://nodejs.org

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install @akord/akord-js
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add @akord/akord-js
```

  </CodeGroupItem>
</CodeGroup>

### Let's generate manifest

### Generate a manifest automatically from files inside a vault
```js
import { Akord, Auth } from '@akord/akord-js'

// First, let's initialize Akord instance
// In order to use AkordJS, you first need an Akord account. 
// Sign up for Akord here: https://v2.akord.com/signup
const { wallet } = await Auth.signIn(email, password);
const akord = await Akord.init(wallet);

// Let's create a public vault to contain our files
const { vaultId } = await akord.vault.create("My hello world app", { public: true });

// Let's upload a Hello world html file
const { stackId } = await akord.stack.create(
  vaultId,
  ["<html><body><h1>Hello World</h1></body></html>"],
  { name: "index.html", mimeType: "text/html" }
);

// Let's generate a manifest
const { uri } = await akord.manifest.generate(vaultId);
// In few minutes, you will be able to access your manifest here: https://arweave.net/{uri}
```


### Upload your own manifest file manually
```js
import { Akord, Auth } from '@akord/akord-js'

// First, let's initialize Akord instance
// In order to use AkordJS, you first need an Akord account. 
// Sign up for Akord here: https://v2.akord.com/signup
const { wallet } = await Auth.signIn(email, password);
const akord = await Akord.init(wallet);

// let's define our manifest
const manifest = {
  "manifest": "arweave/paths",
  "version": "0.2.0",
  "index": {
    "path": "index.html"
  },
  "fallback": {
    "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
  }
  "paths": {
    "index.html": {
      "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
    },
    "js/app.js": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/mobile.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "assets/img/logo.png": {
      "id": "QYWh-QsozsYu2wor0ZygI5Zoa_fRYFc8_X1RkYmw_fU"
    },
    "assets/img/icon.png": {
      "id": "0543SMRGYuGKTaqLzmpOyK4AxAB96Fra2guHzYxjRGo"
    }
  }
};

// Let's create a public vault to contain the manifest
const { vaultId } = await akord.vault.create("My manifest", { public: true });

const { uri } = await akord.manifest.generate(vaultId, manifest);
// In few minutes, you will be able to access your manifest here: https://arweave.net/{uri}
```

### Congrats!

Once the transaction is accepted on Arweave network (it takes 5-15 minutes on average), \
you can access the permaweb URL in your web browser by replacing {uri} with your unique manifest tx id:
https://arweave.net/{uri}

## with Akord web app

From the [web app](https://v2.akord.com/login) it's also possible to create the manifest and add it to your vault by selecting "Add Manifest" from the "+" button inside your public permanent vault.

The action will automatically create a manifest for all of the files & folders within the vault.

You can download your manifest and view it in the media gallery by clicking the title in the vault.

It's as simple as that!

## Resources & further reading
- [Generating manifests in Akord vaults](https://docs.akord.com/nft-projects/get-the-arweave-urls)
- [Publishing a website to the permaweb](https://docs.akord.com/api-and-dev-tools/learn/publishing-a-website)
- [AkordJS manifest module](https://github.com/Akord-com/akord-js?tab=readme-ov-file#manifest)