---
title: "Deployment Tools"
description: "Tools and methods for deploying applications and content to the Permaweb"
---

# Deployment Tools

This section covers the various tools and methods available for deploying applications and content to the Permaweb. Choose the deployment method that best fits your workflow and requirements.

## Primary Deployment Method

**[Permaweb Deploy](permaweb-deploy.md)** - **Recommended**
- Node.js CLI tool for streamlined deployment
- Automatic ArNS updates and manifest creation
- GitHub Actions integration
- Support for multiple signer types
- Turbo SDK integration for fast uploads

## Alternative Deployment Methods

**[arkb](arkb.md)** - Command Line Interface
- Direct Arweave CLI deployment
- Manual transaction management
- Suitable for advanced users

**[GitHub Actions](github-action.md)** - CI/CD Integration
- Automated deployment workflows
- Integration with permaweb-deploy
- Version control integration

## Choosing Your Deployment Method

### For Beginners
Start with **Permaweb Deploy** - it provides the most streamlined experience with automatic ArNS updates and comprehensive error handling.

### For Advanced Users
- Use **arkb** for direct control over deployment parameters
- Combine **GitHub Actions** with permaweb-deploy for automated workflows

### For Teams
Implement **GitHub Actions** workflows to ensure consistent deployment processes across your team.

## Prerequisites

Before deploying, ensure you have:

1. **Arweave Wallet** with sufficient Turbo Credits
2. **ArNS Name** (for permaweb-deploy)
3. **Built Application** ready for deployment

## Next Steps

1. **Get Started**: [Permaweb Deploy](permaweb-deploy.md)
2. **Learn ArNS**: [ArNS Names](../../fundamentals/accessing-arweave-data/arns.md)
3. **Understand Manifests**: [Manifests & Path Resolution](../../fundamentals/accessing-arweave-data/manifests.md)
4. **Explore Turbo**: [Turbo SDK](https://docs.ardrive.io/docs/turbo/what-is-turbo.html)