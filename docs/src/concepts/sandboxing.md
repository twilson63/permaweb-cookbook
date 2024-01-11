# Browser Sandboxing


## Overview

Browser sandboxing allows data requests to a gateway node to benefit from the security advantages of using a browser's same-origin policy by redirecting the requests to a pseudo-unique subdomain of the gateway's apex domain. For example, an attempt to access `https://arweave.net/gnWKBqFXMJrrksEWrXLQRUQQQeFhv4uVxesHBcT8i6o` would redirect to `https://qj2yubvbk4yjv24syelk24wqivcbaqpbmg7yxfof5mdqlrh4rova.arweave.net/gnWKBqFXMJrrksEWrXLQRUQQQeFhv4uVxesHBcT8i6o`

Two DNS records are required to link a domain to an Arweave transaction on a gateway node. For example, `www.mycustomsite.com` would need the following records to link it to `www.arweave-gateway.net`:

- A DNS CNAME record pointing to an Arweave gateway: www CNAME `arweave-gateway.net`, 
- A DNS TXT record linking the domain with a specific transaction ID: arweavetx TXT `kTv4OkVtmc0NAsqIcnHfudKjykJeQ83qXXrxf8hrh0S`

When a browser requests `www.mycustomsite.com` the user's machine will (through the usual DNS processes) resolve this to the IP address for the gateway node `arweave-gateway.net`. When the gateway receives an HTTP request with a non-default hostname, e.g. `www.mycustomsite.com` instead of `www.arweave-gateway.net`, the gateway will query the DNS records for `www.mycustomsite.com` and the 'arweavetx' TXT record will tell the node which transaction to serve.

## TLS and its Role in Browser Sandboxing
 
Transport Layer Security (TLS) is a cryptographic protocol designed to provide communications security over a computer network. In the context of Arweave applications and browser sandboxing, TLS plays a critical role in ensuring secure data transmission and enabling the effective use of browser security features.

When Arweave applications are accessed without TLS, most browsers restrict the use of native cryptographic functions. These functions, which include hashing, signing, and verification, are essential for the secure operation of Arweave permaweb apps. Without TLS, not only are these functions unavailable, but the applications also become susceptible to various security threats, notably man-in-the-middle (MITM) attacks. Although Arweave transactions are signed, making direct MITM attacks challenging, the absence of encryption can expose other vulnerabilities. For instance, attackers could intercept and alter the `/price` endpoint, potentially causing transaction failures or leading to overcharging.

To address these concerns, gateway operators are responsible for generating and maintaining TLS certificates for their gateways. This can be achieved through various systems, such as ACME for Let's Encrypt. An important step in setting up a gateway is obtaining a wildcard TLS certificate for the gateway's domain. This certificate secures traffic on both the apex domain and its single-level subdomains (e.g., `gateway.com` and `subdomain.gateway.com`).

The integration of TLS is crucial for the implementation of browser sandboxing. When a browser requests a transaction from a gateway, the gateway issues a 301 redirect to a subdomain of the gateway, using a Base32 pseudo-unique address derived from the transaction ID. This redirection, secured by TLS, invokes the browser's same-origin policy. As a result, the requested web page is confined within a secure sandbox environment, isolated from other domains. This isolation is vital for maintaining the integrity and security of transactions and interactions within Arweave's permaweb applications.

## Deriving Sandbox Value

ar.io nodes generate browser sandbox values deterministically. Because of this, it is possible to calculate ahead of time what that value will be for a particular transaction id. 

Sandbox values are a Base32 encoding of the transaction ID. ar.io gateways use the following code snippet to accomplish the encoding:

```typescript
const expectedTxSandbox = (id: string): string => {
  return toB32(fromB64Url(id));
};
```

View the full code for generating browser sandbox values [here](https://github.com/ar-io/arweave-gateway/blob/719f43f8d6135adf44c87701e95f58105638710a/src/gateway/middleware/sandbox.ts#L69).