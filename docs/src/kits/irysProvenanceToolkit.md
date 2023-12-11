# Irys Provenance Toolkit

The Irys Provenance Toolkit is a NextJS project containing a collection of UI components you can use when building your permaweb application.

It contains UI components for:

-   [Fund / Withdraw](https://provenance-toolkit.irys.xyz/fund-withdraw): Managing node balances.
-   [Uploader](https://provenance-toolkit.irys.xyz/uploader): Uploading single files or groups of files.
-   [Progress Bar Uploader](https://provenance-toolkit.irys.xyz/progress-bar-uploader): Uploading large files while providing feedback via a progress bar.
-   [UDL Uploader](https://provenance-toolkit.irys.xyz/udl-uploader): Uploading files and attaching a UDL.
-   [Encrypted Uploader](./provenance-toolkit/encrypted-uploader): Encrypting files before uploading.
-   [Gasless Uploader](https://provenance-toolkit.irys.xyz/encrypted-uploader): Paying for user uploads server-side.
-   [Solana NFT Minter](https://provenance-toolkit.irys.xyz/solana-nft-minter): Uploading an image and then minting on Solana as an NFT.
-   [Transaction Feed](https://provenance-toolkit.irys.xyz/transaction-feed): Querying Irys transactions.

## Demo

You can interact with the provenance toolkit at [https://provenance-toolkit.irys.xyz](https://provenance-toolkit.irys.xyz)

## Setup

1. Fork or clone [https://github.com/Irys-xyz/provenance-toolkit](https://github.com/Irys-xyz/provenance-toolkit)
2. Run `npm install` or `yarn` from within the project directory
3. Rename `.env.local.example` to `.env.local` and follow the configuration instructions in that file
4. Run `npm run start` from within the project directory
5. Launch the Provenance Toolkit at [http://localhost:3000/](http://localhost:3000/)

## Project Layout

![ArDrive Web App Manifest](~@source/images/provenace-toolkit-layout.png)

The project is broken into three main categories:

-   Components: The UI components. These can be added to your project and used as is.
-   Navigation routes: NextJS navigation routing. If you’re building your own project on top of the Provenance Toolkit, you can delete these routes and create your own.
-   Utils: Utility functions used by the UI components.

## Customization

The components are designed with a minimal UI that can be easily incorporated into any design. If you need to make significant UI customizations, [the docs for each component](https://docs.irys.xyz/developer-docs/provenance-toolkit) contain a description of the code.

To change colors, modify the values in `tailwind.config.js`.

## Utility Functions

The following utility functions are used internally by the components. If you're using the components as-is, you can safely ignore the utility functions. For users customizing the components, these functions provide an additional abstraction layer over our SDK.

-   `titleCase.ts`: Converts a string to title case
-   `getRpcUrl.ts`: Returns the RPC URL for the chain associated with the specified token.
-   `getIrys.ts`: Instantiates an Irys object using the parameters in `.env.local`. Currently designed to work with the Ethers 5 provider. You use a different provider, modify code here.
-   `fundAndUpload.ts`: Determines the upload cost for the specified data, funds the node if needed, and then uploads the file.
-   `gaslessFundAndUpload.ts`: Using the private key supplied in `.env.local`, determines the upload cost for the specified data, funds the node if needed, and then uploads the file.
-   `queryGraphQL.ts`: Uses the Irys query package to search based on parameters entered in the UI
