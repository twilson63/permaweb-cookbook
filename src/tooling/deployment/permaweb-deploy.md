---
title: "Permaweb Deploy"
description: "Deploy web applications and files to the Permaweb using the permaweb-deploy CLI tool with automated ArNS updates"
difficulty: "Beginner"
stability: "Stable"
timeEstimate: "10 minutes"
---

# Permaweb Deploy

`permaweb-deploy` is a Node.js command-line tool that streamlines deployment of web applications and files to the Permaweb using Arweave. It uploads your build folder or single files, creates Arweave manifests, and automatically updates ArNS (Arweave Name Service) records with the new transaction ID.

## Features

- **Turbo SDK Integration**: Fast, reliable file uploads to Arweave
- **Arweave Manifest v0.2.0**: Creates manifests with fallback support for SPAs
- **ArNS Updates**: Automatically updates ArNS records via ANT with new transaction IDs
- **Automated Workflow**: Integrates seamlessly with GitHub Actions
- **Git Hash Tagging**: Automatically tags deployments with Git commit hashes
- **404 Fallback Detection**: Automatically detects and sets 404.html as fallback
- **Network Support**: Supports mainnet, testnet, and custom ARIO process IDs
- **Flexible Deployment**: Deploy folders or single files

## Installation

```bash
npm install permaweb-deploy --save-dev
```

For Yarn users:
```bash
yarn add permaweb-deploy --dev --ignore-engines
```

## Prerequisites

### Wallet Configuration

**For Arweave signer (default):**
Encode your Arweave wallet key in base64 format:

```bash
base64 -i wallet.json | pbcopy
```

Set the encoded wallet as the `DEPLOY_KEY` environment variable.

**For Ethereum/Polygon/KYVE signers:**
Use your raw private key (no encoding needed) as the `DEPLOY_KEY`.

:::warning Security Best Practice
Use a dedicated wallet for deployments to minimize security risks. Ensure your wallet has sufficient Turbo Credits for uploads.
:::

## Basic Usage

Add deployment scripts to your `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "npm run build && permaweb-deploy --arns-name my-app"
  }
}
```

Deploy your application:
```bash
npm run deploy
```

## CLI Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--arns-name` | `-n` | **Required.** The ArNS name to update | - |
| `--ario-process` | `-p` | ARIO process (`mainnet`, `testnet`, or process ID) | `mainnet` |
| `--deploy-folder` | `-d` | Folder to deploy | `./dist` |
| `--deploy-file` | `-f` | Deploy a single file instead of a folder | - |
| `--undername` | `-u` | ANT undername to update | `@` |
| `--ttl-seconds` | `-t` | TTL in seconds for the ANT record (60-86400) | `3600` |
| `--sig-type` | `-s` | Signer type (`arweave`, `ethereum`, `polygon`, `kyve`) | `arweave` |

## Examples

**Deploy Application**
```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app
```

**Deploy Specific Folder**
```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --deploy-folder ./build
```

**Deploy Single File**
```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --deploy-file ./script.lua
```

**Deploy to Undername**
```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --undername staging
```

**Deploy with Custom TTL**
```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --ttl-seconds 7200
```

**Deploy with Ethereum Signer**
```bash
DEPLOY_KEY=<ETH_PRIVATE_KEY> npx permaweb-deploy --arns-name my-app --sig-type ethereum
```

## Network Configurations

**Mainnet (Default)**
```json
{
  "scripts": {
    "deploy": "npm run build && permaweb-deploy --arns-name my-app"
  }
}
```

**Testnet**
```json
{
  "scripts": {
    "deploy:test": "npm run build && permaweb-deploy --arns-name my-app --ario-process testnet"
  }
}
```

**Custom Process ID**
```json
{
  "scripts": {
    "deploy:custom": "npm run build && permaweb-deploy --arns-name my-app --ario-process PROCESS_ID"
  }
}
```

## GitHub Actions Integration

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Permaweb
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run deploy
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
```

## Deployment Output

After successful deployment, you'll see output similar to:

```
-------------------- DEPLOY DETAILS --------------------
Tx ID: abc123def456ghi789jkl012mno345pqr678stu901v
ArNS Name: my-app
Undername: @
ANT: xyz789abc012def345ghi678jkl901mno234pqr567s
AR IO Process: bh9l1cy0aksiL_x9M359faGzM_yjralacHIUo8_nQXM
TTL Seconds: 3600
--------------------------------------------------------
Deployed TxId [abc123def456ghi789jkl012mno345pqr678stu901v] to name [my-app] for ANT [xyz789abc012def345ghi678jkl901mno234pqr567s] using undername [@]
```

## Security Best Practices

- **Use dedicated wallets**: Create deployment-specific wallets to minimize security risks
- **Secure secret management**: Never commit your `DEPLOY_KEY` to version control
- **Build verification**: Always check your build for exposed secrets before deployment
- **Sufficient credits**: Ensure your wallet has enough Turbo Credits before deployment
- **Base64 encoding**: Arweave wallets must be base64 encoded for the deployment script

## Troubleshooting

### Common Errors

***"ARNS_NAME not configured"***
- Ensure you're passing the `--arns-name` flag with a valid ArNS name

***"DEPLOY_KEY not configured"***  
- Verify your base64 encoded wallet is set as the `DEPLOY_KEY` environment variable

***"deploy-folder does not exist"***
- Check that your build folder exists and the path is correct
- Run your build command first

***"ARNS name does not exist"***
- Verify the ArNS name is correct and exists in the specified network

***"Upload timeouts"***
- Files have a 10-second upload timeout
- Large files may fail and require optimization

***"Insufficient Turbo Credits"***
- Check your wallet balance and add more credits if needed

### Debug Information

Enable verbose logging by setting the `DEBUG` environment variable:

```bash
DEBUG=permaweb-deploy* npm run deploy
```

## Dependencies

- **@ar.io/sdk**: ANT operations and ArNS management
- **@ardrive/turbo-sdk**: Fast file uploads to Arweave  
- **@permaweb/aoconnect**: AO network connectivity
- **yargs**: CLI argument parsing

## Next Steps

1. **ArNS Setup**: [ArNS Names](../fundamentals/accessing-arweave-data/arns.md)
2. **Turbo Credits**: [Turbo SDK](https://docs.ardrive.io/docs/turbo/what-is-turbo.html)
3. **GitHub Actions**: [CI/CD Integration](/tooling/deployment/github-action)

## Resources

- **GitHub Repository**: [permaweb/permaweb-deploy](https://github.com/permaweb/permaweb-deploy)
- **Turbo SDK Documentation**: [docs.ardrive.io/turbo](https://docs.ardrive.io/docs/turbo/what-is-turbo.html)
- **ArNS Documentation**: [ar.io/arns](https://ar.io/arns/)
- **Arweave Ecosystem**: [arweave.org](https://arweave.org)
