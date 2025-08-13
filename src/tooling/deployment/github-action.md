# Github Action

::: warning
This guide is for educational purposes only, and you should use to learn options of how you might want to deploy your application. In this guide, we are trusting a 3rd party resource `github` owned by `microsoft` to protect our secret information, in their documentation they encrypt secrets in their store using `libsodium sealed box`, you can find more information about their security practices here. https://docs.github.com/en/actions/security-guides/encrypted-secrets
:::

Github Actions are CI/CD pipelines that allows developers to trigger automated tasks via events generated from the github workflow system. These tasks can be just about anything, in this guide we will show how you can use github actions to deploy your permaweb application to the permaweb using permaweb-deploy and ArNS.

::: tip
This guide requires understanding of github actions, and you must have some Turbo Credits and an ArNS name. Go to https://ar.io/arns/ for more details on acquiring an ArNS name.
:::

::: warning
This guide does not include testing or any other checks you may want to add to your production workflow.
:::

## Prerequisites

Before setting up GitHub Actions deployment, you'll need:

1. **An Arweave wallet** with sufficient Turbo Credits for deployment
2. **An ArNS name** that you own
3. **A built application** (e.g., in a `./dist` folder)

## Install permaweb-deploy

Add permaweb-deploy as a development dependency to your project:

```console
npm install --save-dev permaweb-deploy
```

## Configure Deployment Script

Add a deployment script to your `package.json` that builds your application and deploys it using permaweb-deploy:

```json
{
  "scripts": {
    "dev": "vuepress dev src",
    "build": "vuepress build src",
    "deploy": "npm run build && permaweb-deploy --arns-name YOUR_ARNS_NAME"
  }
}
```

Replace `YOUR_ARNS_NAME` with your actual ArNS name (e.g., `my-app`).

### Advanced Configuration

You can customize the deployment with additional options:

```json
{
  "scripts": {
    "deploy": "npm run build && permaweb-deploy --arns-name my-app --deploy-folder ./dist --undername @"
  }
}
```

Available options:
- `--arns-name` (required): Your ArNS name
- `--deploy-folder`: Folder to deploy (default: `./dist`)
- `--undername`: ANT undername to update (default: `@`)
- `--ario-process`: ARIO process (default: mainnet)

## Create GitHub Action

Create a `.github/workflows/deploy.yml` file in your repository:

```yml
name: Deploy to Permaweb

on:
  push:
    branches:
      - "main"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20.x
      - run: npm install
      - run: npm run deploy
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
```

## Setup GitHub Secrets

### 1. Prepare Your Wallet

First, encode your Arweave wallet as base64:

```console
base64 -i wallet.json
```

Copy the output (it will be a long base64 string).

### 2. Add Secret to GitHub

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `DEPLOY_KEY`
5. Value: Paste the base64 encoded wallet string
6. Click **Add secret**

## Fund Your Wallet

Ensure your deployment wallet has sufficient Turbo Credits. You can fund it using:

```console
# Check current balance
npx @ardrive/turbo-cli balance --wallet-file wallet.json

# Add credits (amount in Winston - 1 AR = 1,000,000,000,000 Winston)
npx @ardrive/turbo-cli top-up --value 500000000000 --wallet-file wallet.json
```

::: warning Security Best Practices
- Use a dedicated wallet solely for deployments
- Keep minimal funds in the deployment wallet
- Never commit wallet files to your repository
- Regularly rotate deployment keys
:::

## Test Your Deployment

### Local Testing

Test your deployment locally before pushing:

```console
DEPLOY_KEY=$(base64 -i wallet.json) npm run deploy
```

### Verify Deployment

After a successful GitHub Action run:

1. Check the action logs for the deployment transaction ID
2. Wait 10-20 minutes for ArNS propagation
3. Visit your ArNS name: `https://YOUR_ARNS_NAME.arweave.net`

## Troubleshooting

**Common Issues:**

1. **Insufficient Credits**: Ensure your wallet has enough Turbo Credits
2. **ArNS Propagation**: Wait 10-20 minutes after deployment for changes to appear
3. **Build Failures**: Ensure your build command works locally first
4. **Secret Issues**: Verify the `DEPLOY_KEY` secret is properly set and base64 encoded

**Check Deployment Status:**

Monitor your deployments through:
- GitHub Actions logs
- ArNS resolver: `https://arns.arweave.net/resolve/YOUR_ARNS_NAME`

:tada: You now have automated permaweb deployment with GitHub Actions!

Your application will automatically deploy to the permaweb whenever you push to the main branch, and your ArNS name will point to the latest version.