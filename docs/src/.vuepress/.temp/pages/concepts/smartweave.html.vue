<template><div><h1 id="smartweave" tabindex="-1"><a class="header-anchor" href="#smartweave" aria-hidden="true">#</a> SmartWeave</h1>
<h2 id="what-is-smartweave" tabindex="-1"><a class="header-anchor" href="#what-is-smartweave" aria-hidden="true">#</a> What is SmartWeave?</h2>
<p>The SmartWeave protocol is the smartcontract protocol for Arweave. The major difference from other blockchains - namely Ethereum, one of the leaders in smartcontract ecosystems - is Arweave nodes do not validate smartcontracts, but rather the user themselves when they interact with the contract, thru the use of &quot;lazy-evaluation&quot;. SmartWeave contracts currently support JavaScript, TypeScript, Rust, Go, AssemblyScript, and WASM (WebAssembly).</p>
<h2 id="why-is-smartweave-important" tabindex="-1"><a class="header-anchor" href="#why-is-smartweave-important" aria-hidden="true">#</a> Why is SmartWeave important?</h2>
<p>SmartWeave is an important part of the Arweave ecosystem - it allows transfer of ownership of Atomic assets (NFTs) and updatable ledger-like record keeping.</p>
<h2 id="how-does-smartweave-work" tabindex="-1"><a class="header-anchor" href="#how-does-smartweave-work" aria-hidden="true">#</a> How does SmartWeave Work?</h2>
<p>SmartWeave contracts, at their core, are built from an initial contract state, with edits and additions using transaction tags. SmartWeave SDK's (such as Warp {previously RedStone} and the legacy SmartWeave SDK) are used to query for these transactions to build contract state locally, adding or subtracting from the contract state with each transaction in order from oldest to newest. The resulting state is the current contract state, which the SDK on the client side can use to calculate user balances, contract owners, and other contract specific details. Once the Dapp has a validated contract state they can build an interaction for the user to deploy to the chain, which upon mining or indexing on a gateway (see gateway Core Concept) will be included the next time someone builds the contract state.</p>
<h2 id="smartweave-ecosystem-projects" tabindex="-1"><a class="header-anchor" href="#smartweave-ecosystem-projects" aria-hidden="true">#</a> Smartweave ecosystem projects</h2>
<p>Theres quite a few ecosystem projects leveraging the smartweave protocol, but here are some of note:</p>
<ul>
<li><a href="https://warp.cc/" target="_blank" rel="noopener noreferrer">Warp<ExternalLinkIcon/></a> | Main provider of SmartWeave SDK's, tutorials, and helps maintain the SmartWeave protocol.</li>
<li><a href="https://sonar.warp.cc/#/app/contracts" target="_blank" rel="noopener noreferrer">SonAr<ExternalLinkIcon/></a>| SmartWeave contract explorer, created and hosted by Warp.</li>
<li><a href="https://weavedb.dev/" target="_blank" rel="noopener noreferrer">WeaveDB<ExternalLinkIcon/></a> | NoSQL Database as a Smart Contract.</li>
<li><a href="https://docs.kwil.com/" target="_blank" rel="noopener noreferrer">KwilDB<ExternalLinkIcon/></a>| SQL Database as a Smart Contract.</li>
<li><a href="https://ardrive.io/inferno/" target="_blank" rel="noopener noreferrer">ArDrive Inferno<ExternalLinkIcon/></a> | Get PST's for uploading thru Ardrive.</li>
<li><a href="https://permapages.app/" target="_blank" rel="noopener noreferrer">Permapages<ExternalLinkIcon/></a> | Permanent webpage creation tool, ArNS purchase portal, and ANT creation portal. Your profile on the permaweb.</li>
<li><RouterLink to="/concepts/arns.html">ArNS</RouterLink> // todo: update to arns portal when portal is released</li>
<li><a href="https://docs.exm.dev/" target="_blank" rel="noopener noreferrer">EXM<ExternalLinkIcon/></a> | Execution Machine (EXM) is a developer platform that powers the creation and usage of highly available and highly performant applications within a decentralized environment.</li>
</ul>
</div></template>


