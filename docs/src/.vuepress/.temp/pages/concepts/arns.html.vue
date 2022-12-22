<template><div><h1 id="arns-arweave-name-system" tabindex="-1"><a class="header-anchor" href="#arns-arweave-name-system" aria-hidden="true">#</a> ArNS - Arweave Name System</h1>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview" aria-hidden="true">#</a> Overview</h2>
<p>The Arweave Name System (ArNS) is the Smartweave-powered phonebook of the PermaWeb.</p>
<p>It is a decentralized and censorship-resistant naming system that is enabled by AR.IO Gateways and used to connect friendly names to PermaWeb apps, pages and data.</p>
<p>This system works similarly to traditional DNS, where a user can purchase a name in a registry and DNS Name servers resolve these names to IP addresses.</p>
<p>With ArNS, the registry is decentralized, permanent and stored on Arweave (with Smartweave) and each AR.IO gateway acts as both cache and name resolver. Users can register a name within the ArNS Registry, like &quot;my-name&quot; and set a pointer to any Arweave Transaction ID. AR.IO Gateways will resolve that name as one of their own subdomains, eg. https://laserilla.arweave.net and proxy all requests to the associated Arweave Transaction ID.  Each registered name can also have under names associated with it that each point to an Arweave Transaction ID, like https://v1_laserilla.arweave.net, giving even more flexibility and control to its owner.</p>
<h2 id="the-arns-registry" tabindex="-1"><a class="header-anchor" href="#the-arns-registry" aria-hidden="true">#</a> The ArNS Registry</h2>
<p>// TODO: link to smartweave concept //</p>
<p>ArNS uses the Smartweave protocol manage its name records. Each record, or name, is leased by a user and tied to an ANT token. You can register multiple ArNS names to a single ANT, but you cannot register multiple ANTs to a single ArNS name - the gateways would'nt know where to point the routing ID.</p>
<p>ArNS names can be up to 32 characters, including numbers [0-9], letters [a-z], and dashes [-]. The dashes cannot be trailing dashes, e.g. -myname.</p>
<h2 id="ants-arweave-name-tokens" tabindex="-1"><a class="header-anchor" href="#ants-arweave-name-tokens" aria-hidden="true">#</a> ANTs (Arweave Name Tokens)</h2>
<p>ANTs are a crucial part of the ArNS ecosystem - they are the actual key to owning an ArNS name. When you register an ArNS name to an ANT, the ANT then becomes the transfer method for that name. The ArNS registry does not care who owns the ANT, it simply knows what name ANT it belongs to.</p>
<p>Within ANTs you can build out whatever functionality you wish, within the scope ArNS registry approved source code transaction list. Up to and including NFT's, PST's, DAO's, or full on applications.</p>
<h2 id="under-names" tabindex="-1"><a class="header-anchor" href="#under-names" aria-hidden="true">#</a> Under_Names</h2>
<p>Undernames are records held and managed by your ANT (Arweave Name Token). These records can be created and managed without even owning an ARNS name, and will be transferred along with the ant when sent to a new owner. Likewise if your ArNS name expires, and you register your ANT to a new ArNS name, all your undername will remain intact.</p>
<p>Example: you own oldName.arweave.net.</p>
<p>then: You create the undername &quot;my&quot; - my_oldName.arweave.net.</p>
<p>then: oldName.arweave.net expires, and you register newName.arweave.net to your ANT.</p>
<p>now: my_ undername is accessable on newName - my_newName.arweave.net.</p>
<p>Below is an example of an ANT contract State:</p>
<div class="language-JSON line-numbers-mode" data-ext="JSON"><pre v-pre class="language-JSON"><code>{
balances:{
    QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ:1
         }
controller:&quot;QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ&quot;
evolve:null
name:&quot;ArDrive OG Logo&quot;
owner:&quot;QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ&quot;
records:{
    @:{
        transactionId:&quot;xWQ7UmbP0ZHDY7OLCxJsuPCN3wSUk0jCTJvOG1etCRo&quot;
      },
    undername1:{
        transactionId:&quot;usOLUmbP0ZHDY7OLCxJsuPCN3wSUk0jkdlvOG1etCRo&quot;
      }
}
ticker:&quot;ANT-ARDRIVE-OG-LOGO&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>the base &quot;@&quot; record is the initial routing id for the ANT. if you registered 'my-name' to this ANT, and tried to access it via my-name.arweave.net, you would be redirected to the @ record's transactionId.</p>
<p>if you tried to access undername1_my-name.arweave.net, you would get 'undername1's transactionId.</p>
<p>ANT's, in theory, have an UNLIMITED number of undernames. However, how many will be served depends on which tier is used with your ArNS name.</p>
</div></template>


