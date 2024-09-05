# ArNS - Arweave Name System

## Overview
The Arweave Name System (ArNS) is the phonebook of the PermaWeb.  

It is a decentralized and censorship-resistant naming system that is enabled by AR.IO Gateways and used to connect friendly names to PermaWeb apps, pages and data.

This system works similarly to traditional DNS, where a user can purchase a name in a registry and DNS Name servers resolve these names to IP addresses.  

With ArNS, the registry is decentralized, permanent and stored on Arweave and each AR.IO gateway acts as both cache and name resolver. Users can register a name within the ArNS Registry, like "my-name" and set a pointer to any Arweave Transaction ID. AR.IO Gateways will resolve that name as one of their own subdomains, eg. https://laserilla.arweave.net and proxy all requests to the associated Arweave Transaction ID.  Each registered name can also have under names associated with it that each point to an Arweave Transaction ID, like https://v1_laserilla.arweave.net, giving even more flexibility and control to its owner.

## The ArNS Registry

ArNS uses the Smartweave protocol manage its name records. Each record, or name, is leased by a user and tied to an ANT token. You can register multiple ArNS names to a single ANT, but you cannot register multiple ANTs to a single ArNS name - the gateways wouldn't know where to point the routing ID.

ArNS names can be up to 32 characters, including numbers [0-9], letters [a-z], and dashes [-]. The dashes cannot be trailing dashes, e.g. -myname.

## ANTs (Arweave Name Tokens)

ANTs are a crucial part of the ArNS ecosystem - they are the actual key to owning an ArNS name. When you register an ArNS name to an ANT, the ANT then becomes the transfer method for that name. The ArNS registry does not care who owns the ANT, it simply knows what name ANT it belongs to.

Within ANTs you can build out whatever functionality you wish, within the scope ArNS registry approved source code transaction list. Up to and including NFT's, PST's, DAO's, or full on applications.

## Under_Names

Undernames are records held and managed by your ANT (Arweave Name Token). These records can be created and managed without even owning an ARNS name, and will be transferred along with the ant when sent to a new owner. Likewise if your ArNS name expires, and you register your ANT to a new ArNS name, all your undername will remain intact.

Example: you own oldName.arweave.net. 

then: You create the undername "my" - my_oldName.arweave.net.

then: oldName.arweave.net expires, and you register newName.arweave.net to your ANT.

now: my_ undername is accessable on newName - my_newName.arweave.net. 

Below is an example of an ANT contract State:

```json
{
  balances:{ QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ : 1 },
  controller: "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  evolve: null,
  name: "ArDrive OG Logo",
  owner: "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  records:{
    @:{ transactionId: "xWQ7UmbP0ZHDY7OLCxJsuPCN3wSUk0jCTJvOG1etCRo" },
    undername1:{ transactionId: "usOLUmbP0ZHDY7OLCxJsuPCN3wSUk0jkdlvOG1etCRo" }
  },
  ticker:"ANT-ARDRIVE-OG-LOGO"
}
```
the base "@" record is the initial routing id for the ANT. if you registered 'my-name' to this ANT, and tried to access it via my-name.arweave.net, you would be redirected to the @ record's transactionId.

if you tried to access undername1_my-name.arweave.net, you would get 'undername1's transactionId. 

ANT's, in theory, have an UNLIMITED number of undernames. However, how many will be served depends on which tier is used with your ArNS name.

## Resources
# [ArNS App](https://arns.app/)
# [ArNS Docs](https://docs.ar.io/arns/)