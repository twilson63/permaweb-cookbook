# ServerSide DNS Integration

So you have a permaweb application and it is on the permaweb, but you also have a specific domain that you want users to use to access this app. mydomain.com, to connect your domain to a permaweb app, you have several options, this option we will show here is a called a server-side redirect. The redirect occurs as a reverse proxy so that the user remains on mydomain.com in their browser, while behind the scenes the application is being served from the permaweb.

::: tip
You can use any reverse proxy to setup a server-side redirect, in this guide we will be using deno and deno.com a lightweight edge hosting service.
:::

## What you will need to setup a reverse proxy using deno.com

* A deno.com account, which at the time of this writting is free.
* A domain with access to the DNS Settings
* A permaweb application identifier and is deployed on the permaweb

## Create proxy on Deno.com

Deno Deploy is a distributed system that runs at the edge. 35 regions worldwide. Open your browser to [https://deno.com](https://deno.com) and click sign in or sign up if you do not have an account. 

Click on `New Project` and Click `Play`

The deno playground will allow us to create a proxy without having to leave the browser.

Copy the following code:

```ts
import { serve } from "https://deno.land/std/http/mod.ts";

const APP_ID = "YOUR AREWEAVE IDENTIFIER"

const fileService = `https://arweave.net/${APP_ID}`;

// handle requests
async function reqHandler(req: Request) {
  const path = new URL(req.url).pathname;
  // proxy to arweave.net
  return await fetch(fileService + path).then(res => {
    const headers = new Headers(res.headers)
    // instruct server to leverage the edge cache
    headers.set('cache-control', 's-max-age=600, stale-while-revalidate=6000')

    // return response from arweave.net
    return new Response(res.body, {
      status: res.status,
      headers
    })
  });
}

// listen for requests
serve(reqHandler, { port: 8100 });
```

This proxy server will receive requests from mydomain.com and proxy the request to arweave.net/APP_ID and then return the response as mydomain.com. Your APP_ID is the TX_ID identifier for you permaweb application.

Click `Save and Deploy`

## Connecting to DNS

In Project Settings go to the domains section and click to add a domain.

Enter `mydomain.com` domain and follow the instructions to modify your DNS settings to point to the deno deploy edge network.

It may take a few minutes to resolve to the dns, but once resolved your app will now be rendering from mydomain.com.

:tada: Congrats you have published a server-side redirect to your permaweb application.

::: warning
Note that any changes to your application will generate a new TX_ID and you will need to modify that TX_ID to publish the new changes to your domain.
:::

## Automating the Deploy

If you would like to automate new deploys of your permaweb app, look into github actions and using the deno deploy github action: [https://github.com/denoland/deployctl/blob/main/action/README.md](https://github.com/denoland/deployctl/blob/main/action/README.md)


## Summary

Server Side redirects are great for providing your users a Domain Name System URL to access your permaweb application. We hope you found this guide useful in your permaweb development journey!


