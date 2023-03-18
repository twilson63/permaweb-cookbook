# Spheron

The Spheron Protocol is a decentralized platform designed to streamline the creation of modern dapps. It offers a seamless experience for developers, allowing for quick deployment, automatic scaling, and personalized content delivery on decentralized networks.

Spheron uses a GitHub integration to handle continuous deployments and gives us the ability to integrate custom DNS to any given deployment.

## What you will need to set up a Spheron account

* A GitHub account
* A permaweb application identifier and is deployed on the permaweb

::: tip
To deploy Arweave applications using Spheron, you will need the Pro Plan which is $20/month
:::

## Authentication/Log in

Spheron relies on GitHub, GitLab or BitBucket repo's for their deployments, similar to Vercel. 

To log in to Spheron, head to the [Spheron Aqua dashboard](https://app.spheron.network/) and select your preferred authentication.

## Import repo

Once logged in, you will be presented with the user dashboard. Click the "New Project" button in the top right of the dashboard to import a repo. Select the repo you want and choose the option to deploy to Arweave. 

## Connecting to DNS

Now that you've imported your project and deployed, go to the "Domains" tab. Enter the domain name, environment and select a domain to point the deployment to. 

Before continuing, you will be asked to verify your configured records. Update the record in your domain manager. Updating a DNS can take up to 72 hours. You will see something similar to the image below:

<img src="https://arweave.net/8BNk8spFayPCdCHx1XrsoMtMdX1-qsDYAORPJ8BNZ3Y" />

Once updated, you will need to verify in Spheron. Click the `Verify` button and you should be all set and ready to go. Now whenever you deploy a new version to GitHub, your domain will be updated with the newest version!🎉


::: tip
To create a fully decentralized application, be sure to use [ArNS](https://ar.io/arns) or any decentralized DNS server 
:::
## Summary

Spheron is a straight-forward way for deploying Permaweb applications to Arweave, and redirecting them to custom domains. Combining continuous integration and continuous deployment, ensuring a smooth developer experience all round!


